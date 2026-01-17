import * as fs from 'fs';
import * as path from 'path';
import { CallGraph, CallGraphBuilder, SceneConfig } from '../../../src';
import { Scene } from '../../../src';
import { MethodSignature } from '../../../src';
import { CallGraphNode, CallGraphEdge, Stmt } from '../../../src';

// =============================
// CONFIG
// =============================

// input project config
const CONFIG_JSON = 'testcases/CONFIG_JSON/test.json';

// rule bundles (all JSON; no CSV at runtime)
const SOURCE_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sources.json';
const SINK_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sinks.json';

// optional: extra bundle contains UI/lifecycle entry suggestions (not used for taint tagging)
const EXTRA_BUNDLE_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.extra.json';

const OUT_TAGGED = 'testcases/OUTPUT/callgraph_tagged.json';
const OUT_FLOW = 'testcases/OUTPUT/callgraph_entry_to_sink.json';

// flow start mode:
//  - 'taintSource': flow from taint sources to taint sinks (classic source->sink)
//  - 'entry': flow from "entries" (UI/lifecycle + taint sources) to taint sinks (more paths; good for demos)
const FLOW_START_MODE: 'taintSource' | 'entry' = 'entry';

// path extraction
const PATH_MAX_DEPTH = 25;               // max hop count
const PATHS_PER_SINK = 8;                // how many representative paths per sink
const MAX_PREDS_PER_NODE = 3;            // predecessor fan-out in shortest-path DAG
const MAX_CALLSITES_PER_EDGE = 6;        // cap edge callSites to avoid huge json
const INCLUDE_CALLSITES_IN_FULL_GRAPH = true; // set false if file size becomes too big

// =============================
// TYPES
// =============================
type NodeJson = {
  id: string;
  nodeId: number;
  signature: string;
  className: string;
  methodName: string;
  file: string;
  isSdk: boolean;
  kind: 'BLANK' | 'REAL';
  taint?: {
    isSource?: boolean;
    isSink?: boolean;
    sourceRules?: string[];
    sinkRules?: string[];
    labels?: string[];
  };
};

type CallSiteJson = {
  type: 'direct' | 'special' | 'indirect';
  file?: string;
  line?: number;
  col?: number;
  text?: string;
};

type EdgeJson = {
  id: string;
  from: string;
  to: string;
  kind: 'DIRECT' | 'SPECIAL' | 'INDIRECT' | 'MIXED' | 'UNKNOWN';
  callSites?: CallSiteJson[];
};

type PathJson = {
  start: string;
  sink: string;
  length: number;         // edges count
  nodes: string[];        // node ids
  edges: string[];        // edge ids (aligned with nodes: edges[i] is nodes[i]->nodes[i+1])
};

type ApiRule = {
  id: string;
  kind: 'source' | 'sink';
  apiKey: string;
  methodName: string;
  ownerHint?: string;
  moduleHint?: string;
  meta?: Record<string, any>;
};

// JSON formats we accept:
// 1) { rules: ApiRule[] }                                  (simple)
// 2) { kind: 'source'|'sink', rules: ApiRule[], ... }      (packed)
type RulesFileAny = {
  kind?: string;
  rules?: any[];
  [k: string]: any;
};

// extra bundle format (generated earlier in your pipeline)
type ExtraBundle = {
  generatedAt?: string;
  project?: string;
  extra?: {
    entryIdListSuggestion?: any; // contains schemeA.main/test
  };
};

// =============================
// HELPERS
// =============================
function readJson(p: string): any {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function normalizeApiKey(raw: string): string {
  const s = (raw ?? '').trim().replace(/^"+|"+$/g, '');
  if (!s) return '';
  const i = s.indexOf('(');
  return (i >= 0 ? s.slice(0, i) : s).trim().replace(/;+$/, '');
}

function splitApiSegments(apiKey: string): string[] {
  const s = apiKey.startsWith('@') ? apiKey.slice(1) : apiKey;
  return s.split('.').map(x => x.trim()).filter(Boolean);
}

function stripCallSuffix(seg: string): string {
  return seg.replace(/\(\)$/, '').trim();
}

function deriveHints(apiKey: string): { methodName: string; ownerHint?: string; moduleHint?: string } {
  const segs = splitApiSegments(apiKey).map(stripCallSuffix);
  const methodName = segs.length ? segs[segs.length - 1] : '';
  const ownerHint = segs.length >= 2 ? segs[segs.length - 2] : undefined;

  // moduleHint: take leading lower-case segments; cap length to avoid runaway
  const moduleParts: string[] = [];
  for (const s of segs) {
    if (!s) continue;
    const first = s[0];
    const isLikelyClass = first >= 'A' && first <= 'Z';
    if (isLikelyClass) break;
    moduleParts.push(s);
    if (moduleParts.length >= 4) break;
  }
  const moduleHint = moduleParts.length >= 2 ? moduleParts.join('.') : undefined;
  return { methodName, ownerHint, moduleHint };
}

function toApiRule(r: any, fallbackKind?: 'source' | 'sink', i = 0): ApiRule | null {
  const kind = (r.kind ?? fallbackKind) as any;
  if (kind !== 'source' && kind !== 'sink') return null;

  const apiKey = normalizeApiKey(r.apiKey ?? '');
  if (!apiKey) return null;

  const hints = deriveHints(apiKey);

  return {
    id: r.id || `${kind}:${i}`,
    kind,
    apiKey,
    methodName: r.methodName || hints.methodName,
    ownerHint: r.ownerHint || hints.ownerHint,
    moduleHint: r.moduleHint || hints.moduleHint,
    meta: r.meta ?? {},
  };
}

function loadApiRules(ruleJsonPath: string): ApiRule[] {
  if (!fs.existsSync(ruleJsonPath)) return [];
  const parsed = readJson(ruleJsonPath) as RulesFileAny;

  const list = Array.isArray(parsed.rules) ? parsed.rules : [];
  const fallbackKind =
    parsed.kind === 'source' || parsed.kind === 'sink' ? (parsed.kind as 'source' | 'sink') : undefined;

  const out: ApiRule[] = [];
  for (let i = 0; i < list.length; i++) {
    const rr = toApiRule(list[i], fallbackKind, i);
    if (rr) out.push(rr);
  }
  return out;
}

function loadExtraBundle(extraPath: string): ExtraBundle | null {
  if (!extraPath || !fs.existsSync(extraPath)) return null;
  try {
    return readJson(extraPath) as ExtraBundle;
  } catch {
    return null;
  }
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function writeJson(outPath: string, data: any) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`[OK] JSON written: ${outPath}`);
}

// =============================
// MATCHING (rules -> nodes)
// =============================
function matchesRule(node: NodeJson, rule: ApiRule): boolean {
  const hay = `${node.signature} ${node.file} ${node.className} ${node.methodName}`.toLowerCase();

  const method = (rule.methodName || '').toLowerCase();
  if (!method) return false;

  if (!hay.includes(method)) return false;

  const mod = (rule.moduleHint || '').toLowerCase();
  const owner = (rule.ownerHint || '').toLowerCase();

  const modOk = mod ? hay.includes(mod) : false;
  const ownerOk = owner ? hay.includes(owner) : false;

  // very generic method names must have an anchor
  const generic = new Set(['start', 'open', 'request', 'get', 'set', 'on', 'off', 'read', 'write', 'send']);
  if (generic.has(method)) return modOk || ownerOk;

  if (mod || owner) return modOk || ownerOk;
  return true;
}

function tagNodes(nodes: NodeJson[], rules: ApiRule[]): { sources: string[]; sinks: string[] } {
  const sources: string[] = [];
  const sinks: string[] = [];

  for (const n of nodes) {
    const sourceRules: string[] = [];
    const sinkRules: string[] = [];
    const labels: string[] = [];

    for (const rule of rules) {
      if (!matchesRule(n, rule)) continue;

      if (rule.kind === 'source') {
        sourceRules.push(rule.id);
        if (rule.meta?.behavior) labels.push(String(rule.meta.behavior));
      } else {
        sinkRules.push(rule.id);
        if (rule.meta?.behavior) labels.push(String(rule.meta.behavior));
      }
    }

    if (sourceRules.length || sinkRules.length) {
      n.taint = {
        isSource: sourceRules.length > 0,
        isSink: sinkRules.length > 0,
        sourceRules: sourceRules.length ? sourceRules : undefined,
        sinkRules: sinkRules.length ? sinkRules : undefined,
        labels: labels.length ? Array.from(new Set(labels)) : undefined,
      };
    }

    if (n.taint?.isSource) sources.push(n.id);
    if (n.taint?.isSink) sinks.push(n.id);
  }

  return { sources, sinks };
}

// =============================
// CALLSITE EXTRACTION (edge -> callSites)
// Requires CallGraphEdge getters:
//   getDirectCallSites(), getSpecialCallSites(), getInDirectCallSites()
// =============================
function stmtToCallSiteJson(stmt: Stmt, type: CallSiteJson['type']): CallSiteJson {
  let file: string | undefined;
  let line: number | undefined;
  let col: number | undefined;
  let text: string | undefined;

  try {
    const cfg = stmt.getCfg?.();
    const m = cfg?.getDeclaringMethod?.();
    const f = m?.getDeclaringArkFile?.();
    file = f?.getName?.() ?? undefined;

    const pos = stmt.getOriginPositionInfo?.();
    if (pos) {
      const ln = pos.getLineNo?.();
      const cn = pos.getColNo?.();
      if (typeof ln === 'number' && ln >= 0) line = ln;
      if (typeof cn === 'number' && cn >= 0) col = cn;
    }

    text = stmt.getOriginalText?.() ?? undefined;
    if (!text) text = stmt.toString?.() ?? undefined;
    if (text && text.length > 240) text = text.slice(0, 240) + '…';
  } catch {
    // ignore
  }

  const out: CallSiteJson = { type };
  if (file) out.file = file;
  if (typeof line === 'number') out.line = line;
  if (typeof col === 'number') out.col = col;
  if (text) out.text = text;
  return out;
}

function edgeCallSites(edge: CallGraphEdge): CallSiteJson[] {
  const out: CallSiteJson[] = [];

  const pushMany = (stmts: Stmt[], type: CallSiteJson['type']) => {
    for (const s of stmts) {
      if (out.length >= MAX_CALLSITES_PER_EDGE) break;
      const cs = stmtToCallSiteJson(s, type);

      // optional: drop unknown positions to reduce noise
      if (cs.line === undefined && cs.text === undefined) continue;

      out.push(cs);
    }
  };

  // These getters must be added in src/callgraph/model/CallGraph.ts
  // (see patch instruction in assistant message)
  const direct = edge.getDirectCallSites?.() ?? [];
  const special = edge.getSpecialCallSites?.() ?? [];
  const indirect = edge.getInDirectCallSites?.() ?? [];

  pushMany(direct, 'direct');
  pushMany(special, 'special');
  pushMany(indirect, 'indirect');

  return out;
}

function edgeKind(edge: CallGraphEdge): EdgeJson['kind'] {
  const d = (edge.getDirectCallSites?.() ?? []).length;
  const s = (edge.getSpecialCallSites?.() ?? []).length;
  const i = (edge.getInDirectCallSites?.() ?? []).length;
  const types = (d > 0 ? 1 : 0) + (s > 0 ? 1 : 0) + (i > 0 ? 1 : 0);
  if (types >= 2) return 'MIXED';
  if (d > 0) return 'DIRECT';
  if (s > 0) return 'SPECIAL';
  if (i > 0) return 'INDIRECT';
  return 'UNKNOWN';
}

// =============================
// FLOW GRAPH + PATHS
// =============================
type AdjItem = { to: string; eid: string };

function buildAdj(edges: EdgeJson[]): Map<string, AdjItem[]> {
  const adj = new Map<string, AdjItem[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push({ to: e.to, eid: e.id });
  }
  return adj;
}

function buildRevAdj(edges: EdgeJson[]): Map<string, AdjItem[]> {
  const radj = new Map<string, AdjItem[]>();
  for (const e of edges) {
    if (!radj.has(e.to)) radj.set(e.to, []);
    radj.get(e.to)!.push({ to: e.from, eid: e.id });
  }
  return radj;
}

function bfsReach(starts: string[], adj: Map<string, AdjItem[]>): Set<string> {
  const seen = new Set<string>();
  const q: string[] = [];
  for (const s of starts) {
    if (!seen.has(s)) {
      seen.add(s);
      q.push(s);
    }
  }
  for (let qi = 0; qi < q.length; qi++) {
    const u = q[qi];
    const outs = adj.get(u) ?? [];
    for (const it of outs) {
      const v = it.to;
      if (!seen.has(v)) {
        seen.add(v);
        q.push(v);
      }
    }
  }
  return seen;
}

function intersect(a: Set<string>, b: Set<string>): Set<string> {
  const out = new Set<string>();
  for (const x of a) if (b.has(x)) out.add(x);
  return out;
}

type Pred = { prev: string; eid: string };

function computeRepresentativePaths(
  starts: string[],
  sinks: string[],
  edges: EdgeJson[],
): PathJson[] {
  const startSet = new Set(starts);
  const adj = buildAdj(edges);

  // multi-source BFS, store predecessor DAG for shortest paths
  const dist = new Map<string, number>();
  const preds = new Map<string, Pred[]>();
  const q: string[] = [];

  for (const s of starts) {
    dist.set(s, 0);
    preds.set(s, []);
    q.push(s);
  }

  for (let qi = 0; qi < q.length; qi++) {
    const u = q[qi];
    const du = dist.get(u)!;
    if (du >= PATH_MAX_DEPTH) continue;

    for (const it of (adj.get(u) ?? [])) {
      const v = it.to;
      const nd = du + 1;

      if (!dist.has(v)) {
        dist.set(v, nd);
        preds.set(v, [{ prev: u, eid: it.eid }]);
        q.push(v);
      } else {
        const dv = dist.get(v)!;
        if (dv === nd) {
          const ps = preds.get(v)!;
          if (ps.length < MAX_PREDS_PER_NODE) ps.push({ prev: u, eid: it.eid });
        }
      }
    }
  }

  const paths: PathJson[] = [];

  for (const sink of sinks) {
    if (!dist.has(sink)) continue;

    const outForSink: PathJson[] = [];
    type State = { node: string; nodesRev: string[]; edgesRev: string[] };

    const stack: State[] = [{ node: sink, nodesRev: [sink], edgesRev: [] }];

    while (stack.length && outForSink.length < PATHS_PER_SINK) {
      const st = stack.pop()!;
      const node = st.node;

      const d = dist.get(node);
      if (d === 0 && startSet.has(node)) {
        const nodes = st.nodesRev.slice().reverse();
        const edges = st.edgesRev.slice().reverse();
        outForSink.push({
          start: node,
          sink,
          length: edges.length,
          nodes,
          edges,
        });
        continue;
      }

      const ps = preds.get(node) ?? [];
      // To keep paths diverse, reverse iterate so earlier preds are used later
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        stack.push({
          node: p.prev,
          nodesRev: [...st.nodesRev, p.prev],
          edgesRev: [...st.edgesRev, p.eid],
        });
      }
    }

    paths.push(...outForSink);
  }

  return paths;
}

// =============================
// CALLGRAPH EXPORT
// =============================
function buildHarmonySceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

function exportCallGraph(callGraph: CallGraph, scene: Scene): { nodes: NodeJson[]; edges: EdgeJson[] } {
  const nodes: NodeJson[] = [];
  const edges: EdgeJson[] = [];

  const nodeId2JsonId = new Map<number, string>();
  let jsonIdCounter = 0;
  let edgeIdCounter = 0;

  function getJsonId(nodeId: number): string {
    if (!nodeId2JsonId.has(nodeId)) nodeId2JsonId.set(nodeId, `M${jsonIdCounter++}`);
    return nodeId2JsonId.get(nodeId)!;
  }

  for (const baseNode of callGraph.nodesItor()) {
    const cgNode = baseNode as CallGraphNode;

    const nodeId = cgNode.getID();
    const jsonId = getJsonId(nodeId);

    const methodSig: MethodSignature = cgNode.getMethod();
    const arkMethod = scene.getMethod(methodSig);

    nodes.push({
      id: jsonId,
      nodeId: nodeId,
      signature: methodSig.toString(),
      className: arkMethod?.getDeclaringArkClass().getName() ?? 'UNKNOWN',
      methodName: arkMethod?.getName() ?? 'UNKNOWN',
      file: arkMethod?.getDeclaringArkClass().getDeclaringArkFile().getName() ?? 'UNKNOWN',
      isSdk: cgNode.isSdkMethod(),
      kind: cgNode.isBlankMethod ? 'BLANK' : 'REAL',
    });

    for (const baseEdge of cgNode.getOutgoingEdges()) {
      const e = baseEdge as CallGraphEdge;
      const eid = `E${edgeIdCounter++}`;

      const callSites = edgeCallSites(e);

      edges.push({
        id: eid,
        from: jsonId,
        to: getJsonId(baseEdge.getDstID()),
        kind: edgeKind(e),
        callSites: callSites.length ? callSites : undefined,
      });
    }
  }

  return { nodes, edges };
}

// =============================
// MAIN
// =============================
function main() {
  const { scene, config } = buildHarmonySceneFromJson(CONFIG_JSON);
  console.log(`[INFO] targetProject=${config.getTargetProjectName()}`);

  const entryPoints = scene
    .getFiles()
    .flatMap(f => f.getClasses())
    .flatMap(c => c.getMethods())
    .map(m => m.getSignature());

  const callGraph = new CallGraph(scene);
  const builder = new CallGraphBuilder(callGraph, scene);
  builder.buildClassHierarchyCallGraph(entryPoints);

  const { nodes, edges } = exportCallGraph(callGraph, scene);

  // taint rules: ONLY sources + sinks
  const sourceRules = loadApiRules(SOURCE_RULES_JSON);
  const sinkRules = loadApiRules(SINK_RULES_JSON);
  const rules = [...sourceRules, ...sinkRules];

  console.log(`[INFO] loaded rules: sources=${sourceRules.length}, sinks=${sinkRules.length}, total=${rules.length}`);

  const { sources, sinks } = tagNodes(nodes, rules);
  console.log(`[INFO] tagged sources=${sources.length}, sinks=${sinks.length}`);

  // load extra bundle only for entry suggestions / reporting
  const extra = loadExtraBundle(EXTRA_BUNDLE_JSON);
  const uiEntryIds: string[] =
    extra?.extra?.entryIdListSuggestion?.schemeA?.main && Array.isArray(extra.extra.entryIdListSuggestion.schemeA.main)
      ? extra.extra.entryIdListSuggestion.schemeA.main
      : [];

  const testEntryIds: string[] =
    extra?.extra?.entryIdListSuggestion?.schemeA?.test && Array.isArray(extra.extra.entryIdListSuggestion.schemeA.test)
      ? extra.extra.entryIdListSuggestion.schemeA.test
      : [];

  const entryStarts = uniq([...sources, ...uiEntryIds, ...testEntryIds]);

  const edgesForFull = INCLUDE_CALLSITES_IN_FULL_GRAPH ? edges : edges.map(e => ({ ...e, callSites: undefined }));

  // full tagged callgraph
  writeJson(OUT_TAGGED, {
    meta: {
      targetProject: config.getTargetProjectName(),
      ruleCount: rules.length,
      sourceCount: sources.length,
      sinkCount: sinks.length,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      flowStartMode: FLOW_START_MODE,
      uiEntryCount: uiEntryIds.length,
      includeCallSitesInFullGraph: INCLUDE_CALLSITES_IN_FULL_GRAPH,
    },
    rules, // only source/sink rules
    extra: extra ?? undefined, // keep for traceability (UI/lifecycle suggestions)
    nodes,
    edges: edgesForFull,
  });

  // flow subgraph: nodes/edges on SOME path from STARTS to ANY sink
  const adj = buildAdj(edges);
  const radj = buildRevAdj(edges);

  const starts = FLOW_START_MODE === 'entry' ? entryStarts : sources;

  const forward = bfsReach(starts, adj);
  const backward = bfsReach(sinks, radj);
  const inFlow = intersect(forward, backward);

  const flowNodes = nodes.filter(n => inFlow.has(n.id));
  const flowEdges = edges
    .filter(e => inFlow.has(e.from) && inFlow.has(e.to))
    .map(e => ({
      ...e,
      // Always include callsites in flow graph if available, even if disabled in full graph.
      callSites: e.callSites,
    }));

  const flowStarts = starts.filter(id => inFlow.has(id));
  const flowSinks = sinks.filter(id => inFlow.has(id));

  // Step 1: representative shortest paths on the flow subgraph
  const paths = computeRepresentativePaths(flowStarts, flowSinks, flowEdges);

  console.log(`[INFO] flowSubgraph nodes=${flowNodes.length}, edges=${flowEdges.length}, paths=${paths.length}`);

  writeJson(OUT_FLOW, {
    meta: {
      targetProject: config.getTargetProjectName(),
      flowNodeCount: flowNodes.length,
      flowEdgeCount: flowEdges.length,
      flowStartMode: FLOW_START_MODE,
      flowStartCount: flowStarts.length,
      flowSinkCount: flowSinks.length,
      pathMaxDepth: PATH_MAX_DEPTH,
      pathsPerSink: PATHS_PER_SINK,
      maxPredsPerNode: MAX_PREDS_PER_NODE,
      maxCallSitesPerEdge: MAX_CALLSITES_PER_EDGE,
      pathCount: paths.length,
    },
    starts: flowStarts,
    sinks: flowSinks,
    paths, // <-- NEW
    nodes: flowNodes,
    edges: flowEdges,
  });
}

main();

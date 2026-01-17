import * as fs from 'fs';
import * as path from 'path';
import { CallGraph, CallGraphBuilder, SceneConfig } from '../src';
import { Scene } from '../src';
import { MethodSignature } from '../src';
import { CallGraphNode } from '../src';

// -------- paths --------
const CONFIG_JSON = 'testcases/CONFIG_JSON/test.json';

// rule bundles (all JSON; no CSV at runtime)
const SOURCE_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sources.json';
const SINK_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sinks.json';
// extra bundle contains UI/lifecycle entry suggestions (not used for taint tagging)
const EXTRA_BUNDLE_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.extra.json';

// outputs
const OUT_TAGGED = 'testcases/OUTPUT/callgraph_tagged.json';
const OUT_FLOW_ENTRY = 'testcases/OUTPUT/callgraph_entry_to_sink.json';
const OUT_FLOW_SOURCE = 'testcases/OUTPUT/callgraph_source_to_sink.json';

// path extraction controls
const PATH_MAX_DEPTH = 25;
const PATH_MAX_PER_SINK = 8;

// include callsites in full graph (can be large)
const INCLUDE_CALLSITES_IN_FULL_GRAPH = false;

// -------- types --------
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
  file: string;
  line: number;
  col: number;
  text: string;
};

type EdgeJson = {
  id: string;
  from: string;
  to: string;
  kind: string;
  callSites?: CallSiteJson[];
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

type RulesFileAny = {
  kind?: string;
  rules?: any[];
  [k: string]: any;
};

type ExtraBundle = {
  generatedAt?: string;
  project?: string;
  extra?: {
    entryIdListSuggestion?: any;
  };
};

type FlowOutput = {
  meta: any;
  starts: string[];
  sinks: string[];
  nodes: NodeJson[];
  edges: EdgeJson[];
  paths: Array<{
    start: string;
    sink: string;
    length: number;
    nodes: string[];
    edges: string[];
    truncated: boolean;
  }>;
};

// -------- helpers --------
function readJson(p: string): any {
  return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

function writeJson(outPath: string, data: any) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`[OK] JSON written: ${outPath}`);
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

// -------- matching --------
function matchesRule(node: NodeJson, rule: ApiRule): boolean {
  const hay = `${node.signature} ${node.file} ${node.className} ${node.methodName}`.toLowerCase();

  const method = (rule.methodName || '').toLowerCase();
  if (!method) return false;
  if (!hay.includes(method)) return false;

  const mod = (rule.moduleHint || '').toLowerCase();
  const owner = (rule.ownerHint || '').toLowerCase();

  const modOk = mod ? hay.includes(mod) : false;
  const ownerOk = owner ? hay.includes(owner) : false;

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

// -------- callsite extraction --------
function stmtToCallSite(stmt: any, type: CallSiteJson['type']): CallSiteJson | null {
  try {
    const pos = stmt.getOriginPositionInfo?.();
    const line = pos?.getLineNo?.() ?? -1;
    const col = pos?.getColNo?.() ?? -1;
    const cfg = stmt.getCfg?.();
    const file = cfg?.getDeclaringMethod?.()?.getDeclaringArkFile?.()?.getName?.() ?? 'UNKNOWN';
    const text = (stmt.getOriginalText?.() ?? stmt.toString?.() ?? '').toString();
    return { type, file, line, col, text };
  } catch {
    return null;
  }
}

function collectCallSites(edgeObj: any): CallSiteJson[] {
  const out: CallSiteJson[] = [];

  const direct: any[] = typeof edgeObj.getDirectCallSites === 'function' ? edgeObj.getDirectCallSites() : [];
  for (const s of direct) {
    const cs = stmtToCallSite(s, 'direct');
    if (cs) out.push(cs);
  }

  const special: any[] = typeof edgeObj.getSpecialCallSites === 'function' ? edgeObj.getSpecialCallSites() : [];
  for (const s of special) {
    const cs = stmtToCallSite(s, 'special');
    if (cs) out.push(cs);
  }

  const indirect: any[] = typeof edgeObj.getInDirectCallSites === 'function' ? edgeObj.getInDirectCallSites() : [];
  for (const s of indirect) {
    const cs = stmtToCallSite(s, 'indirect');
    if (cs) out.push(cs);
  }

  return out;
}

// -------- callgraph export --------
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

    for (const e of cgNode.getOutgoingEdges()) {
      const dstId = getJsonId((e as any).getDstID());
      const callSites = collectCallSites(e as any);
      edges.push({
        id: `E${edgeIdCounter++}`,
        from: jsonId,
        to: dstId,
        kind: 'EXPLICIT',
        callSites: callSites.length ? callSites : undefined,
      });
    }
  }

  return { nodes, edges };
}

// -------- flow + paths --------
function buildAdj(edges: EdgeJson[]) {
  const out = new Map<string, Array<{ to: string; eid: string }>>();
  const rev = new Map<string, string[]>();

  for (const e of edges) {
    if (!out.has(e.from)) out.set(e.from, []);
    out.get(e.from)!.push({ to: e.to, eid: e.id });

    if (!rev.has(e.to)) rev.set(e.to, []);
    rev.get(e.to)!.push(e.from);
  }
  return { out, rev };
}

function bfsReach(starts: string[], next: (u: string) => string[]): Set<string> {
  const seen = new Set<string>();
  const q: string[] = [];
  for (const s of starts) {
    if (!seen.has(s)) {
      seen.add(s);
      q.push(s);
    }
  }
  for (let i = 0; i < q.length; i++) {
    const u = q[i];
    for (const v of next(u)) {
      if (!seen.has(v)) {
        seen.add(v);
        q.push(v);
      }
    }
  }
  return seen;
}

function intersectSet(a: Set<string>, b: Set<string>): Set<string> {
  const out = new Set<string>();
  for (const x of a) if (b.has(x)) out.add(x);
  return out;
}

function buildFlowWithPaths(
  allNodes: NodeJson[],
  allEdges: EdgeJson[],
  starts: string[],
  sinks: string[],
  label: 'entry' | 'source'
): FlowOutput {
  const { out, rev } = buildAdj(allEdges);

  const forward = bfsReach(starts, (u) => (out.get(u) ?? []).map(x => x.to));
  const backward = bfsReach(sinks, (u) => rev.get(u) ?? []);
  const inFlow = intersectSet(forward, backward);

  const flowNodes = allNodes.filter(n => inFlow.has(n.id));
  const flowEdges = allEdges.filter(e => inFlow.has(e.from) && inFlow.has(e.to));

  const flowStarts = starts.filter(id => inFlow.has(id));
  const flowSinks = sinks.filter(id => inFlow.has(id));

  // BFS for shortest paths inside flow
  const dist = new Map<string, number>();
  const prevNode = new Map<string, string>();
  const prevEdge = new Map<string, string>();
  const root = new Map<string, string>();
  const q: string[] = [];

  for (const s of flowStarts) {
    dist.set(s, 0);
    root.set(s, s);
    q.push(s);
  }

  for (let qi = 0; qi < q.length; qi++) {
    const u = q[qi];
    const du = dist.get(u)!;
    if (du >= PATH_MAX_DEPTH) continue;

    const outs = out.get(u) ?? [];
    for (const { to: v, eid } of outs) {
      if (!inFlow.has(v)) continue;
      if (dist.has(v)) continue;
      dist.set(v, du + 1);
      prevNode.set(v, u);
      prevEdge.set(v, eid);
      root.set(v, root.get(u)!);
      q.push(v);
    }
  }

  function reconstruct(target: string) {
    const nodes: string[] = [];
    const edges: string[] = [];
    let cur = target;
    let steps = 0;
    while (true) {
      nodes.push(cur);
      const p = prevNode.get(cur);
      const pe = prevEdge.get(cur);
      if (!p || !pe) break;
      edges.push(pe);
      cur = p;
      steps++;
      if (steps > PATH_MAX_DEPTH) break;
    }
    nodes.reverse();
    edges.reverse();
    return { nodes, edges, truncated: steps > PATH_MAX_DEPTH };
  }

  const paths: FlowOutput['paths'] = [];
  // one representative path per sink by default; capped per sink
  for (const sk of flowSinks) {
    if (!dist.has(sk)) continue;
    const p = reconstruct(sk);
    paths.push({
      start: root.get(sk)!,
      sink: sk,
      length: p.edges.length,
      nodes: p.nodes,
      edges: p.edges,
      truncated: p.truncated,
    });
    // if you want >1 per sink later, we can implement k-shortest variants
    if (paths.length >= flowSinks.length * PATH_MAX_PER_SINK) break;
  }

  return {
    meta: {
      flowKind: `${label}_to_sink`,
      flowNodeCount: flowNodes.length,
      flowEdgeCount: flowEdges.length,
      flowStartCount: flowStarts.length,
      flowSinkCount: flowSinks.length,
      pathCount: paths.length,
      pathMaxDepth: PATH_MAX_DEPTH,
      pathMaxPerSink: PATH_MAX_PER_SINK,
    },
    starts: flowStarts,
    sinks: flowSinks,
    nodes: flowNodes,
    edges: flowEdges,
    paths,
  };
}

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

  const sourceRules = loadApiRules(SOURCE_RULES_JSON);
  const sinkRules = loadApiRules(SINK_RULES_JSON);
  const rules = [...sourceRules, ...sinkRules];

  console.log(`[INFO] loaded rules: sources=${sourceRules.length}, sinks=${sinkRules.length}, total=${rules.length}`);

  const { sources, sinks } = tagNodes(nodes, rules);
  console.log(`[INFO] tagged sources=${sources.length}, sinks=${sinks.length}`);

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

  // Full tagged callgraph
  const fullEdges = INCLUDE_CALLSITES_IN_FULL_GRAPH
    ? edges
    : edges.map(e => ({ ...e, callSites: undefined })); // keep ids but drop heavy callsites

  writeJson(OUT_TAGGED, {
    meta: {
      targetProject: config.getTargetProjectName(),
      ruleCount: rules.length,
      sourceCount: sources.length,
      sinkCount: sinks.length,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      uiEntryCount: uiEntryIds.length,
      includeCallsitesInFullGraph: INCLUDE_CALLSITES_IN_FULL_GRAPH,
    },
    rules,
    extra: extra ?? undefined,
    nodes,
    edges: fullEdges,
  });

  // Flow 1: source -> sink
  const flowSource = buildFlowWithPaths(nodes, edges, sources, sinks, 'source');
  writeJson(OUT_FLOW_SOURCE, {
    meta: { targetProject: config.getTargetProjectName(), ...flowSource.meta },
    starts: flowSource.starts,
    sinks: flowSource.sinks,
    nodes: flowSource.nodes,
    edges: flowSource.edges,
    paths: flowSource.paths,
  });

  // Flow 2: entry (sources + UI/lifecycle suggestions) -> sink
  const flowEntry = buildFlowWithPaths(nodes, edges, entryStarts, sinks, 'entry');
  writeJson(OUT_FLOW_ENTRY, {
    meta: { targetProject: config.getTargetProjectName(), ...flowEntry.meta },
    starts: flowEntry.starts,
    sinks: flowEntry.sinks,
    nodes: flowEntry.nodes,
    edges: flowEntry.edges,
    paths: flowEntry.paths,
  });

  console.log(
    `[INFO] flows done: source(paths=${flowSource.paths.length}) entry(paths=${flowEntry.paths.length})`
  );
}

main();

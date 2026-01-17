import * as fs from 'fs';
import * as path from 'path';
import { CallGraph, CallGraphBuilder, SceneConfig } from '../../../src';
import { Scene } from '../../../src';
import { MethodSignature } from '../../../src';
import { CallGraphNode } from '../../../src';

// -------- paths --------
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

type EdgeJson = { from: string; to: string; kind: string };

type ApiRule = {
  id: string;
  kind: 'source' | 'sink';
  apiKey: string;
  methodName: string;
  ownerHint?: string;
  moduleHint?: string;
  meta?: Record<string, any>;
};

// JSON formats accept:
// 1) { rules: ApiRule[] }                                  (simple)
// 2) { kind: 'source'|'sink', rules: ApiRule[], ... }      (packed)
// 3) anything else -> ignored by loadApiRules
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
    uiEventRegisterApis?: any[];
    lifecycleEntrypoints?: any[];
    entryIdListSuggestion?: any;
  };
};

// -------- helpers --------
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
    if (moduleParts.length >= 4) break; // IMPORTANT: break
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

// -------- flow subgraph computation --------
function buildAdj(edges: EdgeJson[]): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const e of edges) {
    if (!adj.has(e.from)) adj.set(e.from, []);
    adj.get(e.from)!.push(e.to);
  }
  return adj;
}

function buildRevAdj(edges: EdgeJson[]): Map<string, string[]> {
  const radj = new Map<string, string[]>();
  for (const e of edges) {
    if (!radj.has(e.to)) radj.set(e.to, []);
    radj.get(e.to)!.push(e.from);
  }
  return radj;
}

function bfsMulti(starts: string[], adj: Map<string, string[]>): Set<string> {
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
    for (const v of outs) {
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

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
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

    for (const edge of cgNode.getOutgoingEdges()) {
      edges.push({ from: jsonId, to: getJsonId(edge.getDstID()), kind: 'EXPLICIT' });
    }
  }

  return { nodes, edges };
}

function writeJson(outPath: string, data: any) {
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
  console.log(`[OK] JSON written: ${outPath}`);
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
    },
    //rules,
    //extra: extra ?? undefined,
    nodes,
    edges,
  });

  const adj = buildAdj(edges);
  const radj = buildRevAdj(edges);

  const starts = FLOW_START_MODE === 'entry' ? entryStarts : sources;

  const forward = bfsMulti(starts, adj);
  const backward = bfsMulti(sinks, radj);
  const inFlow = intersect(forward, backward);

  const flowNodes = nodes.filter(n => inFlow.has(n.id));
  const flowEdges = edges.filter(e => inFlow.has(e.from) && inFlow.has(e.to));

  const flowStarts = starts.filter(id => inFlow.has(id));
  const flowSinks = sinks.filter(id => inFlow.has(id));

  console.log(`[INFO] flowSubgraph nodes=${flowNodes.length}, edges=${flowEdges.length}`);

  writeJson(OUT_FLOW, {
    meta: {
      targetProject: config.getTargetProjectName(),
      flowNodeCount: flowNodes.length,
      flowEdgeCount: flowEdges.length,
      flowStartMode: FLOW_START_MODE,
      flowStartCount: flowStarts.length,
      flowSinkCount: flowSinks.length,
    },
    starts: flowStarts,
    sinks: flowSinks,
    nodes: flowNodes,
    edges: flowEdges,
  });
}

main();

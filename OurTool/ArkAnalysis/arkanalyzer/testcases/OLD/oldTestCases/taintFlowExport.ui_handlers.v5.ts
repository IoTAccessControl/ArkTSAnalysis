import * as fs from 'fs';
import * as path from 'path';

import { CallGraph, CallGraphBuilder, SceneConfig, FunctionType, ClosureType, Local, MethodSignature } from '../../../src';
import { Scene } from '../../../src';
import { CallGraphNode } from '../../../src';

// -------- paths --------
const CONFIG_JSON = 'testcases/CONFIG_JSON/test.json';

// rule bundles (all JSON; no CSV at runtime)
const SOURCE_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sources.json';
const SINK_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.sinks.json';
// extra bundle contains UI/lifecycle entry suggestions
const EXTRA_BUNDLE_JSON = 'testcases/SOURCE_SINK_CONFIG/rules.extra.json';

// outputs
const OUT_TAGGED = 'testcases/OUTPUT/callgraph_tagged.json';
const OUT_FLOW_ENTRY = 'testcases/OUTPUT/callgraph_entry_to_sink.json';
const OUT_FLOW_SOURCE = 'testcases/OUTPUT/callgraph_source_to_sink.json';
const OUT_UI_HANDLER_SUMMARY = 'testcases/OUTPUT/ui_handler_summary.json';

// path extraction controls
const PATH_MAX_DEPTH = 25;
const PATH_MAX_PER_START = 4; // max paths extracted per start


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
    uiEventRegisterApis?: Array<{ apiKey?: string; methodName?: string }>;
    entryIdListSuggestion?: any;
  };
};

type UiBinding = {
  callerId: string;
  callerSignature: string;
  uiApi: { className: string; methodName: string; signature: string; nodeId: string };
  handlers: Array<{ handlerId: string; handlerSignature: string; via: 'closureArg' | 'functionArg' }>;
  callSites?: CallSiteJson[];
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
type UiOrigin = {
  uiApi: UiBinding['uiApi'];
  callerId: string;
  callerSignature: string;
  via?: string;
  callSites?: CallSiteJson[];
};

function indexUiOriginsByHandler(bindings: UiBinding[]): Map<string, UiOrigin[]> {
  const m = new Map<string, UiOrigin[]>();
  for (const b of bindings) {
    for (const h of b.handlers) {
      const key = h.handlerId;
      const origin: UiOrigin = {
        uiApi: b.uiApi,
        callerId: b.callerId,
        callerSignature: b.callerSignature,
        via: h.via,
        callSites: b.callSites,
      };
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(origin);
    }
  }
  return m;
}

function indexUiOriginsByCaller(bindings: UiBinding[]): Map<string, UiOrigin[]> {
  const m = new Map<string, UiOrigin[]>();
  for (const b of bindings) {
    const key = b.callerId;
    const origin: UiOrigin = {
      uiApi: b.uiApi,
      callerId: b.callerId,
      callerSignature: b.callerSignature,
      callSites: b.callSites,
    };
    if (!m.has(key)) m.set(key, []);
    m.get(key)!.push(origin);
  }
  return m;
}

type StartDetail = {
  id: string;
  kind: 'source' | 'ui_handler' | 'ui_build' | 'test' | 'other';
  uiOrigins?: UiOrigin[];
};

function buildStartDetails(
  startIds: string[],
  sources: Set<string>,
  uiHandlers: Set<string>,
  uiCallers: Set<string>,
  tests: Set<string>,
  originsByHandler: Map<string, UiOrigin[]>,
  originsByCaller: Map<string, UiOrigin[]>
): StartDetail[] {
  const out: StartDetail[] = [];
  for (const id of startIds) {
    let kind: StartDetail['kind'] = 'other';
    if (sources.has(id)) kind = 'source';
    else if (uiHandlers.has(id)) kind = 'ui_handler';
    else if (uiCallers.has(id)) kind = 'ui_build';
    else if (tests.has(id)) kind = 'test';

    const uiOrigins =
      kind === 'ui_handler' ? originsByHandler.get(id) : kind === 'ui_build' ? originsByCaller.get(id) : undefined;

    out.push({ id, kind, uiOrigins: uiOrigins && uiOrigins.length ? uiOrigins : undefined });
  }
  return out;
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

// -------- UI handler extraction --------
function buildUiRegisterMethodSet(extra: ExtraBundle | null): Set<string> {
  const s = new Set<string>();

  for (const x of extra?.extra?.uiEventRegisterApis ?? []) {
    if (typeof x?.methodName === 'string' && x.methodName.trim()) s.add(x.methodName.trim());
    if (typeof x?.apiKey === 'string' && x.apiKey.includes('.')) {
      const parts = x.apiKey.split('.');
      const m = parts[parts.length - 1].trim();
      if (m) s.add(m);
    }
  }

  const fallback = [
    'onClick',
    'onTouch',
    'onHover',
    'onKeyEvent',
    'onAppear',
    'onDisAppear',
    'onChange',
    'onSubmit',
    'onPaste',
    'onCut',
    'onCopy',
    'onFocus',
    'onBlur',
    'onScroll',
    'onScrollEdge',
    'onAreaChange',
    'onDragStart',
    'onDrop',
    'onDelete',
    'onInsert',
  ];
  for (const m of fallback) s.add(m);

  return s;
}

function extractCallbackSignaturesFromStmt(callStmt: any): Array<{ sig: MethodSignature; via: 'closureArg' | 'functionArg' }> {
  const out: Array<{ sig: MethodSignature; via: 'closureArg' | 'functionArg' }> = [];
  try {
    const inv = callStmt.getInvokeExpr?.();
    if (!inv) return out;

    const args: any[] = inv.getArgs?.() ?? [];
    for (const a of args) {
      if (!a || typeof a.getType !== 'function') continue;
      const t = a.getType();

      if (t instanceof ClosureType) {
        out.push({ sig: t.getMethodSignature(), via: 'closureArg' });
        continue;
      }
      if (t instanceof FunctionType) {
        out.push({ sig: t.getMethodSignature(), via: 'functionArg' });
        continue;
      }

      if (a instanceof Local) {
        const ov: any = a.getOriginalValue?.();
        if (ov && typeof ov.getType === 'function') {
          const ot = ov.getType();
          if (ot instanceof ClosureType) out.push({ sig: ot.getMethodSignature(), via: 'closureArg' });
          if (ot instanceof FunctionType) out.push({ sig: ot.getMethodSignature(), via: 'functionArg' });
        }
      }
    }
  } catch {
    // ignore
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

function exportCallGraphWithUiBindings(
  callGraph: CallGraph,
  scene: Scene,
  uiRegisterMethods: Set<string>
): { nodes: NodeJson[]; edges: EdgeJson[]; uiBindings: UiBinding[]; signatureToJsonId: Map<string, string> } {
  const nodes: NodeJson[] = [];
  const edges: EdgeJson[] = [];
  const uiBindings: UiBinding[] = [];

  const nodeId2JsonId = new Map<number, string>();
  let jsonIdCounter = 0;
  let edgeIdCounter = 0;

  const signatureToJsonId = new Map<string, string>();

  function getJsonId(nodeId: number): string {
    if (!nodeId2JsonId.has(nodeId)) nodeId2JsonId.set(nodeId, `M${jsonIdCounter++}`);
    return nodeId2JsonId.get(nodeId)!;
  }

  // PASS 1: nodes
  for (const baseNode of callGraph.nodesItor()) {
    const cgNode = baseNode as CallGraphNode;
    const nodeId = cgNode.getID();
    const jsonId = getJsonId(nodeId);

    const methodSig = cgNode.getMethod();
    const arkMethod = scene.getMethod(methodSig);

    const className = arkMethod?.getDeclaringArkClass().getName() ?? 'UNKNOWN';
    const methodName = arkMethod?.getName() ?? 'UNKNOWN';
    const file = arkMethod?.getDeclaringArkClass().getDeclaringArkFile().getName() ?? 'UNKNOWN';

    signatureToJsonId.set(methodSig.toString(), jsonId);

    nodes.push({
      id: jsonId,
      nodeId,
      signature: methodSig.toString(),
      className,
      methodName,
      file,
      isSdk: cgNode.isSdkMethod(),
      kind: cgNode.isBlankMethod ? 'BLANK' : 'REAL',
    });
  }

  // PASS 2: edges + UI bindings
  for (const baseNode of callGraph.nodesItor()) {
    const cgNode = baseNode as CallGraphNode;
    const fromId = getJsonId(cgNode.getID());

    const callerSig = cgNode.getMethod();

    for (const e of cgNode.getOutgoingEdges()) {
      const dstNodeId = (e as any).getDstID?.();
      const toId = getJsonId(dstNodeId);

      const callSites = collectCallSites(e as any);
      edges.push({
        id: `E${edgeIdCounter++}`,
        from: fromId,
        to: toId,
        kind: 'EXPLICIT',
        callSites: callSites.length ? callSites : undefined,
      });

      const dstCgNode = callGraph.getNode(dstNodeId) as CallGraphNode;
      const calleeSig = dstCgNode.getMethod();
      const calleeArkMethod = scene.getMethod(calleeSig);

      const calleeMethodName = calleeArkMethod?.getName() ?? '';
      const calleeClassName = calleeArkMethod?.getDeclaringArkClass().getName() ?? '';
      const calleeIsSdk = dstCgNode.isSdkMethod();

      if (!calleeIsSdk) continue;
      if (!uiRegisterMethods.has(calleeMethodName)) continue;

      const direct: any[] = typeof (e as any).getDirectCallSites === 'function' ? (e as any).getDirectCallSites() : [];
      const special: any[] = typeof (e as any).getSpecialCallSites === 'function' ? (e as any).getSpecialCallSites() : [];
      const indirect: any[] = typeof (e as any).getInDirectCallSites === 'function' ? (e as any).getInDirectCallSites() : [];
      const stmts = [...direct, ...special, ...indirect];

      const handlerSet = new Map<string, UiBinding['handlers'][number]>();

      for (const st of stmts) {
        const cbs = extractCallbackSignaturesFromStmt(st);
        for (const { sig, via } of cbs) {
          const hid = signatureToJsonId.get(sig.toString());
          if (!hid) continue;
          handlerSet.set(hid, { handlerId: hid, handlerSignature: sig.toString(), via });
        }
      }

      if (handlerSet.size === 0) continue;

      uiBindings.push({
        callerId: fromId,
        callerSignature: callerSig.toString(),
        uiApi: {
          className: calleeClassName,
          methodName: calleeMethodName,
          signature: calleeSig.toString(),
          nodeId: toId,
        },
        handlers: Array.from(handlerSet.values()),
        callSites: callSites.length ? callSites : undefined,
      });
    }
  }

  return { nodes, edges, uiBindings, signatureToJsonId };
}

// -------- flow + paths --------
type FlowOutput = {
  meta: any;
  starts: string[];
  sinks: string[];
  nodes: NodeJson[];
  edges: EdgeJson[];
  paths: Array<{ start: string; sink: string | null; length: number; nodes: string[]; edges: string[]; truncated: boolean; pathType?: string; note?: string }>;
};

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

// function intersectSet(a: Set<string>, b: Set<string>): Set<string> {
//   const out = new Set<string>();
//   for (const x of a) if (b.has(x)) out.add(x);
//   return out;
// }

function buildFlowCoveringStarts(
  allNodes: NodeJson[],
  allEdges: EdgeJson[],
  starts: string[],
  sinks: string[],
  label: string,
  orphanStarts: Set<string>
): FlowOutput {
  const { out, rev } = buildAdj(allEdges);

  const sinkSet = new Set<string>(sinks);

  // nodes that can reach ANY sink (unbounded)
  const canReachSink = bfsReach(sinks, (u) => rev.get(u) ?? []);

  // type PathItem = { start: string; sink: string | null; length: number; nodes: string[]; edges: string[]; truncated: boolean; pathType?: string; note?: string };

  function bfsFromStart(s: string): { found: string[]; prevNode: Map<string,string>; prevEdge: Map<string,string>; dist: Map<string,number> } {
    const prevNode = new Map<string,string>();
    const prevEdge = new Map<string,string>();
    const dist = new Map<string,number>();
    const q: string[] = [];
    dist.set(s, 0);
    q.push(s);

    const found: string[] = [];
    for (let qi = 0; qi < q.length; qi++) {
      const u = q[qi];
      const du = dist.get(u)!;
      if (du >= PATH_MAX_DEPTH) continue;

      if (u !== s && sinkSet.has(u)) {
        found.push(u);
        if (found.length >= PATH_MAX_PER_START) break;
        // Note: we don't early return here; still BFS to maybe find another sink at same depth,
        // but we cap by PATH_MAX_PER_START to control size.
      }

      const outs = out.get(u) ?? [];
      for (const { to: v, eid } of outs) {
        if (dist.has(v)) continue;
        dist.set(v, du + 1);
        prevNode.set(v, u);
        prevEdge.set(v, eid);
        q.push(v);
      }
    }
    return { found, prevNode, prevEdge, dist };
  }

  function reconstruct(target: string, prevNode: Map<string,string>, prevEdge: Map<string,string>) {
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

  const paths: Array<any> = [];
  const keptStarts = new Set<string>();
  const coveredSinks = new Set<string>();

  for (const s of starts) {
    // quick prune: if start can't reach any sink at all, skip BFS and decide orphan behavior
    if (!canReachSink.has(s)) {
      if (orphanStarts.has(s)) {
        keptStarts.add(s);
        paths.push({
          start: s,
          sink: null,
          length: 0,
          nodes: [s],
          edges: [],
          truncated: false,
          pathType: 'source_only',
          note: 'no sink reachable in callgraph',
        });
      }
      continue;
    }

    const { found, prevNode, prevEdge } = bfsFromStart(s);

    if (found.length === 0) {
      if (orphanStarts.has(s)) {
        keptStarts.add(s);
        paths.push({
          start: s,
          sink: null,
          length: 0,
          nodes: [s],
          edges: [],
          truncated: true,
          pathType: 'source_only',
          note: `sink reachable but no path found within depth<=${PATH_MAX_DEPTH}`,
        });
      }
      continue;
    }

    keptStarts.add(s);
    for (const sk of found) {
      const p = reconstruct(sk, prevNode, prevEdge);
      coveredSinks.add(sk);
      paths.push({
        start: s,
        sink: sk,
        length: p.edges.length,
        nodes: p.nodes,
        edges: p.edges,
        truncated: p.truncated,
        pathType: label,
      });
    }
  }

  // Build a minimal subgraph that exactly covers the paths.
  const keepNodes = new Set<string>();
  const keepEdges = new Set<string>();
  for (const p of paths as any[]) {
    for (const nid of p.nodes) keepNodes.add(nid);
    for (const eid of p.edges) keepEdges.add(eid);
  }

  const nodeById = new Map<string, NodeJson>();
  for (const n of allNodes) nodeById.set(n.id, n);

  const flowNodes: NodeJson[] = Array.from(keepNodes).map(id => nodeById.get(id)).filter(Boolean) as NodeJson[];

  const edgeById = new Map<string, EdgeJson>();
  for (const e of allEdges) edgeById.set(e.id, e);
  const flowEdges: EdgeJson[] = Array.from(keepEdges).map(id => edgeById.get(id)).filter(Boolean) as EdgeJson[];

  const flowStarts = Array.from(keptStarts);
  const flowSinks = Array.from(coveredSinks);

  return {
    meta: {
      flowKind: label,
      flowNodeCount: flowNodes.length,
      flowEdgeCount: flowEdges.length,
      flowStartCount: flowStarts.length,
      flowSinkCount: flowSinks.length,
      pathCount: paths.length,
      pathMaxDepth: PATH_MAX_DEPTH,
      pathMaxPerStart: PATH_MAX_PER_START,
      coverage: {
        startsAll: starts.length,
        startsKept: flowStarts.length,
        startsOrphanIncluded: Array.from(orphanStarts).length,
        sinksAll: sinks.length,
        sinksCovered: flowSinks.length,
        sinksUncovered: sinks.length - flowSinks.length,
      },
    },
    starts: flowStarts,
    sinks: flowSinks,
    nodes: flowNodes,
    edges: flowEdges,
    paths: paths as any,
  };
}

// -------- main --------
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

  const sourceRules = loadApiRules(SOURCE_RULES_JSON);
  const sinkRules = loadApiRules(SINK_RULES_JSON);
  const rules = [...sourceRules, ...sinkRules];

  const extra = loadExtraBundle(EXTRA_BUNDLE_JSON);
  const uiRegisterMethods = buildUiRegisterMethodSet(extra);

  const { nodes, edges, uiBindings } = exportCallGraphWithUiBindings(callGraph, scene, uiRegisterMethods);

  const { sources, sinks } = tagNodes(nodes, rules);

  console.log(`[INFO] loaded rules: sources=${sourceRules.length}, sinks=${sinkRules.length}, total=${rules.length}`);
  console.log(`[INFO] tagged sources=${sources.length}, sinks=${sinks.length}`);
  console.log(`[INFO] ui bindings=${uiBindings.length}`);

  const uiHandlerEntryIds = uniq(uiBindings.flatMap(b => b.handlers.map(h => h.handlerId)));

  const oldUiEntryIds: string[] =
    extra?.extra?.entryIdListSuggestion?.schemeA?.main && Array.isArray(extra.extra.entryIdListSuggestion.schemeA.main)
      ? extra.extra.entryIdListSuggestion.schemeA.main
      : [];
  const testEntryIds: string[] =
    extra?.extra?.entryIdListSuggestion?.schemeA?.test && Array.isArray(extra.extra.entryIdListSuggestion.schemeA.test)
      ? extra.extra.entryIdListSuggestion.schemeA.test
      : [];

  const uiEntryMode = uiHandlerEntryIds.length > 0 ? 'handler' : 'caller_build_fallback';
  const uiEntriesUsed = uiHandlerEntryIds.length > 0 ? uiHandlerEntryIds : oldUiEntryIds;

  const entryStarts = uniq([...sources, ...uiEntriesUsed, ...testEntryIds]);
  const originsByHandler = indexUiOriginsByHandler(uiBindings);
  const originsByCaller = indexUiOriginsByCaller(uiBindings);

  const sourcesSet = new Set(sources);
  const uiHandlerSet = new Set(uiHandlerEntryIds);
  const uiCallerSet = new Set(oldUiEntryIds);
  const testSet = new Set(testEntryIds);

  const entryCandidateDetails = buildStartDetails(
    entryStarts,
    sourcesSet,
    uiHandlerSet,
    uiCallerSet,
    testSet,
    originsByHandler,
    originsByCaller
  );


  const fullEdges = INCLUDE_CALLSITES_IN_FULL_GRAPH ? edges : edges.map(e => ({ ...e, callSites: undefined }));
  writeJson(OUT_TAGGED, {
    meta: {
      targetProject: config.getTargetProjectName(),
      ruleCount: rules.length,
      sourceCount: sources.length,
      sinkCount: sinks.length,
      nodeCount: nodes.length,
      edgeCount: edges.length,
      includeCallsitesInFullGraph: INCLUDE_CALLSITES_IN_FULL_GRAPH,
      uiRegisterMethodCount: uiRegisterMethods.size,
      uiBindingsCount: uiBindings.length,
      uiHandlerEntryCount: uiHandlerEntryIds.length,
      uiEntryMode,
    },
    rules,
    extra: extra ?? undefined,
    ui: {
      entryMode: uiEntryMode,
      handlerEntryIds: uiHandlerEntryIds,
      bindings: uiBindings,
    },
    nodes,
    edges: fullEdges,
  });

  writeJson(OUT_UI_HANDLER_SUMMARY, {
    meta: {
      targetProject: config.getTargetProjectName(),
      uiRegisterMethodCount: uiRegisterMethods.size,
      uiBindingsCount: uiBindings.length,
      uiHandlerEntryCount: uiHandlerEntryIds.length,
      uiEntryMode,
    },
    uiRegisterMethods: Array.from(uiRegisterMethods.values()).sort(),
    handlerEntryIds: uiHandlerEntryIds,
    bindings: uiBindings,
  });

  const flowSource = buildFlowCoveringStarts(nodes, edges, sources, sinks, 'source_to_sink', new Set(sources));
  const sourceStartDetails = buildStartDetails(
    flowSource.starts,
    sourcesSet,
    uiHandlerSet,
    uiCallerSet,
    testSet,
    originsByHandler,
    originsByCaller
  );

  writeJson(OUT_FLOW_SOURCE, {
    meta: { targetProject: config.getTargetProjectName(), ...flowSource.meta },
    starts: flowSource.starts,
    startDetails: sourceStartDetails,
    sinks: flowSource.sinks,
    nodes: flowSource.nodes,
    edges: flowSource.edges,
    paths: flowSource.paths,
  });

  const flowEntry = buildFlowCoveringStarts(nodes, edges, entryStarts, sinks, 'entry_to_sink', new Set(sources));
  const keptEntryStartSet = new Set(flowEntry.starts);
  const entryStartDetails = entryCandidateDetails.filter(d => keptEntryStartSet.has(d.id));
  const droppedEntryStartDetails = entryCandidateDetails.filter(d => !keptEntryStartSet.has(d.id));

  writeJson(OUT_FLOW_ENTRY, {
    meta: {
      targetProject: config.getTargetProjectName(),
      uiEntryMode,
      uiEntryCount: uiEntriesUsed.length,
      ...flowEntry.meta,
    },
    starts: flowEntry.starts,
    startCandidates: entryStarts,
    startDetails: entryStartDetails,
    droppedStartDetails: droppedEntryStartDetails,
    sinks: flowEntry.sinks,
    nodes: flowEntry.nodes,
    edges: flowEntry.edges,
    paths: flowEntry.paths,
  });

  console.log(`[INFO] flows done: source(paths=${flowSource.paths.length}) entry(paths=${flowEntry.paths.length})`);
  console.log(`[INFO] entry ui mode=${uiEntryMode}, uiEntriesUsed=${uiEntriesUsed.length}`);
}

main();
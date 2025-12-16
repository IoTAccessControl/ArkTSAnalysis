import * as fs from 'fs';
import * as path from 'path';
import { CallGraph, CallGraphBuilder, SceneConfig } from '../src';
import { Scene } from '../src';
import { MethodSignature } from '../src';
import { CallGraphNode } from '../src/';


// -------- paths --------
const CONFIG_JSON = 'testcases/CONFIG_JSON/test.json';
const SENSITIVE_CSV = 'testcases/SOURCE_SINK_CONFIG/sensitiveAPILists.csv';   // put your sensitiveAPILists.csv here
const EXTRA_RULES_JSON = 'testcases/SOURCE_SINK_CONFIG/extra-rules.json'; // optional
const OUT_TAGGED = 'testcases/OUTPUT/callgraph_tagged.json';
const OUT_FLOW = 'testcases/OUTPUT/callgraph_source_to_sink.json';

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
    labels?: string[]; // free-form labels (e.g. behavior/dataItem)
  };
};

type EdgeJson = { from: string; to: string; kind: string };

type ApiRule = {
  id: string;
  kind: 'source' | 'sink';
  apiKey: string;        // e.g. @ohos.net.http.createHttp().request
  methodName: string;    // e.g. request
  ownerHint?: string;    // e.g. AudioRecorder / createHttp
  moduleHint?: string;   // e.g. ohos.net.http
  meta?: Record<string, any>;
};

type ExtraRulesFile = {
  rules: Array<{
    id: string;
    kind: 'source' | 'sink';
    apiKey: string;
    moduleHint?: string;
    ownerHint?: string;
    methodName?: string;
    meta?: Record<string, any>;
  }>;
};

// -------- CSV parsing (handles quotes + newlines inside quotes) --------
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cur = '';
  let inQuotes = false;

  // strip BOM
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];

    if (inQuotes) {
      if (ch === '"') {
        const next = text[i + 1];
        if (next === '"') {
          cur += '"'; // escaped quote
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        cur += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      continue;
    }

    if (ch === ',') {
      row.push(cur);
      cur = '';
      continue;
    }

    if (ch === '\r') continue;

    if (ch === '\n') {
      row.push(cur);
      cur = '';
      rows.push(row);
      row = [];
      continue;
    }

    cur += ch;
  }

  // last cell
  if (cur.length > 0 || row.length > 0) {
    row.push(cur);
    rows.push(row);
  }

  return rows;
}

function normalizeApiKey(raw: string): string {
  const s = (raw ?? '').trim().replace(/^"+|"+$/g, '');
  if (!s) return '';
  // keep only "before first (" to avoid the CSV's "..."
  const i = s.indexOf('(');
  return (i >= 0 ? s.slice(0, i) : s).trim().replace(/;+$/, '');
}

function splitApiSegments(apiKey: string): string[] {
  // e.g. @ohos.net.http.createHttp().request  -> ['ohos','net','http','createHttp()','request']
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

  // moduleHint: take leading lower-case segments until first capitalized-ish segment
  let moduleParts: string[] = [];
  for (const s of segs) {
    if (!s) continue;
    const first = s[0];
    const isLikelyClass = first >= 'A' && first <= 'Z';
    if (isLikelyClass) break;
    // stop before the owner/method tail if it looks like API chain
    moduleParts.push(s);
    if (moduleParts.length >= 4) {
      // avoid being too long; module names are usually not infinite
      // (tune if your SDK uses deeper module namespaces)
      continue;
    }
  }
  const moduleHint = moduleParts.length >= 2 ? moduleParts.join('.') : undefined;
  return { methodName, ownerHint, moduleHint };
}

// -------- build rules from CSV + optional JSON overrides --------
function loadRulesFromSensitiveCsv(csvPath: string): ApiRule[] {
  if (!fs.existsSync(csvPath)) {
    console.warn(`[WARN] CSV not found: ${csvPath}`);
    return [];
  }
  const text = fs.readFileSync(csvPath, 'utf-8');
  const table = parseCsv(text);
  if (table.length < 2) return [];

  const header = table[0].map(h => h.trim());
  const idx = (name: string) => header.indexOf(name);

  const iBehavior = idx('敏感行为');
  const iSub = idx('行为子项');
  const iApi = idx('相关API');
  const iPerm = idx('相关权限');
  const iData = idx('敏感数据项');
  const iDataSub = idx('敏感数据子项');

  let lastBehavior = '';
  const rules: ApiRule[] = [];

  // heuristic: behaviors that smell like "exfil" -> sinks
  const sinkBehaviorKeywords = ['发送', '传送', '发起HTTP', '网络请求', '上报', '上传', '分享', '外发', '转发'];

  for (let r = 1; r < table.length; r++) {
    const row = table[r];
    const behavior = (row[iBehavior] ?? '').trim() || lastBehavior;
    if (behavior) lastBehavior = behavior;

    const apiRaw = (row[iApi] ?? '').trim();
    const apiKey = normalizeApiKey(apiRaw);
    if (!apiKey) continue;

    const { methodName, ownerHint, moduleHint } = deriveHints(apiKey);

    const isSink = sinkBehaviorKeywords.some(k => behavior.includes(k));
    const kind: 'source' | 'sink' = isSink ? 'sink' : 'source';

    const rule: ApiRule = {
      id: `csv:${rules.length}`,
      kind,
      apiKey,
      methodName,
      ownerHint,
      moduleHint,
      meta: {
        behavior,
        subBehavior: (row[iSub] ?? '').trim(),
        permission: (row[iPerm] ?? '').trim(),
        dataItem: (row[iData] ?? '').trim(),
        dataSubItem: (row[iDataSub] ?? '').trim(),
      },
    };
    rules.push(rule);
  }

  return rules;
}

function loadExtraRules(extraJsonPath: string): ApiRule[] {
  if (!fs.existsSync(extraJsonPath)) return [];
  const raw = fs.readFileSync(extraJsonPath, 'utf-8');
  const parsed = JSON.parse(raw) as ExtraRulesFile;

  return (parsed.rules ?? []).map((r, i) => {
    const apiKey = normalizeApiKey(r.apiKey);
    const hints = deriveHints(apiKey);
    return {
      id: r.id || `extra:${i}`,
      kind: r.kind,
      apiKey,
      methodName: r.methodName || hints.methodName,
      ownerHint: r.ownerHint || hints.ownerHint,
      moduleHint: r.moduleHint || hints.moduleHint,
      meta: r.meta ?? {},
    };
  });
}

// -------- matching --------
function matchesRule(node: NodeJson, rule: ApiRule): boolean {
  const hay = `${node.signature} ${node.file} ${node.className} ${node.methodName}`.toLowerCase();

  const method = (rule.methodName || '').toLowerCase();
  if (!method) return false;

  // must contain method name
  if (!hay.includes(method)) return false;

  const mod = (rule.moduleHint || '').toLowerCase();
  const owner = (rule.ownerHint || '').toLowerCase();

  // require at least one extra anchor besides methodName
  const modOk = mod ? hay.includes(mod) : false;
  const ownerOk = owner ? hay.includes(owner) : false;

  // for very generic method names like "start/open/request", require module or owner
  const generic = new Set(['start', 'open', 'request', 'get', 'set', 'on', 'off']);
  if (generic.has(method)) return modOk || ownerOk;

  // otherwise, methodName is often already unique enough, but still prefer an anchor if we have one
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

  // CallGraph NodeID -> JSON ID
  const nodeId2JsonId = new Map<number, string>();
  let jsonIdCounter = 0;

  function getJsonId(nodeId: number): string {
    if (!nodeId2JsonId.has(nodeId)) {
      nodeId2JsonId.set(nodeId, `M${jsonIdCounter++}`);
    }
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
      file:
        arkMethod?.getDeclaringArkClass().getDeclaringArkFile().getName() ?? 'UNKNOWN',
      isSdk: cgNode.isSdkMethod(),
      kind: cgNode.isBlankMethod ? 'BLANK' : 'REAL',
    });

    for (const edge of cgNode.getOutgoingEdges()) {
      const dstNodeId = edge.getDstID();
      edges.push({
        from: jsonId,
        to: getJsonId(dstNodeId),
        kind: 'EXPLICIT',
      });
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

  const rules = [
    ...loadRulesFromSensitiveCsv(SENSITIVE_CSV),
    ...loadExtraRules(EXTRA_RULES_JSON),
  ];

  console.log(`[INFO] loaded rules: ${rules.length} (csv+extra)`);

  const { sources, sinks } = tagNodes(nodes, rules);

  console.log(`[INFO] tagged sources=${sources.length}, sinks=${sinks.length}`);

  // full tagged callgraph
  writeJson(OUT_TAGGED, {
    meta: {
      targetProject: config.getTargetProjectName(),
      ruleCount: rules.length,
      sourceCount: sources.length,
      sinkCount: sinks.length,
      nodeCount: nodes.length,
      edgeCount: edges.length,
    },
    rules,
    nodes,
    edges,
  });

  // flow subgraph: nodes/edges on SOME path from ANY source to ANY sink
  const adj = buildAdj(edges);
  const radj = buildRevAdj(edges);

  const forward = bfsMulti(sources, adj);
  const backward = bfsMulti(sinks, radj);
  const inFlow = intersect(forward, backward);

  const flowNodes = nodes.filter(n => inFlow.has(n.id));
  const flowEdges = edges.filter(e => inFlow.has(e.from) && inFlow.has(e.to));

  const flowSources = sources.filter(id => inFlow.has(id));
  const flowSinks = sinks.filter(id => inFlow.has(id));

  console.log(`[INFO] flowSubgraph nodes=${flowNodes.length}, edges=${flowEdges.length}`);

  writeJson(OUT_FLOW, {
    meta: {
      targetProject: config.getTargetProjectName(),
      flowNodeCount: flowNodes.length,
      flowEdgeCount: flowEdges.length,
      flowSourceCount: flowSources.length,
      flowSinkCount: flowSinks.length,
    },
    sources: flowSources,
    sinks: flowSinks,
    nodes: flowNodes,
    edges: flowEdges,
  });
}

main();

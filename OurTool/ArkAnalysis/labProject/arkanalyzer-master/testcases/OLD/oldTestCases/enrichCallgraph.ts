import * as fs from "fs";

type Taint = {
  isSource?: boolean;
  isSink?: boolean;
  sourceRules?: string[];
  sinkRules?: string[];
  labels?: string[];
};

type RawNode = {
  id: string;         // e.g. "M317"
  nodeId?: number;    // original numeric id from builder
  signature: string;
  className: string;
  methodName: string;
  file: string;
  isSdk: boolean;
  kind: string;
  taint?: Taint;
};

type RawEdge = { from: string; to: string; kind: string };

type RawGraph = {
  meta: any;
  rules?: any;  // keep as-is (optional, can be huge)
  nodes: RawNode[];
  edges: RawEdge[];
};

type EnrichedNode = RawNode & { nid: number; depth?: number; comp?: number };
type EnrichedEdge = { u: number; v: number; kind: string };

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
}
function writeJson(p: string, obj: any) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 2), "utf-8");
}
// function uniq<T>(arr: T[]): T[] {
//   return Array.from(new Set(arr));
// }

function buildIndex(nodes: RawNode[]) {
  const id2nid: Record<string, number> = {};
  nodes.forEach((n, i) => (id2nid[n.id] = i));
  return id2nid;
}

function buildAdj(N: number, edges: EnrichedEdge[]) {
  const outEdges: number[][] = Array.from({ length: N }, () => []);
  const inEdges: number[][] = Array.from({ length: N }, () => []);
  edges.forEach((e, ei) => {
    outEdges[e.u].push(ei);
    inEdges[e.v].push(ei);
  });
  return { outEdges, inEdges };
}

// ---- SCC (Kosaraju) ----
function computeSCC(N: number, edges: EnrichedEdge[], adj: { outEdges: number[][]; inEdges: number[][] }) {
  const visited = new Array<boolean>(N).fill(false);
  const order: number[] = [];

  function dfs1(u: number) {
    visited[u] = true;
    for (const ei of adj.outEdges[u]) {
      const v = edges[ei].v;
      if (!visited[v]) dfs1(v);
    }
    order.push(u);
  }
  for (let i = 0; i < N; i++) if (!visited[i]) dfs1(i);

  const compOf = new Array<number>(N).fill(-1);
  const comps: number[][] = [];
  function dfs2(u: number, cid: number) {
    compOf[u] = cid;
    comps[cid].push(u);
    for (const ei of adj.inEdges[u]) {
      const v = edges[ei].u;
      if (compOf[v] === -1) dfs2(v, cid);
    }
  }

  for (let i = order.length - 1; i >= 0; i--) {
    const u = order[i];
    if (compOf[u] !== -1) continue;
    const cid = comps.length;
    comps.push([]);
    dfs2(u, cid);
  }

  const compSizes = comps.map(c => c.length);
  return { compOf, compSizes, comps };
}

// ---- reachability ----
function bfsMultiSource(
  N: number,
  edges: EnrichedEdge[],
  startNodes: number[],
  outEdges: number[][],
  nodeAllow?: (u: number) => boolean
) {
  const dist = new Array<number>(N).fill(-1);
  const prevNode = new Array<number>(N).fill(-1);
  const prevEdge = new Array<number>(N).fill(-1);
  const root = new Array<number>(N).fill(-1);

  const q: number[] = [];
  for (const s of startNodes) {
    if (nodeAllow && !nodeAllow(s)) continue;
    dist[s] = 0;
    root[s] = s;
    q.push(s);
  }
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    for (const ei of outEdges[u]) {
      const v = edges[ei].v;
      if (nodeAllow && !nodeAllow(v)) continue;
      if (dist[v] !== -1) continue;
      dist[v] = dist[u] + 1;
      prevNode[v] = u;
      prevEdge[v] = ei;
      root[v] = root[u];
      q.push(v);
    }
  }
  return { dist, prevNode, prevEdge, root };
}

function bfsReachableSet(
  N: number,
  edges: EnrichedEdge[],
  startNodes: number[],
  nextEdges: number[][], // could be outEdges or inEdges
  nextOf: (ei: number) => number,
  nodeAllow?: (u: number) => boolean
) {
  const seen = new Array<boolean>(N).fill(false);
  const q: number[] = [];
  for (const s of startNodes) {
    if (nodeAllow && !nodeAllow(s)) continue;
    if (!seen[s]) {
      seen[s] = true;
      q.push(s);
    }
  }
  let qi = 0;
  while (qi < q.length) {
    const u = q[qi++];
    for (const ei of nextEdges[u]) {
      const v = nextOf(ei);
      if (nodeAllow && !nodeAllow(v)) continue;
      if (!seen[v]) {
        seen[v] = true;
        q.push(v);
      }
    }
  }
  return seen;
}

function reconstructPath(target: number, prevNode: number[], prevEdge: number[], maxLen = 60) {
  const nodes: number[] = [];
  const edgesIdx: number[] = [];
  let cur = target;
  let steps = 0;
  while (cur !== -1 && steps <= maxLen) {
    nodes.push(cur);
    const pe = prevEdge[cur];
    if (pe !== -1) edgesIdx.push(pe);
    cur = prevNode[cur];
    steps++;
  }
  nodes.reverse();
  edgesIdx.reverse();
  return { nodes, edges: edgesIdx, truncated: steps > maxLen };
}

function main() {
  const argv = process.argv.slice(2);
  // usage:
  //   ts-node enrichCallgraph.ts in.json out.enriched.json out.cytoscape.json [maxDepth] [maxPaths]
  const input = argv[0] || "testcases/output/callgraph_tagged.json";
  const outEnriched = argv[1] || "testcases/output/callgraph_enriched.json";
  const outCy = argv[2] || "testcases/output/callgraph_cytoscape.json";
  const maxDepth = Number(argv[3] || "60");
  const maxPaths = Number(argv[4] || "200");

  const raw = readJson<RawGraph>(input);

  const nodes: EnrichedNode[] = raw.nodes.map((n, i) => ({ ...n, nid: i }));
  const id2nid = buildIndex(raw.nodes);

  const edges: EnrichedEdge[] = raw.edges
    .map(e => ({ u: id2nid[e.from], v: id2nid[e.to], kind: e.kind }))
    .filter(e => Number.isFinite(e.u) && Number.isFinite(e.v));

  const N = nodes.length;
  const adj = buildAdj(N, edges);

  const sources = nodes.filter(n => n.taint?.isSource).map(n => n.nid);
  const sinks = nodes.filter(n => n.taint?.isSink).map(n => n.nid);

  // Flow subgraph: nodes on some source->sink path (or source-reachable if sinks empty)
  const forward = bfsReachableSet(
    N, edges, sources, adj.outEdges, (ei) => edges[ei].v
  );
  let keep = forward;
  if (sinks.length > 0) {
    const backward = bfsReachableSet(
      N, edges, sinks, adj.inEdges, (ei) => edges[ei].u
    );
    keep = keep.map((v, i) => v && backward[i]);
  }

  const keptNodes = nodes.filter(n => keep[n.nid]).map(n => n.nid);
  const keptEdges = edges
    .map((e, i) => (keep[e.u] && keep[e.v]) ? i : -1)
    .filter(i => i !== -1);

  // Depth layering from sources (on keep-subgraph)
  const allow = (u: number) => keep[u];
  const bfs = bfsMultiSource(N, edges, sources, adj.outEdges, allow);
  for (const nid of keptNodes) {
    const d = bfs.dist[nid];
    if (d >= 0 && d <= maxDepth) nodes[nid].depth = d;
  }

  // Representative shortest paths: one shortest path per sink (bounded)
  const paths: any[] = [];
  if (sinks.length > 0) {
    const okSink = sinks.filter(s => keep[s] && bfs.dist[s] !== -1 && bfs.dist[s] <= maxDepth);
    for (const sk of okSink) {
      if (paths.length >= maxPaths) break;
      const p = reconstructPath(sk, bfs.prevNode, bfs.prevEdge, maxDepth);
      const src = bfs.root[sk];
      paths.push({
        source: src,
        sink: sk,
        length: p.nodes.length ? p.nodes.length - 1 : 0,
        nodes: p.nodes,
        edges: p.edges,
        truncated: p.truncated
      });
    }
  }

  // SCC to help “折叠/分组”画图
  const scc = computeSCC(N, edges, adj);
  for (let i = 0; i < N; i++) nodes[i].comp = scc.compOf[i];

  const enriched = {
    meta: {
      ...raw.meta,
      enrichedAt: new Date().toISOString(),
      sourceN: sources.length,
      sinkN: sinks.length,
      keptNodeCount: keptNodes.length,
      keptEdgeCount: keptEdges.length,
      maxDepth,
      maxPaths
    },
    // keep rules for traceability; if too large you can删掉这一段
    rules: raw.rules ?? undefined,
    nodes,
    edges,
    index: {
      id2nid,
      sources,
      sinks
    },
    adj: {
      outEdges: adj.outEdges,
      inEdges: adj.inEdges
    },
    scc: {
      compOf: scc.compOf,
      compSizes: scc.compSizes
    },
    flow: {
      keptNodes,
      keptEdges,
      paths
    }
  };

  writeJson(outEnriched, enriched);

  // Cytoscape-friendly (for “做图”特别爽)
  const cy = {
    meta: enriched.meta,
    elements: {
      nodes: nodes.map(n => ({
        data: {
          id: n.id,
          nid: n.nid,
          label: n.methodName,
          className: n.className,
          file: n.file,
          isSdk: n.isSdk,
          kind: n.kind,
          isSource: !!n.taint?.isSource,
          isSink: !!n.taint?.isSink,
          labels: n.taint?.labels ?? [],
          depth: n.depth ?? -1,
          comp: n.comp ?? -1
        }
      })),
      edges: raw.edges.map((e, i) => ({
        data: {
          id: "e" + i,
          source: e.from,
          target: e.to,
          kind: e.kind
        }
      }))
    }
  };
  writeJson(outCy, cy);

  console.log("[ok] enriched:", outEnriched);
  console.log("[ok] cytoscape:", outCy);
  console.log("[info] sources:", sources.length, "sinks:", sinks.length, "keptNodes:", keptNodes.length, "paths:", paths.length);
}

main();

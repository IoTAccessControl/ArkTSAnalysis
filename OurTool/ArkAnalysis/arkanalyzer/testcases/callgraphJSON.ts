import * as fs from 'fs';
import * as path from 'path';
import { CallGraph, CallGraphBuilder, SceneConfig } from '../src';
import { Scene } from '../src';
import { MethodSignature } from '../src';
import { CallGraphNode } from '../src/';

let output_path="testcases/OUTPUT/WechatCallgraph.json"
let CONFIG_JSON="testcases/JSON/test.json"

function buildHarmonySceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

function exportCallGraphToJson(
  callGraph: CallGraph,
  scene: Scene,
  outputPath: string
) {
  const nodes: any[] = [];
  const edges: any[] = [];

  // CallGraph NodeID -> JSON ID
  const nodeId2JsonId = new Map<number, string>();
  let jsonIdCounter = 0;

  function getJsonId(nodeId: number): string {
    if (!nodeId2JsonId.has(nodeId)) {
      nodeId2JsonId.set(nodeId, `M${jsonIdCounter++}`);
    }
    return nodeId2JsonId.get(nodeId)!;
  }

  // 遍历 CallGraph（注意这里的强制类型收敛）
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
        arkMethod
          ?.getDeclaringArkClass()
          .getDeclaringArkFile()
          .getName() ?? 'UNKNOWN',
      isSdk: cgNode.isSdkMethod(),        //只能在 CallGraphNode 上用
      kind: cgNode.isBlankMethod ? 'BLANK' : 'REAL'
    });

    // 出边
    for (const edge of cgNode.getOutgoingEdges()) {
      const dstNodeId = edge.getDstID();
      edges.push({
        from: jsonId,
        to: getJsonId(dstNodeId),
        kind: 'EXPLICIT'
      });
    }
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify({ nodes, edges }, null, 2));

  console.log(`[OK] CallGraph JSON written to ${outputPath}`);
}

function main() {
  const {scene,config} = buildHarmonySceneFromJson(CONFIG_JSON);
  console.log(config.getTargetProjectName())
  const entryPoints = scene
    .getFiles()
    .flatMap(f => f.getClasses())
    .flatMap(c => c.getMethods())
    .map(m => m.getSignature());

  const callGraph = new CallGraph(scene);
  const builder = new CallGraphBuilder(callGraph, scene);
  builder.buildClassHierarchyCallGraph(entryPoints);

  exportCallGraphToJson(
    callGraph,
    scene,
    output_path
  );
}

main()

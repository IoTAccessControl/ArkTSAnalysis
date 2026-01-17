import { 
    SceneConfig, 
    Scene, 
    CallGraph, 
    CallGraphBuilder, 
    MethodSignature 
} from '../src';

let output_path="testcases/OUTPUT/WechatCallgraph.dot"
let CONFIG_JSON="testcases/JSON/test.json"

function buildHarmonySceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

function main(): void {
    const { scene, config } = buildHarmonySceneFromJson(CONFIG_JSON);

    let entryPoints: MethodSignature[] = [];
    console.log(config.getTargetProjectName())
    // entryPoints.push(
    //     ...scene.getFiles()
    //         .flatMap(f => f.getClasses())
    //         .flatMap(c => c.getMethods())
    //         .filter(m =>
    //             m.getName().startsWith("on") // onCreate / onShow / onClick 等
    //         )
    //         .map(m => m.getSignature())
    // );
    entryPoints = scene
        .getFiles()
        .flatMap(f => f.getClasses())
        .flatMap(c => c.getMethods())
        .map(m => m.getSignature());    
    let callGraph = new CallGraph(scene);
    let callGraphBuilder = new CallGraphBuilder(callGraph, scene);
    callGraphBuilder.buildClassHierarchyCallGraph(entryPoints)
    callGraph.dump(output_path)
}

main();
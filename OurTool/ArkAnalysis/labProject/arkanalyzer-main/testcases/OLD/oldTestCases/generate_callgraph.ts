/*
 * Copyright (c) 2024-2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { SceneConfig, Scene, CallGraph, CallGraphBuilder, MethodSignature } from '../src';

let config: SceneConfig = new SceneConfig();
function runDir(): void {
    //config.buildFromProjectDir('tests/resources/callgraph/cha_rta_test');
    //config.buildFromProjectDir('C:\\Users\\xsy\\labProject\\myDevEchoStudioProject\\OxHornCampus')
    //config.buildFromProjectDir('C:\\Users\\xsy\\labProject\\myDevEchoStudioProject\\Health_Service_Kit')
    config.buildFromProjectDir("C:/Users/xsy/labProject/arkanalyzer-master/DevEchoStudioProject/Pedometer")
    let projectScene: Scene = new Scene();
    projectScene.buildSceneFromProjectDir(config);
    projectScene.inferTypes();

    let entryPoints: MethodSignature[] = [];

    entryPoints.push(
        ...projectScene
            .getFiles()
            .filter(arkFile => arkFile.getName().includes('EntryAbility.ts'))
            .flatMap(arkFile => arkFile.getClasses())
            .filter(arkClass => arkClass.getName() === "EntryAbility")
            .flatMap(arkClass => arkClass.getMethods())
            .filter(arkMethod => arkMethod.getName() === 'onWindowStageCreate')
            .map(arkMethod => arkMethod.getSignature())
    );
    
    let callGraph = new CallGraph(projectScene);
    let callGraphBuilder = new CallGraphBuilder(callGraph, projectScene);
    // if (true) {
    //     callGraphBuilder.buildClassHierarchyCallGraph(entryPoints, false);
    // } else {
    //     callGraphBuilder.buildRapidTypeCallGraph(entryPoints, false);
    // }
    // callGraph.dump('out/cg.dot');
    callGraphBuilder.buildClassHierarchyCallGraph(entryPoints)
    callGraph.dump('out/cg.dot')
}

function run4Project(): void {
    config.buildFromJson('./tests/resources/callgraph/callGraphConfigUnix.json');
    let projectScene: Scene = new Scene();
    projectScene.buildBasicInfo(config);
    projectScene.buildScene4HarmonyProject();
    projectScene.inferTypes();

    let callGraph = new CallGraph(projectScene);
    let callGraphBuilder = new CallGraphBuilder(callGraph, projectScene);

    callGraphBuilder.buildCHA4WholeProject(true);

    console.log(callGraph.getStat());
    console.log('entry count: ', callGraph.getEntries().length);
}

if (false) {
    run4Project();
} else {
    runDir();
}

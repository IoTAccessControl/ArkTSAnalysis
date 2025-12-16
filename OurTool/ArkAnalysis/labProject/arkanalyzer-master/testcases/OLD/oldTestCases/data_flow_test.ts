import { SceneConfig } from '../src';
import { Scene } from '../src';
//import { DEFAULT_ARK_METHOD_NAME } from '../../src';
import { Logger, LOG_LEVEL, LOG_MODULE_TYPE } from '../src';

const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'DefUseChainTest');
Logger.configure("C:/Users/xsy/labProject/arkanalyzer-master/out/PedometerOut/logInfo.txt", LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);
//Logger.configure("C:/Users/xsy/labProject/arkanalyzer-master/out/PedometerOut/fullLLogInfo.txt", LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

export class dataFlowTest {
    public buildScene(): Scene {
        //const prjDir = "tests/resources/defUseChain";
        let config: SceneConfig = new SceneConfig();
        config.buildFromJson('C:/Users/xsy/labProject/arkanalyzer-master/tests/resources/analyzePedometer.json');
        let projectScene: Scene = new Scene();
        projectScene.buildSceneFromProjectDir(config);
        return projectScene;
    }

    public dataFlowAnalyzer() {
        let scene = this.buildScene();
        scene.inferTypes();

        for (const arkFile of scene.getFiles()) {
            //logger.info("******FileName: ",arkFile.getName())
            for (const arkClass of arkFile.getClasses()) {
                //logger.info("******ClassName: ",arkClass.getName())
                for (const arkMethod of arkClass.getMethods()) {
                    // if (arkMethod.getName() == DEFAULT_ARK_METHOD_NAME) {
                    //     continue;
                    // }
                    if(arkMethod.getName().includes("startContinuousTask")){
                        logger.info('******MethodName: ', arkMethod.getName());
                        console.log(arkMethod.getName()+"   OuterMethod:    "+arkMethod.getOuterMethod()?.getName());
                        const cfg = arkMethod.getBody()?.getCfg();
                        cfg?.buildDefUseChain();
                        if (cfg) {
                            for (const chain of cfg.getDefUseChains()){
                                logger.info("variable: "+chain.value.toString()+", def: "+chain.def.toString()+", use: "+chain.use.toString());
                            }
                        }
                    }
                    
                }
            }
        }
    }

    public testTypeInference(): void {
        let scene = this.buildScene();
        scene.inferTypes();
    }
}

let ADataFlowTest = new dataFlowTest();
ADataFlowTest.dataFlowAnalyzer();

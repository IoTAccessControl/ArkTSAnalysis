//文件读取
import * as fs from 'fs';

import { ArkMethod, SceneConfig } from '../src';
import { Scene } from '../src';
import { Logger, LOG_LEVEL, LOG_MODULE_TYPE } from '../src';

const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'APPTEST');
Logger.configure('', LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

let config: SceneConfig = new SceneConfig();

//const CONFIG_JSON = 'C:/Users/xsy/labProject/arkanalyzer-master/tests/resources/analyzePedometer.json';
const CONFIG_JSON = 'C:/Users/xsy/labProject/arkanalyzer-master/myTests/myJSON/test.json';
const FILE_PATH = 'C:/Users/xsy/labProject/arkanalyzer-master/myTests/output/method.txt';

// build from json
config.buildFromJson(CONFIG_JSON);
function runScene4Json(config: SceneConfig) {
    let projectScene: Scene = new Scene();
    projectScene.buildSceneFromProjectDir(config);
    projectScene.inferTypes();
    logger.info('runScene4Json exit.');
    let myMethod: ArkMethod[] = projectScene.getMethods();
    let myMethodName: string[] = myMethod.map(mthd => mthd.getName());
    //console.log(myMethodName);
    const contentToWrite = myMethodName.join('\n');
    fs.writeFile(FILE_PATH,contentToWrite,(err)=>{
        if (err) throw err;
    console.log('内容已写入到文件中');
    });

}
runScene4Json(config);
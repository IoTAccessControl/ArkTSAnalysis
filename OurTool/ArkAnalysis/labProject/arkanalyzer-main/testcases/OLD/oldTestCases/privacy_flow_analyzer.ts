/**
 * 简单版本的隐私数据流分析：
 * - 源（source）：凡是定义语句中出现 geoLocationManager.Location 的变量，一律当作定位隐私数据
 * - 传播：在同一个方法内，如果某个变量的定义语句里用到了带污点变量的名字，就把这个新变量也标记为污点
 * - 汇（sink）：console.log / console.error / 网络 / 文件 等调用中，只要实参变量带污点，就输出一条“隐私泄露”日志
 *
 * 使用方式：
 * 1. 确保 analyzePedometer.json 已经配置好 Pedometer 工程与 etsSdk 路径
 * 2. 修改下面 CONFIG_JSON / LOG_FILE 为你本地路径
 * 3. 在 arkanalyzer 根目录下用 ts-node 或编译后 node 运行本文件
 */

import {
  SceneConfig,
  Scene,
  Logger,
  LOG_LEVEL,
  LOG_MODULE_TYPE,
} from '../src';

const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'PrivacyFlowTest');

// 日志输出位置 —— 按需修改
const LOG_FILE = 'C:/Users/xsy/labProject/arkanalyzer-master/out/PedometerOut/privacyFlow.log';

// JSON 配置位置 —— 按需修改（用你现在已经在用的那个）
const CONFIG_JSON = 'C:/Users/xsy/labProject/arkanalyzer-master/tests/resources/analyzePedometer.json';

// 初始化日志：文件 INFO，控制台只打 ERROR
Logger.configure(LOG_FILE, LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

class PrivacyFlowAnalyzer {
  private buildScene(): Scene {
    const config: SceneConfig = new SceneConfig();
    config.buildFromJson(CONFIG_JSON);

    const scene: Scene = new Scene();
    scene.buildSceneFromProjectDir(config);
    return scene;
  }

  // 判断一个定义语句是否是“定位隐私源”
  private isLocationSourceDef(defStr: string): boolean {
    if (!defStr) return false;
    // 这是你 logInfo.txt 里能看到的类型串，可以按需再加别的敏感类型
    return (
      defStr.includes('@ohos.geoLocationManager.d.ts') &&
      defStr.includes('geoLocationManager.Location')
    );
  }

  // 判断某个 use 语句是不是潜在的“汇”
  private detectSinkKind(useStr: string): string | null {
    if (!useStr) return null;

    // 日志输出（弱泄露）
    if (useStr.includes('console.[static]log') || useStr.includes('console.[static]error')) {
      return 'console';
    }

    // 网络相关（示例关键字，具体可以根据你项目实际调整）
    if (useStr.includes('@ohos.net.http') || useStr.includes('http.%dflt')) {
      return 'network';
    }

    // 文件 / 存储（示例关键字）
    if (useStr.includes('@ohos.file.fs') || useStr.includes('fs.write')) {
      return 'file';
    }

    // 你可以继续加更多，比如 WebView、数据库等等
    return null;
  }

  public run(): void {
    const scene = this.buildScene();
    scene.inferTypes();
    logger.info('=== PrivacyFlowTest: start analysis ===');

    for (const arkFile of scene.getFiles()) {
      const fileName = arkFile.getName();

      for (const arkClass of arkFile.getClasses()) {
        const className = arkClass.getName();

        for (const arkMethod of arkClass.getMethods()) {
          const methodName = arkMethod.getName();
          const body = arkMethod.getBody();
          const cfg = body?.getCfg();
          if (!cfg) {
            continue;
          }

          // 构建当前方法的 DefUseChain
          cfg.buildDefUseChain();
          const chains: any[] = [];
          for (const chain of cfg.getDefUseChains()) {
            chains.push(chain);
          }
          if (chains.length === 0) {
            continue;
          }

          // taintedVars：当前方法内被标记为“带隐私数据”的变量名（用 chain.value.toString() 表示）
          const taintedVars = new Set<string>();
          // 记录每个污点变量最初的“源定义”，方便报表里展示
          const sourceDefOfVar = new Map<string, string>();

          // Step 1：初始源（Location）
          for (const chain of chains) {
            const defStr = chain.def ? chain.def.toString() : '';
            const varStr = chain.value ? chain.value.toString() : '';

            if (this.isLocationSourceDef(defStr)) {
              if (!taintedVars.has(varStr)) {
                taintedVars.add(varStr);
                sourceDefOfVar.set(varStr, defStr);
                logger.info(
                  `[Source] file=${fileName}, class=${className}, method=${methodName}, var=${varStr}\n` +
                  `        def = ${defStr}`
                );
              }
            }
          }

          // 没有源，跳过这个方法
          if (taintedVars.size === 0) {
            continue;
          }

          // Step 2：在方法内做一个非常简单的“基于字符串”的污点传播
          // 规则：如果某个变量的定义语句里包含了一个已污点变量的名字，就把这个变量也标记为污点
          let changed = true;
          while (changed) {
            changed = false;

            for (const chain of chains) {
              const defStr = chain.def ? chain.def.toString() : '';
              const varStr = chain.value ? chain.value.toString() : '';

              if (!defStr || taintedVars.has(varStr)) {
                continue;
              }

              for (const tv of taintedVars) {
                if (tv && defStr.indexOf(tv) !== -1) {
                  taintedVars.add(varStr);
                  // 把源信息从老的污点变量继承下来
                  const srcDef = sourceDefOfVar.get(tv) || defStr;
                  if (!sourceDefOfVar.has(varStr)) {
                    sourceDefOfVar.set(varStr, srcDef);
                  }
                  logger.info(
                    `[Propagate] file=${fileName}, class=${className}, method=${methodName}\n` +
                    `           fromVar=${tv} => toVar=${varStr}\n` +
                    `           def = ${defStr}`
                  );
                  changed = true;
                  break;
                }
              }
            }
          }

          // Step 3：找“汇” —— 带污点变量参与的敏感调用
          for (const chain of chains) {
            const varStr = chain.value ? chain.value.toString() : '';
            if (!taintedVars.has(varStr)) {
              continue;
            }

            const useStr = chain.use ? chain.use.toString() : '';
            const sinkKind = this.detectSinkKind(useStr);
            if (!sinkKind) {
              continue;
            }

            const srcDef = sourceDefOfVar.get(varStr) || '(unknown source def)';

            logger.info(
              `[Leak][${sinkKind}] file=${fileName}, class=${className}, method=${methodName}\n` +
              `       taintedVar = ${varStr}\n` +
              `       sourceDef  = ${srcDef}\n` +
              `       sinkUse    = ${useStr}`
            );
          }
        }
      }
    }

    logger.info('=== PrivacyFlowTest: analysis finished ===');
  }
}

// 入口
const analyzer = new PrivacyFlowAnalyzer();
analyzer.run();

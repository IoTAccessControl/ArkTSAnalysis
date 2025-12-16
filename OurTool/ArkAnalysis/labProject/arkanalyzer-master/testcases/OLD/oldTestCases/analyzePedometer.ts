import { SceneConfig, Scene, MethodSignature } from "../src";
import { CallGraph } from "../src";

/**
 * 隐私 API 描述
 */
/**
 * 隐私 API 标注
 */
function getPrivacyDescription(signature: string): string | null {
  if (signature.includes("preferences.getPreferences")) {
    return "本地存储：获取用户偏好数据";
  }
  if (signature.includes("preferences.put")) {
    return "本地存储：写入用户数据";
  }
  if (signature.includes("preferences.get(")) {
    return "本地存储：读取用户数据";
  }
  if (signature.includes("geoLocationManager.on")) {
    return "地理位置：开启位置监听";
  }
  if (signature.includes("geoLocationManager.off")) {
    return "地理位置：关闭位置监听";
  }
  if (signature.includes("sensor.on")) {
    return "传感器：步数/运动健康数据";
  }
  if (signature.includes("sensor.off")) {
    return "传感器：关闭步数监听";
  }
  if (signature.includes("hilog.error")) {
    return "日志输出（可能包含敏感信息）";
  }
  return null;
}

/**
 * 打印调用链：去掉前缀链路 + 隐私标注
 */
function printCallChains(cg: CallGraph, entryPoints: MethodSignature[]) {
  const allChains: string[][] = [];

  function dfs(nodeId: number, prefix: string[]) {
    const node = cg.getNode(nodeId);
    const methodStr = (node as any).getMethod().toString();
    const desc = getPrivacyDescription(methodStr);
    const annotated = desc ? `${methodStr} (隐私: ${desc})` : methodStr;

    const chain = [...prefix, annotated];

    if (node!.getOutgoingEdges().size === 0) {
      allChains.push(chain);
    } else {
      for (const edge of node!.getOutgoingEdges()) {
        dfs(edge.getDstID(), chain);
      }
    }
  }

  for (const ep of entryPoints) {
    const startNode = cg.getCallGraphNodeByMethod(ep);
    dfs(startNode.getID(), []);
  }

  // 去掉前缀链路：只保留最长的
  const filtered: string[][] = [];
  for (let i = 0; i < allChains.length; i++) {
    let isPrefix = false;
    for (let j = 0; j < allChains.length; j++) {
      if (i !== j && allChains[j].length >= allChains[i].length) {
        let prefixMatch = true;
        for (let k = 0; k < allChains[i].length; k++) {
          if (allChains[i][k] !== allChains[j][k]) {
            prefixMatch = false;
            break;
          }
        }
        if (prefixMatch) {
          isPrefix = true;
          break;
        }
      }
    }
    if (!isPrefix) {
      filtered.push(allChains[i]);
    }
  }

  // 输出结果
  for (const chain of filtered) {
    console.log(chain.join(" -> "));
  }
}

function getPrivacyDescriptionNew(signature: string): string | null {
  if (signature.includes("preferences.getPreferences")) {
    return "本地存储：获取用户偏好数据";
  }
  if (signature.includes("preferences.put")) {
    return "本地存储：写入用户数据";
  }
  if (signature.includes("preferences.get(")) {
    return "本地存储：读取用户数据";
  }
  if (signature.includes("geoLocationManager.on")) {
    return "地理位置：开启位置监听";
  }
  if (signature.includes("geoLocationManager.off")) {
    return "地理位置：关闭位置监听";
  }
  if (signature.includes("sensor.on")) {
    return "传感器：步数/运动健康数据";
  }
  if (signature.includes("sensor.off")) {
    return "传感器：关闭步数监听";
  }
  return null;
}

function printCallChainsNew(cg: CallGraph, entryPoints: MethodSignature[]) {
  function dfs(nodeId: number, prefix: string[]) {
    const node = cg.getNode(nodeId);
    const methodStr = (node as any).getMethod().toString();
    const desc = getPrivacyDescriptionNew(methodStr);

    const chain = [...prefix, methodStr + (desc ? " (隐私: " + desc + ")" : "")];

    // 打印整条链路
    console.log(chain.join(" -> "));

    for (const edge of node!.getOutgoingEdges()) {
      dfs(edge.getDstID(), chain);
    }
  }

  for (const ep of entryPoints) {
    const startNode = cg.getCallGraphNodeByMethod(ep);
    dfs(startNode.getID(), []);
  }
}


async function main() {
  // 1. 读取配置
  let config: SceneConfig = new SceneConfig();
  config.buildFromJson('C:\\Users\\xsy\\labProject\\arkanalyzer-master\\tests\\resources\\analyzePedometer.json');

  let projectScene: Scene = new Scene();
  projectScene.buildSceneFromProjectDir(config);

  // 2. 选择入口点
  let entryPoints: MethodSignature[] = [];
  const candidateNames = ["onCreate", "onWindowStageCreate", "onForeground"];
  for (let name of candidateNames) {
    let m = projectScene.getMethods().find(mm => mm.getName() === name);
    if (m) entryPoints.push(m.getSignature());
  }

  // 额外加入 StepService / LocationUtil 的关键方法
  for (let m of projectScene.getMethods()) {
    if (
      m.getName().includes("createStepsPreferences") ||
      m.getName().includes("geolocationOn") ||
      m.getName().includes("geolocationOff") ||
      m.getName().includes("putStorageValue") ||
      m.getName().includes("getStorageValue") ||
      m.getName().includes("requestPermissions")
    ) {
      entryPoints.push(m.getSignature());
    }
  }
  // 3. 类型推导
  projectScene.inferTypes();

  // 4. 构建调用图（推荐用 RTA ）
  let cg: CallGraph = projectScene.makeCallGraphRTA(entryPoints);

  // 5. 打印调用链（带隐私标注）
  if (true)
    printCallChains(cg, entryPoints);
  else 
    printCallChainsNew(cg, entryPoints);
}

main().catch(err => {
  console.error("分析出错:", err);
});

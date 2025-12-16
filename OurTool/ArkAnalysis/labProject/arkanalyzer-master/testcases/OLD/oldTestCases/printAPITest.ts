/*
 * 敏感 API 调用路径分析（嵌套 JSON 版）
 *
 * 步骤：
 * 1. 配好 CONFIG_JSON / SENSITIVE_CFG_JSON / OUTPUT_JSON
 * 2. tsc 编译后 node dist/tests/samples/mySensitiveApiPath.js
 */

import {
  SceneConfig,
  Scene,
  ArkFile,
  ArkClass,
  ArkMethod,
  CallGraph,
  CallGraphBuilder,
  CallGraphNode,
  CallSite,
  MethodSignature,
  Logger,
  LOG_LEVEL,
  LOG_MODULE_TYPE,
} from '../src';

import * as fs from 'fs';
import * as path from 'path';

// ==== 路径配置：按你本机改 ====

// 工程配置（analyzePedometer.json）
const CONFIG_JSON =
  '/home/xsy/labProject/arkanalyzer-master/myTests/myJSON/analyzePedometer.json';

// 敏感 API 配置（后面给示例）
const SENSITIVE_CFG_JSON =
  '/home/xsy/labProject/arkanalyzer-master/myTests/myJSON/sensitiveApis.json';

// 输出的嵌套 JSON 文件
const OUTPUT_JSON =
  'myTests/output/sensitiveApisPath.json';

const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'MY_SENSITIVE_API_PATH');
Logger.configure('', LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

// ==== 你原来用过的结构，稍微加了字段 ====

interface ApiCallSite {
  projectFile: string;
  line: number;
  column: number;
  snippet: string;
  contextBefore?: string[];
  contextAfter?: string[];
  // 新增：调用这个 API 的“业务方法”签名，用来找路径
  callerSignature: string;
  calleeSignature: string;
}

interface SystemApiUsage {
  fileName: string;   // SDK 声明文件名
  className: string;
  methodName: string;
  isStatic: boolean;
  callSites: ApiCallSite[];
}

interface CallEdgeLocation {
  projectFile?: string;
  line?: number;
  column?: number;
  snippet?: string;
  contextBefore?: string[];
  contextAfter?: string[];
}

interface CallPathNode {
  signature: string;
  projectFile?: string;
  line?: number;
  column?: number;
  snippet?: string;
  contextBefore?: string[];
  contextAfter?: string[];
  children?: CallPathNode[];
}

// ==== 敏感 API 配置结构 ====

interface SensitiveApiRule {
  // SDK 声明文件名中包含的子串，比如 "@ohos.location" / "@kit.AbilityKit"
  fileContains?: string;
  className?: string;
  methodName?: string;
  category: string;   // "LOCATION" / "CONTACT" / ...
}

interface SensitiveConfig {
  apis: SensitiveApiRule[];
}

// ==== 输出 JSON 结构 ====

interface SensitiveApiPathReport {
  project: string;
  generatedAt: string;
  configPath: string;
  sensitiveApis: SensitiveApiRecord[];
}

interface SensitiveApiRecord {
  sdkFile: string;
  module: string;
  className: string;
  methodName: string;
  isStatic: boolean;
  category: string;
  callSites: SensitiveCallSite[];
}

interface SensitiveCallSite {
  projectFile: string;
  line: number;
  column: number;
  snippet: string;
  contextBefore?: string[];
  contextAfter?: string[];
  callerSignature: string;
  callPath: CallPathNode;   // 嵌套链条：entry -> ... -> callerSignature -> 敏感 API
}

// ==== 小工具：根据行号取上下文 ====

const DEFAULT_BEFORE = 0;
const DEFAULT_AFTER = 0;
const CONTEXT_BEFORE = Number(process.argv[2] ?? DEFAULT_BEFORE) || DEFAULT_BEFORE;
const CONTEXT_AFTER = Number(process.argv[3] ?? DEFAULT_AFTER) || DEFAULT_AFTER;

function getContextLines(
  lines: string[],
  centerLine: number,
  before: number,
  after: number
): { beforeLines: string[]; afterLines: string[] } {
  if (centerLine <= 0 || lines.length === 0) {
    return { beforeLines: [], afterLines: [] };
  }
  const idx = centerLine - 1;
  const start = Math.max(0, idx - before);
  const end = Math.min(lines.length - 1, idx + after);

  const beforeLines: string[] = [];
  for (let i = start; i < idx; i++) {
    beforeLines.push(`${i + 1}: ${lines[i]}`);
  }
  const afterLines: string[] = [];
  for (let i = idx + 1; i <= end; i++) {
    afterLines.push(`${i + 1}: ${lines[i]}`);
  }
  return { beforeLines, afterLines };
}

function captureCallSiteLocation(callSite: CallSite): CallEdgeLocation | undefined {
  const stmt = callSite.callStmt;
  if (!stmt) {
    return undefined;
  }
  const cfg = stmt.getCfg();
  if (!cfg) {
    return undefined;
  }
  const declaringMethod = cfg.getDeclaringMethod();
  if (!declaringMethod) {
    return undefined;
  }
  const arkFile = declaringMethod.getDeclaringArkFile();
  if (!arkFile) {
    return undefined;
  }

  const code = arkFile.getCode();
  const lines = code ? code.split(/\r?\n/) : [];

  const pos = stmt.getOriginPositionInfo();
  const line = pos.getLineNo();
  const column = pos.getColNo();
  let snippet = stmt.getOriginalText() ?? '';
  if (!snippet && line > 0 && lines.length > 0) {
    const idx = line - 1;
    if (idx >= 0 && idx < lines.length) {
      snippet = lines[idx].trim();
    }
  }

  let contextBefore: string[] = [];
  let contextAfter: string[] = [];
  if (lines.length > 0 && line > 0 && (CONTEXT_BEFORE > 0 || CONTEXT_AFTER > 0)) {
    const ctx = getContextLines(lines, line, CONTEXT_BEFORE, CONTEXT_AFTER);
    contextBefore = ctx.beforeLines;
    contextAfter = ctx.afterLines;
  }

  const location: CallEdgeLocation = {
    projectFile: arkFile.getFilePath(),
    line,
    column,
    snippet,
  };
  if (contextBefore.length > 0) {
    location.contextBefore = contextBefore;
  }
  if (contextAfter.length > 0) {
    location.contextAfter = contextAfter;
  }

  return location;
}

// ==== 构建 Scene / CallGraph ====

function buildSceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config); // 和你原来的脚本一致 :contentReference[oaicite:4]{index=4}
  scene.inferTypes();

  return { scene, config };
}

function buildCallGraph(scene: Scene): CallGraph {
  const cg = new CallGraph(scene);
  const builder = new CallGraphBuilder(cg, scene);
  builder.buildCHA4WholeProject(true); // CHA 全工程调用图 :contentReference[oaicite:5]{index=5}
  logger.info('CallGraph built. Stat: ' + cg.getStat());
  return cg;
}

// ==== 从 CallGraph 里提取“方法调用图 + 入口集合” ====

function buildMethodGraph(cg: CallGraph): {
  graph: Map<string, Set<string>>;
  entrySigs: string[];
  edgeCallLocations: Map<string, Map<string, CallEdgeLocation>>;
} {
  const graph = new Map<string, Set<string>>();
  const edgeCallLocations = new Map<string, Map<string, CallEdgeLocation>>();

  // 1) 构建 caller -> callee 集合
  for (const baseNode of cg.getNodesIter()) {
    const node = baseNode as CallGraphNode;
    const methodSig = node.getMethod() as MethodSignature;
    if (!methodSig) {
      continue;
    }
    const callerSigStr = methodSig.toString();
    let succ = graph.get(callerSigStr);
    if (!succ) {
      succ = new Set<string>();
      graph.set(callerSigStr, succ);
    }

    const callSites: CallSite[] = Array.from(cg.getCallSitesByMethod(methodSig));
    for (const cs of callSites) {
      const calleeId = cs.getCalleeFuncID();
      if (calleeId === undefined) {
        continue;
      }
      const calleeMethod = cg.getMethodByFuncID(calleeId);
      if (!calleeMethod) {
        continue;
      }
      const calleeSigStr = calleeMethod.toString();
      succ.add(calleeSigStr);
      const calleeMap = edgeCallLocations.get(calleeSigStr) ?? new Map<string, CallEdgeLocation>();
      if (!calleeMap.has(callerSigStr)) {
        const edgeLocation = captureCallSiteLocation(cs);
        calleeMap.set(callerSigStr, edgeLocation ?? {});
        edgeCallLocations.set(calleeSigStr, calleeMap);
      }
    }
  }

  // 2) 入口方法签名
  const entrySigs: string[] = [];
  for (const entries of cg.getEntries()) {
    const entryMethod = cg.getMethodByFuncID(entries);
    if (entryMethod) {
      entrySigs.push(entryMethod.toString());
    }
  }
  return { graph, entrySigs, edgeCallLocations };
}

// ==== BFS：从入口出发，给每个方法找一个前驱（用来还原路径） ====

function buildPredecessor(
  graph: Map<string, Set<string>>,
  entrySigs: string[]
): Map<string, string | null> {
  const prev = new Map<string, string | null>();
  const queue: string[] = [];

  for (const e of entrySigs) {
    if (!prev.has(e)) {
      prev.set(e, null);
      queue.push(e);
    }
  }

  while (queue.length > 0) {
    const cur = queue.shift()!;
    const succ = graph.get(cur);
    if (!succ) {
      continue;
    }
    for (const nxt of succ) {
      if (!prev.has(nxt)) {
        prev.set(nxt, cur);
        queue.push(nxt);
      }
    }
  }

  return prev;
}

function getCallPath(prev: Map<string, string | null>, methodSigStr: string): string[] {
  if (!prev.has(methodSigStr)) {
    return [methodSigStr]; // 找不到入口时，至少把自己放进去
  }
  const path: string[] = [];
  let cur: string | null | undefined = methodSigStr;
  while (cur !== null && cur !== undefined) {
    path.push(cur);
    cur = prev.get(cur)!;
  }
  return path.reverse();
}

function createCallPathNode(signature: string, location?: CallEdgeLocation): CallPathNode {
  const node: CallPathNode = { signature };
  if (location) {
    if (location.projectFile) {
      node.projectFile = location.projectFile;
    }
    if (location.line !== undefined) {
      node.line = location.line;
    }
    if (location.column !== undefined) {
      node.column = location.column;
    }
    if (location.snippet) {
      node.snippet = location.snippet;
    }
    if (location.contextBefore && location.contextBefore.length > 0) {
      node.contextBefore = location.contextBefore;
    }
    if (location.contextAfter && location.contextAfter.length > 0) {
      node.contextAfter = location.contextAfter;
    }
  }
  return node;
}

function buildCallPathTree(
  path: string[],
  edgeCallLocations: Map<string, Map<string, CallEdgeLocation>>,
  site: ApiCallSite
): CallPathNode {
  const nodes: CallPathNode[] = [];
  for (let i = 0; i < path.length; i++) {
    const signature = path[i];
    let location: CallEdgeLocation | undefined;
    if (i > 0) {
      const prevSignature = path[i - 1];
      location = edgeCallLocations.get(signature)?.get(prevSignature);
    }
    nodes.push(createCallPathNode(signature, location));
  }

  const finalLocation: CallEdgeLocation = {
    projectFile: site.projectFile,
    line: site.line,
    column: site.column,
    snippet: site.snippet,
  };
  if (site.contextBefore && site.contextBefore.length > 0) {
    finalLocation.contextBefore = site.contextBefore;
  }
  if (site.contextAfter && site.contextAfter.length > 0) {
    finalLocation.contextAfter = site.contextAfter;
  }
  const sensitiveNode = createCallPathNode(site.calleeSignature, finalLocation);

  if (nodes.length === 0) {
    return sensitiveNode;
  }

  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].children = [nodes[i + 1]];
  }
  nodes[nodes.length - 1].children = [sensitiveNode];
  return nodes[0];
}

// ==== 判断“是不是框架/系统 API”（包括 @ohos / @kit） ====

function isFrameworkApiFile(
  projectName: string,
  fileName: string,
  targetProjectName: string
): boolean {
  if (projectName === targetProjectName) {
    return false;
  }
  if (projectName === 'built-in') {
    return false;
  }
  // 尽量宽一点，后面还会用敏感配置再过滤
  if (fileName.includes('@ohos.') || fileName.includes('@kit.')) {
    return true;
  }
  if (fileName.startsWith('api/')) {
    return true;
  }
  return false;
}

// ==== Step1：收集所有框架（系统）API 的调用点 ====

function collectSystemApis(scene: Scene, targetProjectName: string): SystemApiUsage[] {
  const result = new Map<string, SystemApiUsage>(); // key: fileName::class::[static]method

  const projectFiles: ArkFile[] = scene.getFiles();

  for (const arkFile of projectFiles) {
    const classes: ArkClass[] = arkFile.getClasses();

    const code = arkFile.getCode?.() ?? '';
    const lines = code ? code.split(/\r?\n/) : [];

    for (const arkClass of classes) {
      const methods: ArkMethod[] = arkClass.getMethods();

      for (const arkMethod of methods) {
        const body = arkMethod.getBody();
        if (!body) {
          continue;
        }
        const cfg = body.getCfg();
        if (!cfg) {
          continue;
        }

        const callerSigStr = arkMethod.getSignature().toString();

        for (const block of cfg.getBlocks() as any) {
          for (const stmt of block.getStmts() as any) {
            const invoke = stmt.getInvokeExpr?.();
            if (!invoke) {
              continue;
            }
            const methodSig = invoke.getMethodSignature();
            const classSig = methodSig.getDeclaringClassSignature();
            const fileSig = classSig.getDeclaringFileSignature();

            const projectName = fileSig.getProjectName();
            const fileName = fileSig.getFileName();

            const calleeSigStr = methodSig.toString();

            if (!isFrameworkApiFile(projectName, fileName, targetProjectName)) {
              continue;
            }

            const subSig = methodSig.getMethodSubSignature();
            const className = classSig.getClassName();
            const methodName = subSig.getMethodName();
            const isStatic = subSig.isStatic();

            const key = `${fileName}::${className}::${isStatic ? '[static]' : ''}${methodName}`;

            let usage = result.get(key);
            if (!usage) {
              usage = {
                fileName,
                className,
                methodName,
                isStatic,
                callSites: [],
              };
              result.set(key, usage);
            }

            // 位置 + 代码片段
            let line = -1;
            let column = -1;
            let snippet = '';

            try {
              const pos = stmt.getOriginPositionInfo?.();
              if (pos) {
                line = pos.getLineNo?.() ?? -1;
                column = pos.getColNo?.() ?? -1;
              }
              if (typeof stmt.getOriginalText === 'function') {
                snippet = stmt.getOriginalText() ?? '';
              }
              if (!snippet && line > 0 && lines.length > 0) {
                const idx = line - 1;
                if (idx >= 0 && idx < lines.length) {
                  snippet = lines[idx].trim();
                }
              }
            } catch {
              // 忽略单个位置错误
            }

            const projectFilePath = arkFile.getFilePath();
            const already = usage.callSites.some(
              (site) =>
                site.projectFile === projectFilePath &&
                site.line === line &&
                site.column === column
            );
            if (!already) {
              let contextBefore: string[] = [];
              let contextAfter: string[] = [];
              if (lines.length > 0 && line > 0 && (CONTEXT_BEFORE > 0 || CONTEXT_AFTER > 0)) {
                const ctx = getContextLines(lines, line, CONTEXT_BEFORE, CONTEXT_AFTER);
                contextBefore = ctx.beforeLines;
                contextAfter = ctx.afterLines;
              }
              usage.callSites.push({
                projectFile: projectFilePath,
                line,
                column,
                snippet,
                contextBefore,
                contextAfter,
                callerSignature: callerSigStr,
                calleeSignature: calleeSigStr,
              });
            }
          }
        }
      }
    }
  }

  return Array.from(result.values());
}

// ==== Step2：加载敏感 API 配置 + 匹配 ====

function loadSensitiveConfig(): SensitiveConfig {
  const content = fs.readFileSync(SENSITIVE_CFG_JSON, 'utf-8');
  return JSON.parse(content) as SensitiveConfig;
}

function matchSensitiveCategory(
  cfg: SensitiveConfig,
  fileName: string,
  className: string,
  methodName: string
): string | undefined {
  // // 特殊处理：GeoLocationManager.off 归类为 UNCLASSIFIED，防止 config 中漏掉
  // const hasGeoRule = cfg.apis.some(
  //   (rule) =>
  //     rule.fileContains?.includes('@ohos.geoLocationManager') && rule.methodName === 'off'
  // );
  // if (fileName.includes('@ohos.geoLocationManager') && methodName === 'off' && !hasGeoRule) {
  //   return 'UNCLASSIFIED';
  // }
  for (const rule of cfg.apis) {
    if (rule.fileContains && !fileName.includes(rule.fileContains)) {
      continue;
    }
    // if (rule.className && className.includes(rule.className)) {
    //   continue;
    // }
    // if (rule.methodName && !methodName.includes(rule.methodName)) {
    //   continue;
    // }
    return rule.category;
  }
  return undefined;
}

function getModuleNameFromSdkFile(fileName: string): string {
  // 例如 api/@ohos.location.d.ts / api/@kit.AbilityKit.d.ts
  const m = fileName.match(/@(ohos|kit)[^/]*\.d\.ts$/);
  if (m) {
    return m[0].replace('.d.ts', '');
  }
  return fileName;
}

// ==== Step3：把上面的数据拼成嵌套 JSON 报告 ====

function buildSensitiveReport(
  usages: SystemApiUsage[],
  prev: Map<string, string | null>,
  edgeCallLocations: Map<string, Map<string, CallEdgeLocation>>,
  projectName: string,
  configPath: string,
  sensCfg: SensitiveConfig
): SensitiveApiPathReport {
  const records: SensitiveApiRecord[] = [];

  for (const u of usages) {
    const category = matchSensitiveCategory(sensCfg, u.fileName, u.className, u.methodName);
    if (!category) {
      continue; // 只保留敏感 API
    }

    const module = getModuleNameFromSdkFile(u.fileName);

    const callSites: SensitiveCallSite[] = u.callSites.map((site) => ({
      projectFile: site.projectFile,
      line: site.line,
      column: site.column,
      snippet: site.snippet,
      contextBefore: site.contextBefore,
      contextAfter: site.contextAfter,
      callerSignature: site.callerSignature,
      callPath: buildCallPathTree(getCallPath(prev, site.callerSignature), edgeCallLocations, site),
    }));

    records.push({
      sdkFile: u.fileName,
      module,
      className: u.className,
      methodName: u.methodName,
      isStatic: u.isStatic,
      category,
      callSites,
    });
  }

  // 排个序，方便读
  records.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    if (a.module !== b.module) return a.module.localeCompare(b.module);
    if (a.className !== b.className) return a.className.localeCompare(b.className);
    return a.methodName.localeCompare(b.methodName);
  });

  return {
    project: projectName,
    generatedAt: new Date().toISOString(),
    configPath,
    sensitiveApis: records,
  };
}

// ==== main 入口 ====

function main() {
  console.log(`Building scene from config: ${CONFIG_JSON}`);
  const { scene, config } = buildSceneFromJson(CONFIG_JSON);
  const targetProjectName = config.getTargetProjectName();

  console.log('Building call graph (CHA)...');
  const cg = buildCallGraph(scene);
  const { graph, entrySigs, edgeCallLocations } = buildMethodGraph(cg);
  const prev = buildPredecessor(graph, entrySigs);

  console.log('Collecting framework API usages...');
  const usages = collectSystemApis(scene, targetProjectName);

  console.log('Loading sensitive API config...');
  const sensCfg = loadSensitiveConfig();

  console.log('Building nested JSON report for sensitive API paths...');
  const report = buildSensitiveReport(
    usages,
    prev,
    edgeCallLocations,
    targetProjectName,
    CONFIG_JSON,
    sensCfg
  );

  const json = JSON.stringify(report, null, 2);

  const dir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(OUTPUT_JSON, json, 'utf-8');

  console.log(`✅ Sensitive API path report written to: ${OUTPUT_JSON}`);
}

main();

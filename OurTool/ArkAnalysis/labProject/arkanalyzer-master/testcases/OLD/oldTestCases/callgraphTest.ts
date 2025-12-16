import {
  SceneConfig,
  Scene,
  CallGraph,
  CallGraphBuilder,
  CallGraphNode,
  CallSite,
  MethodSignature,
  ArkMethod,
  ArkFile,
  Stmt,
  Logger,
  LOG_LEVEL,
  LOG_MODULE_TYPE,
} from '../../src';
// 【新增】导入 Node.js 的文件系统模块和路径模块
import * as fs from 'fs';
import * as path from 'path';

// 默认 0、0，不打印上下文
const DEFAULT_BEFORE = 0;
const DEFAULT_AFTER = 0;

// node xxx.js 5 5  => before=5, after=5
const CONTEXT_BEFORE = Number(process.argv[2] ?? DEFAULT_BEFORE) || DEFAULT_BEFORE;
const CONTEXT_AFTER  = Number(process.argv[3] ?? DEFAULT_AFTER) || DEFAULT_AFTER;

const CONFIG_JSON = '/home/xsy/labProject/arkanalyzer-master/myTests/myJSON/analyzePedometer.json';
const OUTPUT_JSON =
  '/home/xsy/labProject/arkanalyzer-master/myTests/output/callGraph.json';
const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'MY_PRINT_CALLGRAPH');
Logger.configure('', LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

interface CallRecord {
  calleeSigStr: string;
  line: number;
  col: number;
  code: string; // 代码片段
  contextBefore?: string[]; // 新增：前几行
  contextAfter?: string[];  // 新增：后几行
  callerSignature: string;
}

/**
 * 根据中心行号，从整文件 lines 里切出前 before 行、后 after 行。
 * centerLine: 1-based（和 ArkAnalyzer 的 Position 对齐）
 */
function getContextLines(
  lines: string[],
  centerLine: number,
  before: number,
  after: number,
): { beforeLines: string[]; afterLines: string[] } {
  if (centerLine <= 0 || lines.length === 0) {
    return { beforeLines: [], afterLines: [] };
  }

  const idx = centerLine - 1; // 换成 0-based 索引

  const start = Math.max(0, idx - before);
  const end = Math.min(lines.length - 1, idx + after);

  const beforeLines: string[] = [];
  for (let i = start; i < idx; i++) {
    beforeLines.push(`${i + 1}: ${lines[i]}`); // 顺手把行号打上
  }

  const afterLines: string[] = [];
  for (let i = idx + 1; i <= end; i++) {
    afterLines.push(`${i + 1}: ${lines[i]}`);
  }

  return { beforeLines, afterLines };
}

/**
 * 从 json 配置构建 Harmony 工程 Scene
 * 注意：configPath 要改成你自己工程的配置路径
 */
function buildHarmonySceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config: SceneConfig = new SceneConfig();
  config.buildFromJson(configPath);

  const scene: Scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

/**
 * 使用 CHA 为整个工程构建调用图
 */
function buildCallGraph(scene: Scene): CallGraph {
  const cg = new CallGraph(scene);
  const builder = new CallGraphBuilder(cg, scene);

  // true: 把辅助生成的方法也考虑进去
  builder.buildCHA4WholeProject(true);

  logger.info('CallGraph built. Stat: ' + cg.getStat());
  logger.info('Entry methods count: ' + cg.getEntries().length);

  return cg;
}

function buildMethodGraph(cg: CallGraph): { graph: Map<string, Set<string>>; entrySigs: string[] } {
  const graph = new Map<string, Set<string>>();

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
      graph.set(callerSigStr, succ);//没有就创建一个空的
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
    }
  }

  const entrySigs: string[] = [];
  for (const entry of cg.getEntries()) {
    const entryMethod = cg.getMethodByFuncID(entry);
    if (entryMethod) {
      entrySigs.push(entryMethod.toString());
    }
  }
  return { graph, entrySigs };
}

function buildPredecessor(graph: Map<string, Set<string>>, entrySigs: string[]): Map<string, string | null> {
  const prev = new Map<string, string | null>();
  const queue: string[] = [];

  for (const entry of entrySigs) {
    if (!prev.has(entry)) {
      prev.set(entry, null);
      queue.push(entry);
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
    return [methodSigStr];
  }
  const path: string[] = [];
  let cur: string | null | undefined = methodSigStr;
  while (cur !== null && cur !== undefined) {
    path.push(cur);
    cur = prev.get(cur);
  }
  return path.reverse();
}

/**
 * 收集“文件 -> 调用者方法 -> 调用记录(被调 + 代码片段)” 的信息
 */
function collectCallRelationsWithSnippets(
  cg: CallGraph,
  scene: Scene,
): Map<string, Map<string, CallRecord[]>> {
  // filePath -> (callerSigStr -> CallRecord[])
  const result = new Map<string, Map<string, CallRecord[]>>();

  for (const baseNode of cg.getNodesIter()) {
    const node = baseNode as CallGraphNode;

    // 跳过 SDK 方法 / 空方法，只看项目里的真实方法
    // 现在不注释掉，直接跳过 SDK 方法
    if (node.isSdkMethod() || node.isBlankMethod) {
      continue;
    }

    const callerMethodSig = node.getMethod() as MethodSignature;
    const arkCallerMethod: ArkMethod | null = scene.getMethod(callerMethodSig);
    if (!arkCallerMethod) {
      // 理论上这里就是 SDK 或没 body 的情况，稳妥起见再防一手
      continue;
    }

    const arkFile: ArkFile = arkCallerMethod.getDeclaringArkFile();
    const filePath = arkFile.getFilePath();
    const callerSigStr = callerMethodSig.toString();
    const allCode = arkFile.getCode(); //提前将文件代码读出来
    const lines = allCode ? allCode.split(/\r?\n/) : []; // 按行拆分

    let callerMap = result.get(filePath);
    if (!callerMap) {
      callerMap = new Map<string, CallRecord[]>();
      result.set(filePath, callerMap);
    }

    let records = callerMap.get(callerSigStr);
    if (!records) {
      records = [];
      callerMap.set(callerSigStr, records);
    }

    // 拿到这个方法的所有调用点（CallSite）
    const callSites: CallSite[] = Array.from(cg.getCallSitesByMethod(callerMethodSig));

    // 按行号排序，输出好看一点
    callSites.sort((a, b) => {
      const sa = a.callStmt as Stmt;
      const sb = b.callStmt as Stmt;
      const pa = sa.getOriginPositionInfo();
      const pb = sb.getOriginPositionInfo();
      return pa.getLineNo() - pb.getLineNo();
    });

    for (const cs of callSites) {
      const stmt = cs.callStmt as Stmt;

      // 可能是生成语句，没有对应源码位置，直接跳过
      const pos = stmt.getOriginPositionInfo();
      const line = pos.getLineNo();
      const col = pos.getColNo();
      if (line < 0) {
        continue;
      }

      // 找到被调方法（可能是项目方法，也可能是 SDK 方法）
      const calleeId = cs.getCalleeFuncID();
      let calleeSigStr = '<dynamic or unresolved callee>';
      if (calleeId !== undefined) {
        const calleeMethod = cg.getMethodByFuncID(calleeId);
        if (calleeMethod) {
          calleeSigStr = calleeMethod.toString();
        }
      }

      // 拿源码片段：优先用 originalText，不行就自己从文件里按行号切一行
      let code = stmt.getOriginalText() ?? '';
      if (!code && lines.length > 0) {
        if (line - 1 >= 0 && line - 1 < lines.length) {
            code = lines[line - 1].trim();
        }
      }

      let contextBefore: string[] = [];
      let contextAfter: string[] = [];
      if (lines.length > 0 && line > 0 && (CONTEXT_BEFORE > 0 || CONTEXT_AFTER > 0)) {
        const context = getContextLines(lines, line, CONTEXT_BEFORE, CONTEXT_AFTER);
        contextBefore = context.beforeLines;
        contextAfter = context.afterLines;
      }
        
      records.push({
        calleeSigStr,
        line,
        col,
        code,
        contextBefore,
        contextAfter,
        callerSignature: callerSigStr,
      });
    }
  }

  return result;
}

interface CallGraphReport {
  project: string;
  generatedAt: string;
  configPath: string;
  files: FileCall[];
}

interface FileCall {
  filePath: string;
  callers: CallerCall[];
}

interface CallerCall {
  signature: string;
  invocations: Invocation[];
}

interface Invocation {
  calleeSignature: string;
  line: number;
  column: number;
  snippet: string;
  contextBefore?: string[];
  contextAfter?: string[];
  callPath: string[];
  children?: Invocation[];
}

function mergeCallRecords(grouped: Map<string, Map<string, CallRecord[]>>): Map<string, CallRecord[]> {
  const merged = new Map<string, CallRecord[]>();
  for (const callerMap of grouped.values()) {
    for (const [callerSig, records] of callerMap) {
      let list = merged.get(callerSig);
      if (!list) {
        list = [];
        merged.set(callerSig, list);
      }
      list.push(...records);
    }
  }
  return merged;
}

function buildInvocationChildren(
  callerSig: string,
  callRecordsMap: Map<string, CallRecord[]>,
  prev: Map<string, string | null>,
  seen: Set<string>
): Invocation[] {
  if (seen.has(callerSig)) {
    return [];
  }
  const nextRecords = callRecordsMap.get(callerSig);
  if (!nextRecords || nextRecords.length === 0) {
    return [];
  }
  const nodes: Invocation[] = [];
  for (const nextRec of nextRecords) {
    const nextSeen = new Set(seen);
    nextSeen.add(callerSig);
    nodes.push(buildInvocationNode(nextRec, callRecordsMap, prev, nextSeen));
  }
  return nodes;
}

function buildInvocationNode(
  rec: CallRecord,
  callRecordsMap: Map<string, CallRecord[]>,
  prev: Map<string, string | null>,
  seen: Set<string>
): Invocation {
  const callerPath = getCallPath(prev, rec.callerSignature);
  const callPath = callerPath.length ? [...callerPath, rec.calleeSigStr] : [rec.calleeSigStr];
  const children = buildInvocationChildren(rec.calleeSigStr, callRecordsMap, prev, seen);

  return {
    calleeSignature: rec.calleeSigStr,
    line: rec.line,
    column: rec.col,
    snippet: rec.code,
    contextBefore: rec.contextBefore,
    contextAfter: rec.contextAfter,
    callPath,
    children: children.length ? children : undefined,
  };
}

function buildCallGraphReport(
  grouped: Map<string, Map<string, CallRecord[]>>,
  prev: Map<string, string | null>,
  projectName: string,
  configPath: string
): CallGraphReport {
  const files: FileCall[] = [];
  const filePaths = Array.from(grouped.keys()).sort();
  const callRecordsMap = mergeCallRecords(grouped);

  for (const filePath of filePaths) {
    const callerMap = grouped.get(filePath)!;
    const callerSigs = Array.from(callerMap.keys()).sort();
    const callers: CallerCall[] = [];

    for (const callerSig of callerSigs) {
      const records = callerMap.get(callerSig) ?? [];
      if (records.length === 0) {
        continue;
      }
      const invocations: Invocation[] = records.map((rec) =>
        buildInvocationNode(rec, callRecordsMap, prev, new Set<string>([callerSig]))
      );
      callers.push({
        signature: callerSig,
        invocations,
      });
    }
    if (callers.length > 0) {
      files.push({
        filePath,
        callers,
      });
    }
  }

  return {
    project: projectName,
    generatedAt: new Date().toISOString(),
    configPath,
    files,
  };
}

/**
 * 入口
 */

// function simplifySignature(sig: string): string {
//   // 把路径去掉：取最后一个冒号冒号后面
//   const lastColon = sig.lastIndexOf(':');
//   let s = lastColon >= 0 ? sig.substring(lastColon + 1).trim() : sig;

//   // 去掉 %ACxxx$、%AMxxx$ 等垃圾标签
//   s = s.replace(/%\w+\$/g, '');

//   // 清理多余点号
//   s = s.replace(/^\./, '').replace(/(\.\.)+/g, '.');

//   // 最后只保留 类名.方法名(...)
//   const match = s.match(/([A-Za-z0-9_]+)\.([A-Za-z0-9_]+)\(.*\)/);
//   if (match) {
//     return `${match[1]}.${match[2]}()`;
//   }
//   return s;
// }

function main() {
    // logger.info 仍然会带前缀，但因为它只输出了两行，用于提示进度，可以接受
    logger.info(`Building Harmony scene from config: ${CONFIG_JSON}`); 
    const { scene, config } = buildHarmonySceneFromJson(CONFIG_JSON);

    const cg = buildCallGraph(scene);
    const { graph, entrySigs } = buildMethodGraph(cg);
    const prev = buildPredecessor(graph, entrySigs);
    const grouped = collectCallRelationsWithSnippets(cg, scene);

    const report = buildCallGraphReport(
      grouped,
      prev,
      config.getTargetProjectName(),
      CONFIG_JSON
    );

    try {
        const outputContent = JSON.stringify(report, null, 2);

        const dir = path.dirname(OUTPUT_JSON);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(OUTPUT_JSON, outputContent, 'utf-8');
        console.log(`\n✅ 调用图嵌套 JSON 已写入: ${OUTPUT_JSON}`);
        //printPrettyCallPaths(grouped, prev);
    } catch (error) {
        console.error(`\n❌ 写入文件失败 ${OUTPUT_JSON}:`, error);
    }
}

main();

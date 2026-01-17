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
} from '../src';

import * as fs from 'fs';
import * as path from 'path';

const CONFIG_JSON =
  'myTests/myJSON/analyzePedometer.json';

const OUTPUT_JSON =
  'myTests/output/callGraphNew.json';


// 打印上下文行数（可用命令行参数覆盖）
const DEFAULT_BEFORE = 0;
const DEFAULT_AFTER = 0;
const CONTEXT_BEFORE = Number(process.argv[2] ?? DEFAULT_BEFORE) || DEFAULT_BEFORE;
const CONTEXT_AFTER = Number(process.argv[3] ?? DEFAULT_AFTER) || DEFAULT_AFTER;

const logger = Logger.getLogger(LOG_MODULE_TYPE.TOOL, 'MY_PRINT_CALLGRAPH');
Logger.configure('', LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

// ===================== 类型定义 =====================

interface CallRecord {
  filePath: string;
  callerSignature: string;
  calleeSignature: string;
  line: number;
  column: number;
  snippet: string;
  contextBefore: string[];
  contextAfter: string[];
}

interface CallSiteReport {
  calleeSignature: string;
  line: number;
  column: number;
  snippet: string;
  contextBefore: string[];
  contextAfter: string[];
  callPath: string[]; // 入口 → ... → caller → callee
}

interface MethodReport {
  signature: string;        // 调用者方法签名
  callSites: CallSiteReport[];
}

interface FileReport {
  filePath: string;
  methods: MethodReport[];
}

interface CallGraphReport {
  project: string;
  generatedAt: string;
  configPath: string;
  files: FileReport[];
}

// ===================== 工具函数 =====================

function getContextLines(
  lines: string[],
  centerLine: number,
  before: number,
  after: number,
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

function buildHarmonySceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

function buildCallGraph(scene: Scene): CallGraph {
  const cg = new CallGraph(scene);
  const builder = new CallGraphBuilder(cg, scene);

  builder.buildCHA4WholeProject(true);

  logger.info('CallGraph built. Stat: ' + cg.getStat());
  logger.info('Entry methods count: ' + cg.getEntries().length);

  return cg;
}

// methodSigStr -> 后继方法集合
function buildMethodGraph(cg: CallGraph): { graph: Map<string, Set<string>>; entrySigs: string[] } {
  const graph = new Map<string, Set<string>>();

  for (const baseNode of cg.getNodesIter()) {
    const node = baseNode as CallGraphNode;
    const methodSig = node.getMethod() as MethodSignature;
    if (!methodSig) continue;

    const callerSigStr = methodSig.toString();
    let succ = graph.get(callerSigStr);
    if (!succ) {
      succ = new Set<string>();
      graph.set(callerSigStr, succ);
    }

    const callSites: CallSite[] = Array.from(cg.getCallSitesByMethod(methodSig));
    for (const cs of callSites) {
      const calleeId = cs.getCalleeFuncID();
      if (calleeId === undefined) continue;
      const calleeMethod = cg.getMethodByFuncID(calleeId);
      if (!calleeMethod) continue;
      succ.add(calleeMethod.toString());
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

// BFS: 求每个方法的前驱（距离入口最近的那个）
function buildPredecessor(
  graph: Map<string, Set<string>>,
  entrySigs: string[],
): Map<string, string | null> {
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
    if (!succ) continue;

    for (const nxt of succ) {
      if (!prev.has(nxt)) {
        prev.set(nxt, cur);
        queue.push(nxt);
      }
    }
  }

  return prev;
}

// 从 prev 里恢复「入口 → methodSig」的调用链
function getCallPath(prev: Map<string, string | null>, methodSigStr: string): string[] {
  if (!prev.has(methodSigStr)) {
    return [];
  }
  const path: string[] = [];
  let cur: string | null | undefined = methodSigStr;
  while (cur !== null && cur !== undefined) {
    path.push(cur);
    cur = prev.get(cur);
  }
  return path.reverse();
}

// 收集所有调用记录：filePath -> callerSignature -> CallRecord[]
function collectCallRecords(
  cg: CallGraph,
  scene: Scene,
): Map<string, Map<string, CallRecord[]>> {
  const result = new Map<string, Map<string, CallRecord[]>>();

  for (const baseNode of cg.getNodesIter()) {
    const node = baseNode as CallGraphNode;

    if (node.isSdkMethod() || node.isBlankMethod) {
      continue;
    }

    const callerMethodSig = node.getMethod() as MethodSignature;
    const arkCallerMethod: ArkMethod | null = scene.getMethod(callerMethodSig);
    if (!arkCallerMethod) {
      continue;
    }

    const arkFile: ArkFile = arkCallerMethod.getDeclaringArkFile();
    const filePath = arkFile.getFilePath();
    const callerSigStr = callerMethodSig.toString();

    const allCode = arkFile.getCode() || '';
    const lines = allCode.split(/\r?\n/);

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

    const callSites: CallSite[] = Array.from(cg.getCallSitesByMethod(callerMethodSig));

    callSites.sort((a, b) => {
      const sa = a.callStmt as Stmt;
      const sb = b.callStmt as Stmt;
      const pa = sa.getOriginPositionInfo();
      const pb = sb.getOriginPositionInfo();
      return pa.getLineNo() - pb.getLineNo();
    });

    for (const cs of callSites) {
      const stmt = cs.callStmt as Stmt;
      const pos = stmt.getOriginPositionInfo();
      const line = pos.getLineNo();
      const col = pos.getColNo();
      if (line < 0) continue;

      const calleeId = cs.getCalleeFuncID();
      if (calleeId === undefined) {
        continue;
      }
      const calleeMethod = cg.getMethodByFuncID(calleeId);
      if (!calleeMethod) {
        continue;
      }
      const calleeSigStr = calleeMethod.toString();

      //新加的，跳过自调用
      if (callerSigStr === calleeSigStr) {
        continue;
      }

      let snippet = stmt.getOriginalText() ?? '';
      if (!snippet && lines.length > 0) {
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

      records.push({
        filePath,
        callerSignature: callerSigStr,
        calleeSignature: calleeSigStr,
        line,
        column: col,
        snippet,
        contextBefore,
        contextAfter,
      });
    }
  }

  return result;
}

// 把 CallRecord + prev 映射到最终嵌套 JSON
function buildCallGraphReport(
  grouped: Map<string, Map<string, CallRecord[]>>,
  prev: Map<string, string | null>,
  projectName: string,
  configPath: string,
): CallGraphReport {
  const files: FileReport[] = [];
  const filePaths = Array.from(grouped.keys()).sort();

  for (const filePath of filePaths) {
    const callerMap = grouped.get(filePath)!;
    const callerSigs = Array.from(callerMap.keys()).sort();
    const methods: MethodReport[] = [];

    for (const callerSig of callerSigs) {
      const records = callerMap.get(callerSig) ?? [];
      if (records.length === 0) continue;

      const callSites: CallSiteReport[] = records.map((rec) => {
        const pathFromEntry = getCallPath(prev, rec.callerSignature);

        const callPath = [...pathFromEntry, rec.calleeSignature];

        return {
          calleeSignature: rec.calleeSignature,
          line: rec.line,
          column: rec.column,
          snippet: rec.snippet,
          contextBefore: rec.contextBefore,
          contextAfter: rec.contextAfter,
          callPath,
        };
      });

      methods.push({
        signature: callerSig,
        callSites,
      });
    }

    if (methods.length > 0) {
      files.push({ filePath, methods });
    }
  }

  return {
    project: projectName,
    generatedAt: new Date().toISOString(),
    configPath,
    files,
  };
}

function main() {
  logger.info(`Building Harmony scene from config: ${CONFIG_JSON}`);
  const { scene, config } = buildHarmonySceneFromJson(CONFIG_JSON);

  const cg = buildCallGraph(scene);
  const { graph, entrySigs } = buildMethodGraph(cg);
  const prev = buildPredecessor(graph, entrySigs);
  const grouped = collectCallRecords(cg, scene);

  const report = buildCallGraphReport(
    grouped,
    prev,
    config.getTargetProjectName(),
    CONFIG_JSON,
  );

  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(report, null, 2), { encoding: 'utf-8' });
  console.log(`Call graph JSON written to: ${OUTPUT_JSON}`);
}

main();

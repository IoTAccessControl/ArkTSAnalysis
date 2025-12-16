/*
 * 打印项目中实际调用到的所有 @ohos.* 系统 API，并附上调用代码片段
 *
 * 使用方式：
 * 1. 确保 analyzePedometer.json 里已经配置好 Pedometer 工程和 ETS SDK 路径
 * 2. 把本文件放到 arkanalyzer/tests/samples 目录下
 * 3. 按平时跑 sample 的方式执行（ts-node / node dist/... 都行）
 */

import {
  SceneConfig,
  Scene,
  ArkFile,
  ArkClass,
  ArkMethod,
  Logger,
  LOG_LEVEL,
  //LOG_MODULE_TYPE,
} from '../src';

// **【新增】导入 Node.js 的文件系统模块和路径模块**
import * as fs from 'fs';
import * as path from 'path'; // 方便处理文件路径

// 默认 0、0，不打印上下文
const DEFAULT_BEFORE = 0;
const DEFAULT_AFTER = 0;

// node xxx.js 5 5  => before=5, after=5
const CONTEXT_BEFORE = Number(process.argv[2] ?? DEFAULT_BEFORE) || DEFAULT_BEFORE;
const CONTEXT_AFTER  = Number(process.argv[3] ?? DEFAULT_AFTER) || DEFAULT_AFTER;

interface ApiCallSite {
  projectFile: string; // 业务代码里的文件绝对路径
  line: number;        // 调用所在行（1-based）
  column: number;      // 调用所在列（1-based）
  snippet: string;     // 一行代码片段（尽量是整条语句）
  contextBefore?: string[]; // 新增：前几行
  contextAfter?: string[];  // 新增：后几行
}

interface SystemApiUsage {
  fileName: string;    // SDK 中的声明文件名，比如 "api/@ohos.resourceschedule.backgroundTaskManager.d.ts"
  className: string;   // 类名，比如 "backgroundTaskManager" 或 "%dflt"
  methodName: string;  // 方法名，比如 "startBackgroundRunning"
  isStatic: boolean;
  callSites: ApiCallSite[]; // 所有调用点
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

// 以运行时所在的 dist 目录反推项目根目录：dist/tests/samples -> projectRoot
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/**
 * CONFIG_JSON / LOG_FILE 来自：
 * 1. 环境变量 ANALYZE_CONFIG / SYSTEM_API_LOG
 * 2. 命令行参数 argv[2] / argv[3]
 * 3. 默认相对路径（项目内的 analyzePedometer.json + out 目录）
 */
const CONFIG_JSON: string =
  process.env.ANALYZE_CONFIG ??
  process.argv[2] ??
  path.join(PROJECT_ROOT, 'myTests', 'myJSON', 'analyzePedometer.json');

const LOG_FILE: string =
  process.env.SYSTEM_API_LOG ??
  process.argv[3] ??
  path.join(PROJECT_ROOT, 'myTests', 'output', 'systemApiUsage.log');

Logger.configure(LOG_FILE, LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

/**
 * 从 JSON 配置构建 Scene
 */
function buildSceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  // Harmony 工程推荐用这个入口；你之前从目录构建，这里沿用
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

/**
 * 判断某个调用是不是「系统 API」（@ohos.*）
 *
 * - projectName == 业务工程名 => 说明是你自己写的代码，排除
 * - projectName == 'built-in' => TS 内置 lib.es*.d.ts，排除
 * - fileName 里面含 @ohos. => 我们认为是 OpenHarmony 系统 API
 */
function isSystemApiFile(
  projectName: string,
  fileName: string,
  targetProjectName: string,
): boolean {
  if (projectName === targetProjectName) {
    return false;
  }
  if (projectName === 'built-in') {
    return false;
  }
  return fileName.includes('@ohos.');
}

/**
 * 遍历整个项目的 ArkMethod，收集所有调用到的 @ohos.* 系统 API
 * 同时记录：每个 API 在业务代码中的调用位置 + 对应的一行代码片段
 */
function collectSystemApis(scene: Scene, targetProjectName: string): SystemApiUsage[] {
  const result = new Map<string, SystemApiUsage>(); // key: fileName::class::[static]method

  const projectFiles: ArkFile[] = scene.getFiles(); // 这里只包含项目文件，不含 SDK

  for (const arkFile of projectFiles) {
    const classes: ArkClass[] = arkFile.getClasses();

    // 提前把源代码拆成行，后面复用
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
        // Cfg.getBlocks() 返回 BasicBlock 的 Set
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

            // 只关心 SDK 里、而且文件名包含 @ohos. 的方法
            if (!isSystemApiFile(projectName, fileName, targetProjectName)) {
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

            // --------- 这里开始：提取调用点位置信息 + 代码片段 ---------
            let line = -1;
            let column = -1;
            let snippet = '';

            try {
              // 1. 从语句拿到原始位置信息（行/列）
              const pos = stmt.getOriginPositionInfo?.();
              if (pos) {
                line = pos.getLineNo?.() ?? -1;
                column = pos.getColNo?.() ?? -1;
              }

              // 2. 优先使用语句本身的 originalText（通常就是一行TS代码）
              if (typeof stmt.getOriginalText === 'function') {
                snippet = stmt.getOriginalText() ?? '';
              }

              // 3. 如果 originalText 为空，则从源码里取对应行
              if (!snippet && line > 0 && lines.length > 0) {
                const idx = line - 1; // LineColPosition 行是 1-based
                if (idx >= 0 && idx < lines.length) {
                  snippet = lines[idx].trim();
                }
              }
            } catch {
              // 出错就算了，不影响整体统计
            }
            // 简单去重一下同一位置的调用
            const projectFilePath = arkFile.getFilePath();
            const already = usage.callSites.some(
              (site) =>
                site.projectFile === projectFilePath &&
                site.line === line &&
                site.column === column,
            );
            if (!already) {
              let contextBefore: string[] = [];
              let contextAfter: string[] = [];
              if(lines.length > 0 && line > 0 && (CONTEXT_BEFORE > 0 || CONTEXT_AFTER > 0)) {
                const ctx = getContextLines(lines, line , CONTEXT_BEFORE, CONTEXT_AFTER);
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
              });
            }
            // --------- 调用点信息收集结束 ---------
          }
        }
      }
    }
  }

  return Array.from(result.values());
}

/**
 * 按模块和类分组打印所有系统 API
 * 同时在每个方法下面列出所有调用点及一行代码片段
 */
function printSystemApis(usages: SystemApiUsage[]): string[] {
  if (usages.length === 0) {
    console.log('No @ohos.* system APIs used in this project.');
    return [];
  }
  const outputLines: string[] = [];

  // moduleName -> SystemApiUsage[]
  const moduleMap = new Map<string, SystemApiUsage[]>();

  for (const u of usages) {
    // 从 fileName 中抽出模块名：
    //   api/@ohos.resourceschedule.backgroundTaskManager.d.ts
    // => @ohos.resourceschedule.backgroundTaskManager
    let moduleName = u.fileName;
    const match = u.fileName.match(/@ohos[^/]*\.d\.ts$/);
    if (match) {
      moduleName = match[0].replace('.d.ts', '');
    }

    let list = moduleMap.get(moduleName);
    if (!list) {
      list = [];
      moduleMap.set(moduleName, list);
    }
    list.push(u);
  }

  const sortedModules = Array.from(moduleMap.keys()).sort();

  outputLines.push('================ System APIs used in project (from @ohos.*) ================');

  for (const moduleName of sortedModules) {
    outputLines.push(`Module: ${moduleName}`);

    const apis = moduleMap.get(moduleName)!;
    apis.sort((a, b) => {
      if (a.className !== b.className) {
        return a.className.localeCompare(b.className);
      }
      return a.methodName.localeCompare(b.methodName);
    });

    let lastClass = '';
    for (const api of apis) {
      if (api.className !== lastClass) {
        outputLines.push(`  Class: ${api.className}`);
        lastClass = api.className;
      }
      const staticFlag = api.isStatic ? '[static]' : '';
      outputLines.push(`    - ${staticFlag}${api.methodName}  (declared in ${api.fileName})`);

      // 打印所有调用点
      const sites = api.callSites.slice().sort((a, b) => {
        if (a.projectFile !== b.projectFile) {
          return a.projectFile.localeCompare(b.projectFile);
        }
        return (a.line || 0) - (b.line || 0);
      });

      for (const site of sites) {
        const loc =
          site.line > 0
            ? `${site.projectFile}:${site.line}:${site.column > 0 ? site.column : ''}`
            : site.projectFile;
        outputLines.push(`      used at ${loc}`);
        //修改：打印上下文
        if (site.contextBefore && site.contextBefore.length > 0) {
          outputLines.push('      ----Context Before----:');
          for (const l of site.contextBefore) {
            outputLines.push(`        `+l);
          }
          outputLines.push('        ---------------------------'); // 分隔
        }
        outputLines.push(
  `      > ${site.line}: ${site.snippet || ''}`, // 当前行高亮一下
        );
        if (site.contextAfter && site.contextAfter.length > 0) {
          outputLines.push('      ----Context After----:');
          for (const l of site.contextAfter) {
            outputLines.push(`        `+l);
          }
        }

        outputLines.push('        ---------------------------'); // 空行分隔
      }
    }
  }

  outputLines.push('================ End of System APIs =================');

  return outputLines;
}

/**
 * main 入口
 */
function main() {
  console.log(`Building scene from config: ${CONFIG_JSON}`);
  const { scene, config } = buildSceneFromJson(CONFIG_JSON);

  const targetProjectName = config.getTargetProjectName();
  const usages = collectSystemApis(scene, targetProjectName);
  // 1. 收集纯净的输出行
  const outputLines = printSystemApis(usages);
  // 2. 写入文件
  try {
    const outputContent = outputLines.join('\n');
    // 确保目录存在
    const dir = path.dirname(LOG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    // 同步写入文件，覆盖原有内容
    fs.writeFileSync(LOG_FILE, outputContent, 'utf-8');
    
    // 【可选】在控制台输出最终写入结果的提示
    console.log(`\nSuccessfully wrote pure output to file: ${LOG_FILE}`);
    //console.log(`Total lines written: ${outputLines}`);
    
  } catch (error) {
    // 【可选】如果写入失败，输出错误
    console.error(`\nFailed to write to file ${LOG_FILE}:`, error);
  }
}

main();

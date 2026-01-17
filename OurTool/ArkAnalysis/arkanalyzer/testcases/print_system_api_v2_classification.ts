//打印项目中的所有@ohos API使用
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

// 导入 Node.js 的文件系统模块和路径模块**
import * as fs from 'fs';
import * as path from 'path'; // 方便处理文件路径

const CONFIG_JSON = 'testcases/CONFIG_JSON/test.json';
const LOG_FILE = 'testcases/OUTPUT/WechatAPI.json';
const CLASSIFY_RULES_JSON = 'testcases/SOURCE_SINK_JSON/api_classification_rules.json';

Logger.configure(LOG_FILE, LOG_LEVEL.ERROR, LOG_LEVEL.INFO, false);

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


type RiskLevel = 'low' | 'medium' | 'high' | 'unknown';

interface ApiMeta {
  category: string;   // API 分类（面向人看的）
  purpose: string;    // API 作用/一句话解释
  risk: RiskLevel;    // 粗粒度敏感等级（用于后续做隐私/合规分析时的优先级）
  tags?: string[];    // 可选标签，便于检索/过滤
}

interface ModuleRule {
  match: string;      // 正则：匹配 moduleName（例如 ^@ohos\.router$ 或 ^@ohos\.net\..+）
  category: string;
  purpose: string;
  risk?: RiskLevel;
  tags?: string[];
}

interface MethodRule extends ModuleRule {
  module?: string;        // 可选：精确匹配 moduleName
  class?: string;         // 可选：精确匹配 className
  method?: string;        // 可选：精确匹配 methodName
  signatureMatch?: string;// 可选：正则，匹配 "module::class::method"
}

interface ClassificationRules {
  moduleRules: ModuleRule[];
  methodRules?: MethodRule[];
}

/**
 * 默认规则（可以用 JSON 文件覆盖它）
 * 规则优先级：methodRules > moduleRules > fallback
 */
const DEFAULT_CLASSIFICATION_RULES: ClassificationRules = {
  moduleRules: [
    { match: '^@ohos\.router$', category: '页面导航', purpose: '页面跳转、路由栈管理、参数传递', risk: 'low', tags: ['navigation', 'ui'] },
    { match: '^@ohos\.promptAction$', category: '交互提示', purpose: 'Toast/对话框/提示等 UI 反馈', risk: 'low', tags: ['ui', 'toast'] },
    { match: '^@ohos\.hilog$', category: '日志与调试', purpose: '系统日志打印（用于调试、埋点）', risk: 'low', tags: ['log'] },
    { match: '^@ohos\.window$', category: '窗口管理', purpose: '窗口/系统栏/软键盘等窗口能力管理', risk: 'low', tags: ['window', 'ui'] },
    { match: '^@ohos\.process$', category: '进程与运行时', purpose: '获取进程运行信息（如 uptime）', risk: 'low', tags: ['runtime'] },

    { match: '^@ohos\.net\..+', category: '网络', purpose: '网络状态、连接能力查询与管理', risk: 'medium', tags: ['network'] },
    { match: '^@ohos\.display$', category: '设备信息', purpose: '显示设备/屏幕信息获取', risk: 'low', tags: ['device'] },
    { match: '^@ohos\.sensor$', category: '传感器', purpose: '访问设备传感器能力（列表/数据）', risk: 'medium', tags: ['sensor'] },
    { match: '^@ohos\.vibrator$', category: '触觉反馈', purpose: '控制震动（触觉反馈）', risk: 'low', tags: ['haptics'] },

    { match: '^@ohos\.arkui\..+', category: 'ArkUI', purpose: 'ArkUI 组件与 UI 工具能力', risk: 'low', tags: ['arkui'] },

    { match: '^@ohos\.file\..+', category: '文件与存储', purpose: '文件读写、目录操作、文件选择等', risk: 'medium', tags: ['storage', 'file'] },

    { match: '^@ohos\.multimedia\..+', category: '多媒体', purpose: '音视频/相机/媒体相关能力', risk: 'high', tags: ['multimedia'] },

    { match: '^@ohos\.abilityAccessCtrl$', category: '权限管理', purpose: '检查/申请运行时权限（敏感能力入口）', risk: 'high', tags: ['permission', 'privacy'] },
    { match: '^@ohos\.bundle\..+', category: '应用包信息', purpose: '查询应用包/自身信息（Bundle 信息）', risk: 'low', tags: ['bundle'] },

    { match: '^@ohos\.app\.ability\..+', category: '测试框架', purpose: '测试 Ability/用例执行相关能力', risk: 'low', tags: ['test'] },
  ],
  methodRules: [
    // 权限申请：优先标红
    { match: '.*', module: '@ohos.abilityAccessCtrl', class: 'AtManager', method: 'requestPermissionsFromUser',
      category: '权限管理', purpose: '向用户弹窗申请运行时权限', risk: 'high', tags: ['permission', 'runtime'] },

    // 录音/采集：非常敏感
    { match: '.*', module: '@ohos.multimedia.audio', class: 'AudioCapturer', method: 'start',
      category: '音频采集', purpose: '开始音频采集（录音）', risk: 'high', tags: ['audio', 'mic'] },

    // 相机/相册选择：偏敏感
    { match: '.*', module: '@ohos.multimedia.cameraPicker', method: 'pick',
      category: '相机与相册', purpose: '拉起相机/相册选择媒体（照片/视频）', risk: 'high', tags: ['camera', 'media'] },

    // 文件选择：中等敏感
    { match: '.*', module: '@ohos.file.picker', method: 'select',
      category: '文件选择', purpose: '拉起选择器选择照片/文件', risk: 'medium', tags: ['picker', 'media'] },

    // 文件系统读写：中等敏感（后续你可以细分到“读/写/复制”）
    { match: '.*', module: '@ohos.file.fs', method: 'openSync',
      category: '文件与存储', purpose: '打开/创建文件（同步）', risk: 'medium', tags: ['file', 'io'] },
    { match: '.*', module: '@ohos.file.fs', method: 'readSync',
      category: '文件与存储', purpose: '读取文件内容（同步）', risk: 'medium', tags: ['file', 'io'] },
    { match: '.*', module: '@ohos.file.fs', method: 'writeSync',
      category: '文件与存储', purpose: '写入文件内容（同步）', risk: 'medium', tags: ['file', 'io'] },
    { match: '.*', module: '@ohos.file.fs', method: 'copyFile',
      category: '文件与存储', purpose: '复制文件', risk: 'medium', tags: ['file', 'io'] },
  ],
};

function safeRegexTest(pattern: string, text: string): boolean {
  try {
    return new RegExp(pattern).test(text);
  } catch {
    return false;
  }
}

function toMeta(rule: ModuleRule | MethodRule): ApiMeta {
  return {
    category: rule.category,
    purpose: rule.purpose,
    risk: rule.risk ?? 'unknown',
    tags: rule.tags ?? [],
  };
}

function tryLoadClassificationRules(rulePath: string): ClassificationRules {
  try {
    if (fs.existsSync(rulePath)) {
      const raw = fs.readFileSync(rulePath, 'utf-8');
      const parsed = JSON.parse(raw) as ClassificationRules;
      // 容错：缺字段就用默认
      return {
        moduleRules: parsed.moduleRules?.length ? parsed.moduleRules : DEFAULT_CLASSIFICATION_RULES.moduleRules,
        methodRules: parsed.methodRules?.length ? parsed.methodRules : DEFAULT_CLASSIFICATION_RULES.methodRules,
      };
    }
  } catch {
    // ignore
  }
  return DEFAULT_CLASSIFICATION_RULES;
}

function classifyModule(moduleName: string, rules: ClassificationRules): ApiMeta {
  for (const r of rules.moduleRules ?? []) {
    if (safeRegexTest(r.match, moduleName)) {
      return toMeta(r);
    }
  }
  return { category: '未分类', purpose: '未提供说明', risk: 'unknown', tags: ['unclassified'] };
}

function classifyApi(moduleName: string, className: string, methodName: string, rules: ClassificationRules): ApiMeta {
  const sig = `${moduleName}::${className}::${methodName}`;

  for (const r of rules.methodRules ?? []) {
    if (r.module && r.module !== moduleName) continue;
    if (r.class && r.class !== className) continue;
    if (r.method && r.method !== methodName) continue;
    if (r.signatureMatch && !safeRegexTest(r.signatureMatch, sig)) continue;
    // 允许 r.match 进一步限定（默认写 '.*' 就行）
    if (r.match && !safeRegexTest(r.match, sig)) continue;

    return toMeta(r);
  }

  // method 没命中就退回到 module 级别
  return classifyModule(moduleName, rules);
}


function buildSystemApiJson(usages: SystemApiUsage[]) {
  const rules = tryLoadClassificationRules(CLASSIFY_RULES_JSON);

  const moduleMap = new Map<string, any>();
  const categoryStats = new Map<string, { apis: number; callSites: number; riskBreakdown: Record<RiskLevel, number> }>();

  let totalCallSites = 0;

  function bumpCategory(meta: ApiMeta, callSitesCount: number) {
    const key = meta.category || '未分类';
    if (!categoryStats.has(key)) {
      categoryStats.set(key, {
        apis: 0,
        callSites: 0,
        riskBreakdown: { low: 0, medium: 0, high: 0, unknown: 0 },
      });
    }
    const stat = categoryStats.get(key)!;
    stat.apis += 1;
    stat.callSites += callSitesCount;
    stat.riskBreakdown[meta.risk ?? 'unknown'] += 1;
  }

  for (const u of usages) {
    // 提取 moduleName
    let moduleName = u.fileName;
    const match = u.fileName.match(/@ohos[^/]*\.d\.ts$/);
    if (match) {
      moduleName = match[0].replace('.d.ts', '');
    }

    const moduleMeta = classifyModule(moduleName, rules);
    const methodMeta = classifyApi(moduleName, u.className, u.methodName, rules);

    if (!moduleMap.has(moduleName)) {
      moduleMap.set(moduleName, {
        moduleName,
        meta: moduleMeta,
        classes: new Map<string, any>(),
      });
    }

    const moduleObj = moduleMap.get(moduleName);
    const classMap = moduleObj.classes;

    if (!classMap.has(u.className)) {
      classMap.set(u.className, {
        className: u.className,
        methods: [],
      });
    }

    classMap.get(u.className).methods.push({
      methodName: u.methodName,
      isStatic: u.isStatic,
      declaredIn: u.fileName,
      meta: methodMeta,
      callSites: u.callSites,
    });

    totalCallSites += u.callSites.length;
    bumpCategory(methodMeta, u.callSites.length);
  }

  // Map → Array（JSON 不支持 Map）
  const modules = Array.from(moduleMap.values()).map((m) => ({
    moduleName: m.moduleName,
    meta: m.meta,
    classes: Array.from(m.classes.values()),
  }));

  const categories = Array.from(categoryStats.entries())
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.callSites - a.callSites);

  return {
    summary: {
      totalApis: usages.length,
      totalCallSites,
      totalModules: modules.length,
      categories,
    },
    modules,
  };
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
 * 从 JSON 配置构建 Scene
 */
function buildSceneFromJson(configPath: string): { scene: Scene; config: SceneConfig } {
  const config = new SceneConfig();
  config.buildFromJson(configPath);

  const scene = new Scene();
  scene.buildSceneFromProjectDir(config);
  scene.inferTypes();

  return { scene, config };
}

/**
 * 判断某个调用是不是「系统 API」（@ohos.*）
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
 * main 入口
 */
function main() {
  console.log(`Building scene from config: ${CONFIG_JSON}`);
  const { scene, config } = buildSceneFromJson(CONFIG_JSON);

  const targetProjectName = config.getTargetProjectName();
  const usages = collectSystemApis(scene, targetProjectName);
  // 1. 收集纯净的输出行
  //const outputLines = printSystemApis(usages);
  const jsonResult = buildSystemApiJson(usages);
  // 2. 写入文件
  try {
    const outputContent = JSON.stringify(jsonResult, null, 2);
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

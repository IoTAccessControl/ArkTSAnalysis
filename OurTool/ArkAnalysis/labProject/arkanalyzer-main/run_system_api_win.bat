@echo off
setlocal ENABLEDELAYEDEXPANSION

REM 1. 计算项目根目录（假设 bat 放在项目根目录）
set "PROJ_ROOT=%~dp0"
REM 去掉结尾的反斜杠
if "%PROJ_ROOT:~-1%"=="\" set "PROJ_ROOT=%PROJ_ROOT:~0,-1%"

REM 2. 配置分析用的 JSON 和输出日志路径（相对项目根目录）
set "ANALYZE_CONFIG=%PROJ_ROOT%\myTests\myJSON\analyzePedometer.json"
set "SYSTEM_API_LOG=%PROJ_ROOT%\myTests\output\systemApiUsage.log"

echo Project root: %PROJ_ROOT%
echo Config file:  %ANALYZE_CONFIG%
echo Log file:     %SYSTEM_API_LOG%
echo.

REM 3. 安装依赖 + 构建（如果已经装过，可以把这两行注释掉提升速度）
cd /d "%PROJ_ROOT%"
echo [Step] npm install ...
call npm install --ignore-scripts

echo [Step] npm run build ...
call npm run build

REM 4. 运行分析脚本（注意：这里用的是编译后的 JS 路径）
echo [Step] running system API analyzer ...
node out\myTests\myAPITobat.js 5 5

echo.
echo Done. System API usage written to:
echo   %SYSTEM_API_LOG%
echo.
pause
endlocal

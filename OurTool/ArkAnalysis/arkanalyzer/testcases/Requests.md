1.变量文件重命名更专业一点；
2.把整个工具包装成命令行工具参数，不要写死任何路径，把配置文件的路径写好，分析app的时候传入源码路径+source和sink定义文件（比较详细，包含API本身和描述）
3.开发两个功能——APIsource和sink分类与描述（等郑学长）；输出APP全部的source到sink的调用流程图（json格式），参考工具，输出一个合适的格式（参考工具）
4.输出完整的callgraph给郑学长。（entry是每一个敏感API以及lifecycle函数以及UI输入）https://github.com/OSUSecLab/TaintMini/tree/main/pdg_js
5.模块划分
6.bun.js的使用,不要用node.js
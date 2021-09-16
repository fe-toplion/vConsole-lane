# vconsole-plugin-tools
**vconsole插件工具集**

基于vconsole开发一些插件工具集，用于解决公司特有场景问题。工具集实际是多个vconsole插件组成的集合，放在一起方便管理和维护。

线上地址预览：<a href="https://fe-toplion.github.io/vconsole-plugin-tools/dist/index.html">https://fe-toplion.github.io/vconsole-plugin-tools/dist/index.html</a>

# 插件工具集列表
1. VConsoleLanePlugin
泳道插件主要用于解决泳道标识信息的新建、删除和切换，能够根据域名自动匹配，智能管理

**效果**

<img src="./public/lane.png" width = "375" height = "667" alt="图片名称" align="center" />



# 使用
**方法一： npm包**

1. 安装
```
npm i --save-dev vconsole-plugin-tools
```
2. 初始化
该工具集包含多个插件，支持所有插件都初始化，也支持想要的某些插件
```
import VConsole from 'vconsole';
import VConsoleLanePlugin from 'vconsole-plugin-tools';
const vConsole = new VConsole();
// 初始化所有插件
const tools = new VConsolePluginTools(vConsole);
// 只初始化想要的插件
const lane = new VConsoleLanePlugin(vConsole);
```


**方法二：外链**
```
<script src="https://cdn.bootcss.com/vConsole/3.2.2/vconsole.min.js"></script>
<script src="/dist/vconsole-plugin-tools.min.js"></script>

const vConsole = new VConsole();
// 初始化所有插件
const tools = new VConsolePluginTools(vConsole);
// 只初始化想要的插件
const lane = new VConsoleLanePlugin(vConsole);
```



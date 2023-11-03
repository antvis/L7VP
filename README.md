<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">L7VP</h1>

<div align="center">

🌍 L7VP （<a href="https://github.com/antvis/L7">L7</a> Visualization Platform）地理空间智能可视分析工具和应用研发工具。

<p align="center">
  <a href="https://locationinsight.antv.antgroup.com">网站</a> •
  <a href="https://locationinsight.antv.antgroup.com/#/docs">文档</a> •
  <a href="https://locationinsight.antv.antgroup.com/#/docs?path=cmp1vz2u5p07ghrt">SDK</a> •
  <a href="https://locationinsight.antv.antgroup.com/#/case">案例</a>
</p>

[![SDK Version](https://badgen.net/npm/v/@antv/li-sdk)](https://npmjs.com/@antv/li-sdk) [![Release Status](https://github.com/antvis/L7VP/workflows/release/badge.svg)](https://github.com/antvis/L7VP/actions?query=workflow:release) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/l7vp.svg)](http://isitmaintained.com/project/antvis/l7vp 'Percentage of issues still open') [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/l7vp.svg)](http://isitmaintained.com/project/antvis/l7vp 'Average time to resolve an issue') ![License](https://flat-badgen.vercel.app/github/license/antvis/L7VP)

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EAcUQb_UzAEAAAAAAAAAAAAADmJ7AQ/original.png" width="800">
</div>

</div>

<br>

AntV [L7VP](https://locationinsight.antv.antgroup.com) 是一款地理空间智能可视分析工具&应用研发工具，其原名 LocationInsight，L7VP 取名意为 AntV L7 Visualization Platform，[L7](https://github.com/antvis/L7) 中的 L 代表 Location，7 代表世界七大洲，寓意能为全球位置数据提供可视分析的能力。

[L7VP](https://locationinsight.antv.antgroup.com) 通过其丰富的地理可视化效果、洞察分析能力、地图应用搭建工具和开放扩展能力，为用户提供了一个强大而灵活的地理可视分析工具，满足各类可视化需求和数据分析应用场景。

## ✨ 特性

- 🚀 快速：具备有时空数据的洞察能力，快速出可视化成果。
- 🛠 扩展：拥有可扩展能力，业务可自定义定制。
- 🏗 嵌入：提供开放的组件，业务系统可轻松嵌入。

## 🖥 在线工具

- [在线网址](https://locationinsight.antv.antgroup.com)
- [快速入门](https://locationinsight.antv.antgroup.com/#/docs?path=get-started)
- [数据格式](https://locationinsight.antv.antgroup.com/#/docs?path=data-formats)
- [图层分类](https://locationinsight.antv.antgroup.com/#/docs?path=layer-category)
- [组件分类](https://locationinsight.antv.antgroup.com/#/docs?path=widget-category)
- [导出分享](https://locationinsight.antv.antgroup.com/#/docs?path=export-share)

<div align="center">
  <img src="https://github.com/antvis/L7VP/assets/26923747/9d064849-ef9f-4999-9d98-3a704df554fc" width="800">
</div>

## 🐍 Python 环境

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

# add dataset to map
l7vp_map.add_dataset({"id": "my_dataset", "type": 'local', "data": df})

# display map
l7vp_map.show()
```

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*MsnaS4IHywoAAAAAAAAAAAAADmJ7AQ/original" width="800">
</div>

更多了解 👉 [PyL7VP](https://github.com/antvis/L7VP/tree/master/bindings/pyl7vp)

## 🔬 本地示例

### 🔨 构建依赖

```bash
yarn install && yarn build:package
```

### 📦 安装依赖

```bash
cd examples/builder && yarn install
```

### 🛫 启动示例

```bash
yarn run dev
```

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/l7vp/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/l7vp/blob/master/CONTRIBUTING.zh-CN.md)。

## 许可证

[Apache-2.0](./LICENSE)

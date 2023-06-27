<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.en-US.md) | 简体中文

<h1 align="center">L7VP</h1>

<div align="center">

🌍 L7VP （<a href="https://github.com/antvis/L7">L7</a> Visualization Platform）是一款地理空间智能可视分析研发平台。

[![SDK Version](https://badgen.net/npm/v/@antv/li-sdk)](https://npmjs.com/@antv/li-sdk) ![Status](https://badgen.net/github/status/antvis/L7VP) [![Release Status](https://github.com/antvis/L7VP/workflows/release/badge.svg?branch=master)](https://github.com/antvis/L7VP/actions?query=workflow:release) [![Percentage of issues still open](http://isitmaintained.com/badge/open/antvis/l7vp.svg)](http://isitmaintained.com/project/antvis/l7vp 'Percentage of issues still open') [![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/antvis/l7vp.svg)](http://isitmaintained.com/project/antvis/l7vp 'Average time to resolve an issue')

<p align="center">
  <a href="https://locationinsight.antv.antgroup.com">网站</a> •
  <a href="https://www.yuque.com/antv/htpfbw">文档</a> •
  <a href="https://www.yuque.com/antv/htpfbw/cmp1vz2u5p07ghrt">SDK</a> •
  <a href="https://locationinsight.antv.antgroup.com/#/case">案例</a>
</p>

</div>

## ✨ 特性

-

## 💻 查看示例

### 📦 安装依赖

```bash
cd examples/builder && npm i
```

### 🔨 启动示例

```bash
npm run dev
```

## 本地开发

### 项目介绍

采用多包管理方式，对应的包如下：

| 文件路径                    | 包名                       | 简介                          |
| --------------------------- | -------------------------- | ----------------------------- |
| packages/li-sdk             | `@antv/li-sdk`             | LI 位置可视分析 SDK           |
| packages/li-editor          | `@antv/li-editor`          | LI 位置可视分析编辑器         |
| packages/li-core-assets     | `@antv/li-core-assets`     | LI 位置可视分析的核心资产     |
| packages/li-analysis-assets | `@antv/li-analysis-assets` | LI 位置可视分析的可视分析资产 |

### 项目开发

```bash
# 全局安装 yarn
$ npm install yarn -g

# 安装项目依赖
$ yarn install

# Editor 研发
$ yarn start:editor

# SDK 研发
$ yarn start:sdk

# 核心资产研发
$ yarn start:core-assets

# 分析资产研发
$ yarn start:analysis-assets
```

### 添加依赖

- 给 root 主包添加依赖

```bash
yarn add -W -D package-name
```

- 给子包添加依赖

```bash
yarn workspace @antv/li-analysis-assets add package-name
```

- 给多个子包添加依赖（不包含 root）

```bash
yarn workspaces run add package-name
```

## 🤝 如何贡献

如果您在使用的过程中碰到问题，可以先通过 [issues](https://github.com/antvis/l7vp/issues) 看看有没有类似的 bug 或者建议。

如需提交代码，请遵从我们的[贡献指南](https://github.com/antvis/l7vp/blob/master/CONTRIBUTING.zh-CN.md)。

## 许可证

[Apache-2.0](./LICENSE)

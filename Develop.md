### 项目介绍

采用多包管理方式，对应的包如下：

| 文件路径                    | 包名                       | 简介             |
| --------------------------- | -------------------------- | ---------------- |
| packages/li-sdk             | `@antv/li-sdk`             | SDK              |
| packages/li-editor          | `@antv/li-editor`          | 分析态的编辑器   |
| packages/li-p2              | `@antv/li-p2`              | 编辑器的属性面板 |
| packages/li-core-assets     | `@antv/li-core-assets`     | 核心资产包       |
| packages/li-analysis-assets | `@antv/li-analysis-assets` | 分析资产包       |

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

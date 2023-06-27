---
toc: content
order: 2
group:
  title: formily 组件
  order: 1
nav:
  title: 组件
  path: /components
---

# 字段选择器 - FieldSelect

## 介绍

用于字段类型选择场景

## 代码演示

### 默认示例

<code src="./demos/default.tsx"></code>

<API></API>

### FieldSelectOptionType

```ts
/**
 * 数据列表字段项
 */
type FieldSelectOptionType = {
  /**
   * 值
   */
  value: string;
  /**
   * label
   */
  label: string;
  /**
   * 数据类型
   */
  type?: string;
  /**
   * 类型名
   */
  typeName?: string;
  /**
   * 类型颜色
   */
  typeColor?: string;
};
```

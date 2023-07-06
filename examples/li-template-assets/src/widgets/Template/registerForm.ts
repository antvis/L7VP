import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {};
  return { schema };
};

import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  showSidePanel: boolean;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    showSidePanel: {
      title: '显示侧边栏',
      type: 'boolean',
      default: true,
    },
    showFloatPanel: {
      title: '显示浮动面板',
      type: 'boolean',
      default: true,
    },
  };

  return { schema };
};

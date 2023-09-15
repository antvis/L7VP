import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 新增过滤器 */
  showAddFilter: boolean;
  /** 删除过滤器 */
  showDeleteFilter: boolean;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    showAddFilter: {
      title: '新增过滤器',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    showDeleteFilter: {
      title: '删除过滤器',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
  };
  return { schema };
};

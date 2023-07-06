import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getWidgetSlotFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  showSidePanel: boolean;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getWidgetSlotFormSchema(props, 'sidePanel', '侧边栏'),
    showSidePanel: {
      title: '显示侧边栏',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
    },
  };

  return { schema };
};

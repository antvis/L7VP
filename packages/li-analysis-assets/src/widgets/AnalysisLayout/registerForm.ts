import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getWidgetSlotFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 是否显示侧边栏面板 */
  showSidePanel: boolean;
  /** 是否显示底部面板 */
  showBottomPanel: boolean;
  /** 是否显示浮动面板 */
  showFloatPanel: boolean;
  /** 是否折叠浮动面板 */
  collapsedFloatPanel: boolean;
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
      default: false,
    },
    // ...getWidgetSlotFormSchema(props, 'floatPanel', '浮动面板'),
    // showFloatPanel: {
    //   title: '显示浮动面板',
    //   type: 'boolean',
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Switch',
    //   default: false,
    // },
    ...getWidgetSlotFormSchema(props, 'bottomPanel', '底部面板'),
    showBottomPanel: {
      title: '显示底部面板',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
  };
  return { schema };
};

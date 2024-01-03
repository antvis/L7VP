import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm } from '@antv/li-sdk';
/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 控件放置位置 */
  position?: PositionName;
  /** 是否默认开启 */
  defaultOpen: boolean;
  /** 卷帘方向设置，默认 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** 卷帘左侧的图层 ID */
  defaultLeftLayers: string[];
  /** 卷帘右侧侧的图层 ID */
  defaultRightLayers: string[];
};

export default (): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'bottomright',
    },
    defaultOpen: {
      title: '默认打开',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
  };
  return { schema };
};

import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm } from '@antv/li-sdk';
/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  position?: PositionName;
};

export default (): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'topleft',
    },
  };
  return { schema };
};

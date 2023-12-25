import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm } from '@antv/li-sdk';
/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  position?: PositionName;
  width?: number;
  height?: number;
  content?: any;
};

export default (): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'topright',
    },
    width: {
      title: '宽度',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        addonAfter: 'px',
        min: 0,
        precision: 0,
      },
      default: 100,
    },
    content: {
      type: 'any',
      'x-decorator': 'FormItem',
      'x-component': 'RichTextEditing',
      'x-decorator-props': {},
    },
  };
  return { schema };
};

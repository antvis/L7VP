import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm } from '@antv/li-sdk';
/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  position?: PositionName;
  url?: string;
  href?: string;
  width?: number;
  height?: number;
};

export default (): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'bottomLeft',
    },
    url: {
      title: '图片地址',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      default: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*GRb1TKp4HcMAAAAAAAAAAAAAARQnAQ',
    },
    href: {
      title: '跳转地址',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    width: {
      title: '图片宽度',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        addonAfter: 'px',
        min: 0,
        precision: 0,
      },
      default: 89,
    },
    height: {
      title: '图片高度',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'NumberPicker',
      'x-component-props': {
        addonAfter: 'px',
        min: 0,
        precision: 0,
      },
      default: 16,
    },
  };
  return { schema };
};

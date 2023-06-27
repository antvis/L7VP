import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  showRightMenu?: boolean;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 组件资产的配置表单面板 Schema，表单库 formily 的 Schema
  const schema = {
    showRightMenu: {
      title: '是否开启',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      enum: [
        { label: '是', value: true },
        { label: '否', value: false },
      ],
      default: true,
    },
  };
  return { schema };
};

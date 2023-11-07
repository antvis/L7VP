import type { FieldSelectOptionType } from '@antv/li-p2';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      stackingPatterns: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: '数值配置',
        },
        properties: {
          domain: {
            type: 'number',
            title: '数据映射区间',
            default: [0, 100],
            'x-decorator': 'FormItem',
            'x-component': 'SliderRange',
            'x-component-props': {
              min: -Infinity,
              max: Infinity,
              sliderVisible: false,
            },
          },

          nodataValue: {
            type: 'number',
            title: '默认空数据',
            default: -9999999,
            'x-decorator-props': {},
            'x-decorator': 'FormItem',
            'x-component': 'NumberPicker',
            'x-component-props': {
              min: -Infinity,
              max: Infinity,
              size: 'small',
              style: {
                width: 60,
                marginTop: 5,
              },
            },
          },

          clampLow: {
            title: '低于映射区间',
            type: 'boolean',
            default: true,
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-decorator-props': {
              tooltip: '低于映射区间的数据是否显示',
            },
            'x-component-props': {
              size: 'small',
            },
          },

          clampHigh: {
            title: '高于映射区间',
            type: 'boolean',
            default: true,
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
            'x-decorator-props': {
              tooltip: '高于映射区间的数据是否显示',
            },
            'x-component-props': {
              size: 'small',
            },
          },
        },
      },
    },
  };
};

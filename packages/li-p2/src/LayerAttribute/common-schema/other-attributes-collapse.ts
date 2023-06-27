import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions = {}) => {
  const { collapseTitle = '其它属性' } = options;
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
          header: collapseTitle,
        },
        properties: {
          zoom: {
            type: 'number',
            title: '可见层级',
            'x-decorator': 'FormItem',
            'x-component': 'SliderRange',
            'x-component-props': {
              dots: false,
              range: true,
              min: 0,
              max: 24,
            },
            default: [0, 24],
            'x-decorator-props': {},
          },
          blend: {
            type: 'string',
            title: '混合效果',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
            },
            'x-decorator-props': {},
            default: 'normal',
            enum: [
              {
                label: '正常',
                value: 'normal',
              },
              {
                label: '叠加模式',
                value: 'additive',
              },
              {
                label: '相减模式',
                value: 'subtractive',
              },
              {
                label: '最大值',
                value: 'max',
              },
              {
                label: '最小值',
                value: 'min',
              },
            ],
          },
        },
      },
    },
  };
};

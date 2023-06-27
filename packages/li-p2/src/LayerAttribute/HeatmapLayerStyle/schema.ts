import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions = {}) => {
  const { fieldList = [], colorRanges = [] } = options;

  return {
    type: 'object',
    properties: {
      color: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          color: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '热力颜色',
            },
            properties: {
              // 色带
              colorsRange: {
                type: 'string',
                title: '颜色',
                default: {
                  colors: [
                    '#ffffcc',
                    '#ffeda0',
                    '#fed976',
                    '#feb24c',
                    '#fd8d3c',
                    '#fc4e2a',
                    '#e31a1c',
                    '#bd0026',
                    '#800026',
                  ].reverse(),
                  isReversed: true,
                },
                'x-decorator': 'FormItem',
                'x-component': 'ColorRangeSelector',
                'x-decorator-props': {},
                'x-component-props': {
                  options: [...colorRanges],
                },
              },

              opacity: {
                type: 'number',
                title: '透明度',
                default: 1,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 1,
                  step: 0.1,
                },
              },
            },
          },
        },
      },

      // 热力半径
      collapseItem_fillSize: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          fillsize: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '热力半径',
            },

            properties: {
              radius: {
                type: 'number',
                title: '热力半径',
                default: 20,
                'x-decorator-props': {},
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  max: 30,
                  min: 0,
                  step: 1,
                },
              },
              sizeField: {
                type: 'string',
                title: '权重字段',
                'x-decorator': 'FormItem',
                'x-component': 'FieldSelect',
                'x-decorator-props': {
                  tooltip: '选中一个数值字段作为热力计算',
                },
                'x-component-props': {
                  allowClear: true,
                  placeholder: '请选择字段',
                },
                enum: [...fieldList],
              },
              intensity: {
                type: 'number',
                title: '热力强度',
                default: 1,
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  dots: false,
                  range: false,
                  min: 1,
                  max: 5,
                },
                'x-decorator-props': {},
              },
            },
          },
        },
      },

      collapseItem_other: otherAttributesCollapse(options),
    },
  };
};

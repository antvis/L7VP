import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions) => {
  const { colorRanges = [], collapseTitle = '填充颜色' } = options;

  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      fillColor: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: collapseTitle,
        },
        properties: {
          fillColorField: {
            type: 'string',
            title: '填充字段',
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-decorator-props': {
              tooltip: '依据字段作为颜色填充，可选项',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [{ value: 'count', label: 'count' }],
          },

          fillColorScale: {
            type: 'string',
            title: '颜色划分',
            default: 'quantile',
            enum: [
              {
                label: '等间距',
                value: 'quantize',
              },
              {
                label: '等分位',
                value: 'quantile',
              },
            ],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择',
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
            ],
          },
          // 颜色选择器
          fillColor: {
            type: 'string',
            title: '颜色',
            default: '#F7664E',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-component-props': {
              placeholder: '颜色',
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] === undefined }}',
                  },
                },
              },
            ],
          },
          // 色带
          fillColorRange: {
            type: 'string',
            title: '颜色',
            default: {
              colors: [
                'rgb(247, 251, 255)',
                'rgb(222, 235, 247)',
                'rgb(198, 219, 239)',
                'rgb(158, 202, 225)',
                'rgb(107, 174, 214)',
                'rgb(66, 146, 198)',
                'rgb(33, 113, 181)',
                'rgb(8, 81, 156)',
                'rgb(8, 48, 107)',
              ],
              isReversed: false,
            },
            'x-decorator': 'FormItem',
            'x-component': 'ColorRangeSelector',
            'x-decorator-props': {},
            'x-component-props': {
              options: [...colorRanges],
            },
            'x-reactions': [
              {
                dependencies: ['fillColorField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
            ],
          },

          fillColorOpacity: {
            type: 'number',
            title: '透明度',
            default: 1,
            'x-decorator-props': {},
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 1,
              step: 0.1,
            },
          },
        },
      },
    },
  };
};

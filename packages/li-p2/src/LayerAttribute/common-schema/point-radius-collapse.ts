import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions) => {
  const { fieldList = [], collapseTitle = '填充半径' } = options;
  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      fillradius: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: collapseTitle,
        },

        properties: {
          radiusField: {
            type: 'string',
            title: '基于字段',
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-decorator-props': {
              tooltip: '依据数值字段作为填充半径，可选项',
            },
            'x-component-props': {
              allowClear: true,
              placeholder: '请选择字段',
            },
            enum: [...fieldList],
          },

          radius: {
            type: 'number',
            title: '半径',
            default: 20,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              dots: false,
              range: false,
            },
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['radiusField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] === undefined }}',
                  },
                },
              },
            ],
          },

          radiusRange: {
            type: 'number',
            title: '半径',
            'x-decorator': 'FormItem',
            'x-component': 'SliderRange',
            'x-component-props': {
              dots: false,
              range: true,
            },
            default: [5, 20],
            'x-decorator-props': {},
            'x-reactions': [
              {
                dependencies: ['radiusField'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0] !== undefined }}',
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
};

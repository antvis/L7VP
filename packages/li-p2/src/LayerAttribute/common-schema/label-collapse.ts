import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions) => {
  const { fieldList = [] } = options;
  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      labelstyle: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: '标签样式',
        },

        properties: {
          labelField: {
            type: 'string',
            title: '标签字段',
            enum: [...fieldList],
            'x-decorator': 'FormItem',
            'x-component': 'FieldSelect',
            'x-component-props': {
              placeholder: '请选择标签',
              allowClear: true,
            },
            'x-decorator-props': {
              tooltip: '选中一个字段（文本或数值）作为标签',
            },
          },

          labelColor: {
            type: 'string',
            title: '字体颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-decorator-props': {},
          },

          labelFontSize: {
            type: 'number',
            title: '字号',
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              placeholder: '字号',
            },
            'x-decorator-props': {},
          },
          labelTextAnchor: {
            type: 'string',
            title: '位置',
            default: 'right',
            enum: [
              {
                label: '左上',
                value: 'top-left',
              },
              {
                label: '中上',
                value: 'top',
              },
              {
                label: '右上',
                value: 'top-right',
              },
              {
                label: '居左',
                value: 'left',
              },
              {
                label: '居中',
                value: 'center',
              },
              {
                label: '居右',
                value: 'right',
              },
              {
                label: '左下',
                value: 'bottom-left',
              },
              {
                label: '中下',
                value: 'bottom',
              },
              {
                label: '右下',
                value: 'bottom-right',
              },
            ],
            'x-decorator': 'FormItem',
            'x-component': 'Select',
            'x-component-props': {
              placeholder: '请选择位置',
            },
            'x-decorator-props': {},
          },

          labelTextOffset: {
            type: 'array',
            title: '偏移量',
            default: [0, 0],
            'x-decorator': 'FormItem',
            'x-component': 'Offset',
            'x-component-props': {
              dots: false,
              range: true,
              slider: false,
            },
            'x-decorator-props': {},
          },

          labelStroke: {
            type: 'string',
            title: '描边颜色',
            default: '#fff',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-decorator-props': {},
          },

          labelStrokeWidth: {
            type: 'number',
            title: '描边宽度',
            default: 1,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              placeholder: '描边宽度',
              min: 0,
              max: 5,
            },
            'x-decorator-props': {},
          },
        },
      },
    },
  };
};

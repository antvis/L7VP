import lineAnimateCollapse from '../common-schema/line-animate-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions = {}) => {
  const { fieldList = [], colorRanges = [] } = options;
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: {
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
              header: '颜色',
            },
            properties: {
              fillColorField: {
                type: 'string',
                title: '填充字段',
                'x-decorator': 'FormItem',
                'x-component': 'FieldSelect',
                'x-decorator-props': {
                  tooltip: '选中一个数值字段作为颜色填充字段',
                },
                'x-component-props': {
                  allowClear: true,
                  placeholder: '请选择字段',
                },
                enum: [...fieldList],
              },

              fillColorScale: {
                type: 'string',
                title: '颜色划分',
                'x-decorator': 'FormItem',
                'x-component': 'ScaleSelector',
                'x-component-props': {
                  placeholder: '请选择',
                  type:
                    '{{ $form.getFieldState("fillColorField",state=> { return state.dataSource.find((item) => item.value === state.value)?.type })}}',
                  dataSet:
                    '{{ $form.getFieldState("fillColorField",state=> { return state.dataSource.find((item) => item.value === state.value)?.domin })}}',
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

              // 起点颜色选择器
              sourceColor: {
                title: '起点颜色',
                type: 'string',
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

              // 终点颜色选择器
              targetColor: {
                type: 'string',
                title: '终点颜色',
                default: '#5B8FF9',
                'x-decorator': 'FormItem',
                'x-component': 'ColorPicker',
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
                type: 'object',
                title: '颜色',
                default: {
                  colors: ['#a6cee3', '#1f78b4', '#b2df8a'],
                  isReversed: false,
                },
                'x-decorator': 'FormItem',
                'x-component': 'ColorRangeSelector',
                'x-component-props': {},
                'x-decorator-props': {},
                enum: [...colorRanges],
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
      },

      collapseItem_fillSize: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          fillSize: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '线宽',
            },

            properties: {
              sizeField: {
                type: 'string',
                title: '基于字段',
                'x-decorator': 'FormItem',
                'x-component': 'FieldSelect',
                'x-decorator-props': {
                  tooltip: '选中一个数值字段作为填充大小',
                },
                'x-component-props': {
                  allowClear: true,
                  placeholder: '请选择字段',
                },
                enum: [...fieldList],
              },

              size: {
                type: 'number',
                title: '宽度',
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  dots: false,
                  range: false,
                },
                'x-decorator-props': {},
                'x-reactions': [
                  {
                    dependencies: ['sizeField'],
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] === undefined }}',
                      },
                    },
                  },
                ],
              },
              sizeRange: {
                type: 'number',
                title: '宽度',
                'x-decorator': 'FormItem',
                'x-component': 'SliderRange',
                'x-component-props': {
                  dots: false,
                  range: true,
                },
                default: [0, 20],
                'x-decorator-props': {},
                'x-reactions': [
                  {
                    dependencies: ['sizeField'],
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] !== undefined }}',
                      },
                    },
                  },
                ],
              },

              // lineType: {
              //   type: 'string',
              //   title: '线类型',
              //   default: 'solid',
              //   enum: [
              //     {
              //       label: '实线',
              //       value: 'solid',
              //     },
              //     {
              //       label: '虚线',
              //       value: 'dash',
              //     },
              //   ],
              //   'x-decorator': 'FormItem',
              //   'x-component': 'Select',
              //   'x-component-props': {
              //     placeholder: '请选择',
              //   },
              //   'x-decorator-props': {},
              // },
            },
          },
        },
      },

      collapseItem_animate: lineAnimateCollapse(),

      collapseItem_other: otherAttributesCollapse(options),
    },
  };
};

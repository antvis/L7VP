import lableCollapse from '../common-schema/label-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import radiusCollapse from '../common-schema/point-radius-collapse';
import type { AttributeSchemaOptions } from '../types';
import type { IconSelectOptionType } from './types';

export default (options: AttributeSchemaOptions & { iconList?: IconSelectOptionType[] }) => {
  const { fieldList = [] } = options;
  const iconFieldList = fieldList.filter((item) => item.type === 'string');

  return {
    type: 'object',
    properties: {
      collapseItem_fillIcon: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: ['fillIcon'],
        },
        properties: {
          fillIcon: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '图标类型',
            },
            properties: {
              iconField: {
                type: 'string',
                title: '基于字段',
                'x-decorator': 'FormItem',
                'x-component': 'FieldSelect',
                'x-decorator-props': {
                  tooltip: '选中一个图标字段作为填充图标',
                },
                'x-component-props': {
                  placeholder: '请选择字段',
                  allowClear: true,
                },
                enum: [...iconFieldList],
                'x-reactions': [
                  {
                    target: 'iconImg',
                    effects: ['onFieldValueChange', 'onFieldInit'],
                    fulfill: {
                      run:
                        "$form.setFieldState('iconImg',state=>{state.visible = $self.value? false : true ;state.required=true})",
                    },
                  },
                  {
                    target: 'iconAtlasList',
                    effects: ['onFieldValueChange'],
                    fulfill: {
                      run: "$form.setFieldState('iconAtlasList',state=>{ state.value=[] })",
                    },
                  },
                ],
              },

              iconAtlasList: {
                type: 'array',
                title: '图标映射',
                'x-decorator': 'FormItem',
                'x-component': 'IconSelector',
                'x-component-props': {
                  options:
                    '{{ $form.getFieldState("iconField",state=> { return state.dataSource.find((item) => item.value === state.value)?.domain })}}',
                },
                'x-decorator-props': {
                  tooltip: '点击可添加查看图标',
                },
                'x-reactions': [
                  {
                    dependencies: ['iconField'],
                    fulfill: {
                      state: {
                        visible: '{{ $deps[0] !== undefined }}',
                      },
                    },
                  },
                ],
              },

              iconImg: {
                type: 'string',
                title: '图标形状',
                'x-decorator': 'FormItem',
                'x-component': 'IconList',
                'x-decorator-props': {
                  tooltip: '选中一个图标作为填充图标',
                  allowClear: true,
                },
                'x-component-props': {
                  placeholder: '请选择图标',
                },
              },

              // fillColor: {
              //   type: 'string',
              //   title: '图标颜色',
              //   'x-decorator': 'FormItem',
              //   'x-component': 'ColorPicker',
              //   'x-component-props': {
              //     placeholder: '颜色',
              //   },
              //   'x-decorator-props': {},
              // },

              fillOpacity: {
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
      collapseItem_fillRadius: radiusCollapse({ fieldList, collapseTitle: '图标大小' }),
      // label --文本图层
      collapseItem_fillLabel: lableCollapse({ fieldList }),
      collapseItem_other: otherAttributesCollapse({}),
    },
  };
};

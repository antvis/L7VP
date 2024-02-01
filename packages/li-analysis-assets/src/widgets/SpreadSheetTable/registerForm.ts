import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  datasetId?: string;
  colHeader: string[];
  theme: 'dark' | 'light';
  showSeriesNumber: boolean;
  layoutWidthType: 'compact' | 'colAdaptive';
  tableWidth?: number;
  tableHeight?: number;
  adaptive: boolean;
  frozenCol: boolean;
  showPagination: boolean;
};

const ThemOption = [
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
];

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '数据源'),

    config: {
      type: 'void',
      'x-component': 'FormTab',
      properties: {
        basicConfig: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: '基本配置',
          },
          properties: {
            colHeader: {
              title: '列头',
              type: 'string',
              required: true,
              'x-component-props': {
                allowClear: false,
                mode: 'multiple',
                placeholder: '请选择字段',
              },
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-reactions': [
                {
                  dependencies: ['datasetId'],
                  fulfill: {
                    run:
                      "$form.setFieldState('colHeader',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns } ) ; state.value = undefined;  })",
                  },
                },
              ],
            },
          },
        },
        styleConfig: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: '表格样式',
          },
          properties: {
            theme: {
              title: '主题色',
              type: 'string',
              default: 'dark',
              enum: ThemOption,
              'x-decorator': 'FormItem',
              'x-component': 'Select',
              'x-component-props': {
                placeholder: '请选择类型',
              },
            },

            layoutWidthType: {
              type: 'string',
              title: '宽度调整',
              default: 'compact',
              'x-decorator': 'FormItem',
              'x-component': 'Radio.Group',
              enum: [
                { label: '列等宽', value: 'colAdaptive' },
                { label: '列紧凑', value: 'compact' },
              ],
            },

            adaptive: {
              title: '宽高自适应',
              type: 'boolean',
              default: true,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },

            tableWidth: {
              type: 'number',
              title: '表格宽度',
              default: 360,
              'x-decorator-props': {},
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                min: 0,
                max: Infinity,
              },
              'x-reactions': [
                {
                  dependencies: ['adaptive'],
                  fulfill: {
                    state: {
                      visible: '{{ !$deps[0] }}',
                    },
                  },
                },
              ],
            },

            tableHeight: {
              type: 'number',
              title: '表格高度',
              default: 260,
              'x-decorator-props': {},
              'x-decorator': 'FormItem',
              'x-component': 'NumberPicker',
              'x-component-props': {
                min: 0,
                max: Infinity,
              },
              'x-reactions': [
                {
                  dependencies: ['adaptive'],
                  fulfill: {
                    state: {
                      visible: '{{ !$deps[0] }}',
                    },
                  },
                },
              ],
            },

            frozenCol: {
              title: '冻结首列',
              type: 'boolean',
              default: false,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },

            showSeriesNumber: {
              title: '显示序号',
              type: 'boolean',
              default: false,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },

            showPagination: {
              title: '显示分页',
              type: 'boolean',
              default: false,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },
          },
        },
      },
    },
  };

  return { schema };
};

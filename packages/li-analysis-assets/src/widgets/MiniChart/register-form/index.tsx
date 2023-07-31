import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';
import type { ChartType } from '../Component/Chart/type';
import type { AggregationMethodType } from '../constant';
import { AggregationMethod, ChartTypeList } from '../constant';
import lineColumnSchema from './line-column-schema';
import pieSchema from './pie-schema';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  datasetId?: string;
  chartType: ChartType;
  showLegend: boolean;
  adaptive: boolean;
  theme: 'classic' | 'classicDark';
  chartWidth?: number;
  chartHeight?: number;
  xField?: string;
  yField?: string;
  aggregationMethod: AggregationMethodType;
  sortBy?: 'default' | 'x' | 'y';
  orderBy?: 'ASC' | 'DESC';
  angleField?: string;
  colorField?: string;
};

const ThemOption = [
  { label: '暗色', value: 'classicDark' },
  { label: '亮色', value: 'classic' },
];

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '数据源'),

    chartType: {
      title: '图表类型',
      type: 'string',
      required: true,
      default: ChartTypeList[0].value,
      enum: ChartTypeList,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择类型',
      },
    },

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
            lineColumnSchemas: {
              type: 'void',
              'x-reactions': [
                {
                  dependencies: ['chartType'],
                  fulfill: {
                    state: {
                      visible: "{{ $deps[0] !== 'pie' }}",
                    },
                  },
                },
              ],
              properties: {
                ...lineColumnSchema(),
              },
            },

            pieSchemas: {
              type: 'void',
              'x-reactions': [
                {
                  dependencies: ['chartType'],
                  fulfill: {
                    state: {
                      visible: "{{ $deps[0] === 'pie' }}",
                    },
                  },
                },
              ],
              properties: {
                ...pieSchema(),
              },
            },
            aggregationMethod: {
              title: '聚合方式',
              type: 'string',
              default: 'sum',
              enum: AggregationMethod,
              'x-decorator': 'FormItem',
              'x-component': 'Select',
              'x-component-props': {
                placeholder: '请选择聚合方式',
              },
              'x-decorator-props': {
                tooltip: 'X 轴统计维度中对应多个 Y 轴数值时的统计方式',
              },
              'x-reactions': [
                {
                  dependencies: ['chartType'],
                  fulfill: {
                    run:
                      "$form.setFieldState( 'aggregationMethod' , state => { state.decoratorProps.tooltip = $form.getFieldState( 'chartType' , state => { return state.value === 'pie' }) ? '切片字段中对应多个数值时的统计方式' : 'X 轴统计维度中对应多个 Y 轴数值时的统计方式' })",
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
            tab: '图表样式',
          },
          properties: {
            theme: {
              title: '主题色',
              type: 'string',
              default: 'classicDark',
              enum: ThemOption,
              'x-decorator': 'FormItem',
              'x-component': 'Select',
              'x-component-props': {
                placeholder: '请选择类型',
              },
            },
            showLegend: {
              title: '图例',
              type: 'boolean',
              default: false,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
              'x-reactions': [
                {
                  dependencies: ['chartType'],
                  fulfill: {
                    state: {
                      visible: "{{ $deps[0] === 'pie' }}",
                    },
                  },
                },
              ],
            },
            adaptive: {
              title: '宽高自适应',
              type: 'boolean',
              default: true,
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
            },
            chartWidth: {
              type: 'number',
              title: '图表宽度',
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
            chartHeight: {
              type: 'number',
              title: '图表高度',
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
          },
        },
      },
    },
  };

  return { schema };
};

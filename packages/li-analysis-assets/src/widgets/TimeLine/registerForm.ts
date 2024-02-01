import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  datasetId?: string;
  dateField?: string;
  dateGranularity?: string;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '数据源'),

    dateField: {
      title: '时间字段',
      type: 'string',
      required: true,
      'x-component-props': {
        allowClear: false,
        placeholder: '请选择字段',
      },
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run:
              "$form.setFieldState('dateField',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns.filter(item=>['date'].includes(item.type)) } ) ; state.value = undefined;  })",
          },
        },
      ],
    },

    dateGranularity: {
      title: '聚合粒度',
      type: 'string',
      required: true,
      'x-component-props': {
        placeholder: '请选择字段',
        type:
          '{{ $form.getFieldState("dateField",state=> { return state.dataSource?.find(item=>item.value===state.value)?.format }  ) }}',
      },
      'x-decorator': 'FormItem',
      'x-component': 'TimeGranularitySelect',
    },
  };

  return { schema };
};

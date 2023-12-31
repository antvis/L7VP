import type { PositionName } from '@antv/l7';
import type { FilterConfigType } from '@antv/li-p2';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  datasetId?: 'string';
  position?: PositionName;
  defaultFilters: FilterConfigType[];
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '数据源'),

    defaultFilters: {
      type: 'array',
      default: [],
      'x-decorator': 'FormItem',
      'x-component': 'FilterConfiguration',
      'x-component-props': {
        options:
          '{{ $form.getFieldState("datasetId",state=> { return state.dataSource.find(item=>item.value=== state?.value)?.columns || [] })}}',
        style: {
          width: '100%',
          marginTop: 10,
        },
      },
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            state: {
              visible: '{{ $deps[0] !== undefined }}',
            },
          },
        },
        {
          dependencies: ['datasetId'],
          fulfill: {
            run: `$form.setFieldState('defaultFilters',state=>{
                state.value = [];
              })`,
          },
        },
      ],
    },

    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'lefttop',
    },
  };

  return { schema };
};

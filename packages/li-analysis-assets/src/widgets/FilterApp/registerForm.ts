// @ts-ignore
import { useEditorDataset } from '@antv/li-editor';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';
import type { FilterNodeItem } from '@antv/li-p2';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  datasetId: 'string';
  filters: FilterNodeItem[];
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  // 获取数据集 data
  const datasets = props.datasets.map((item: { id: string }) => {
    const editorDataset = useEditorDataset(item.id);
    return {
      ...item,
      data: editorDataset?.data ?? [],
    };
  });

  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getDatasetSelectFormSchema({ ...props, datasets: datasets }, 'datasetId', '数据源'),

    filters: {
      type: 'string',
      default: [],
      enum: [],
      'x-decorator': 'FormItem',
      'x-component': 'Filters',
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
            run: `$form.setFieldState('filters',state=>{  
                state.value = [];
              })`,
          },
        },
      ],
    },
  };

  return { schema };
};

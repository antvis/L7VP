import type { ILayerField } from '@antv/larkmap/es/components/LayerPopup/types';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  isOpen: boolean;
  trigger: 'hover' | 'click';
  items: { layerId: string; fields: ILayerField[] }[];
};

/**
 * 表单的数据结构类型
 */
type FormValues = { items: Record<string, { field: string; formatField: string }[]> } & Omit<Properties, 'items'>;

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties, FormValues> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '数据源'),

    filterSchame: {
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
      ],
    },
  };

  return { schema };
};

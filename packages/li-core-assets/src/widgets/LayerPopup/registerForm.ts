import type { ILayerField } from '@antv/larkmap/es/components/LayerPopup/types';
import type { DatasetField, WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { isLocalOrRemoteDataset } from '@antv/li-sdk';

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

/**
 * 表单数据格式转换，将结构化数据(属性面板数据类型)转换为表单的平铺结构
 */
const toValues = (config: Properties): FormValues => {
  const { items, ...rest } = config;
  const itemsValue = items.reduce((map, next) => {
    const key = next.layerId;
    map[key] = next.fields.map((field) => {
      return { field: field.field, formatField: field.formatField };
    });
    return map;
  }, {} as Record<string, any>);

  return {
    ...rest,
    items: itemsValue,
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据(属性面板数据类型)
 */
const fromValues = (values: FormValues): Properties => {
  const { items, ...rest } = values;

  // TODO: 冗余数据剔除
  const formatItem = Object.entries(items).map(([key, fields]) => {
    return {
      layerId: key,
      fields: fields.map((field) => ({
        field: field.field,
        formatField: field.formatField !== '' ? field.formatField : undefined,
      })),
    };
  });

  return {
    ...rest,
    items: formatItem,
  };
};

/**
 * 获取图层的显示字段 formily 的 Schema 配置
 */
const getLayerFieldsFormSchemas = (props: WidgetRegisterFormProps) => {
  const { layers, datasets } = props;

  const layerSchemaList = layers
    .filter((item) => !['GridLayer', 'HexbinLayer', 'HeatmapLayer'].includes(item.type))
    .map((item) => {
      const dataset = datasets.find((items) => items.id === item.sourceConfig?.datasetId);
      if (dataset === undefined || !isLocalOrRemoteDataset(dataset)) return undefined;

      const columns =
        dataset.columns.map((v: DatasetField) => {
          return { label: v.name, value: v.name };
        }) || [];
      return {
        [`items.${item.id}`]: {
          type: 'array',
          'x-component': 'ArrayItems',
          'x-component-props': {
            style: {
              width: '100%',
              marginTop: 10,
            },
          },
          'x-decorator': 'FormItem',
          'x-decorator-props': {
            labelWidth: '100%',
            wrapperWidth: '100%',
            layout: 'vertical',
          },
          title: item.metadata.name,
          items: {
            type: 'object',
            properties: {
              fields: {
                type: 'void',
                'x-component': 'FormGrid',
                'x-component-props': {
                  colWrap: false,
                },
                properties: {
                  field: {
                    type: 'string',
                    enum: columns,
                    'x-decorator': 'FormItem',
                    required: true,
                    'x-decorator-props': {
                      gridSpan: 7,
                    },
                    'x-component': 'Select',
                    'x-component-props': {
                      placeholder: '选择类目标签',
                    },
                  },
                  formatField: {
                    type: 'string',
                    'x-decorator': 'FormItem',
                    'x-component': 'Input',
                    'x-decorator-props': {
                      gridSpan: 6,
                    },
                    'x-component-props': {
                      placeholder: '输入类目别名',
                    },
                  },
                  remove: {
                    type: 'void',
                    'x-decorator': 'FormItem',
                    'x-component': 'ArrayItems.Remove',
                    'x-component-props': {},
                    'x-decorator-props': {
                      gridSpan: 1,
                    },
                  },
                },
              },
            },
          },
          properties: {
            add: {
              type: 'void',
              title: '添加类目',
              'x-component': 'ArrayItems.Addition',
              'x-component-props': {
                block: true,
              },
            },
          },
        },
      };
    })
    .filter((item) => item !== undefined);

  const layerSchemaMap = layerSchemaList.reduce((map, next) => Object.assign(map, next), {} as Record<string, any>);

  return layerSchemaMap;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties, FormValues> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    isOpen: {
      title: '开启图层信息框',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
      'x-decorator-props': {
        labelCol: 9,
        wrapperCol: 15,
      },
    },
    trigger: {
      title: '打开方式',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        options: [
          {
            value: 'click',
            label: '点击',
          },
          {
            value: 'hover',
            label: '划入',
          },
        ],
      },
      default: 'hover',
    },
    ...getLayerFieldsFormSchemas(props),
  };

  return { schema, toValues, fromValues };
};

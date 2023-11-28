import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
// import LiSwitch from './LiSwitch';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  isOpen?: boolean;
  items: { layerId: string; datasetId: string; enable: boolean }[];
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
  const itemsValue = items?.reduce((map, next) => {
    const key = next.layerId;
    map[key] = {
      [next.datasetId]: next.enable,
    };
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

  const formatItem = Object.entries(items).map(([key, value]) => {
    return {
      layerId: key,
      datasetId: Object.keys(value)[0],
      enable: (Object.values(value)[0] as unknown) as boolean,
    };
  });

  return {
    ...rest,
    items: formatItem,
  };
};

const getPropertiesFieldsFormSchemas = (props: WidgetRegisterFormProps) => {
  const { layers } = props;
  const layerSchemaList = layers.map((item) => {
    return {
      [`items.${item.id}.${item.sourceConfig.datasetId}`]: {
        title: item.metadata.name,
        type: 'boolean',
        'x-decorator': 'FormItem',
        'x-decorator-props': {
          labelWidth: '80%',
        },
        'x-component': 'Switch',
        default: false,
      },
    };
  });
  const layerSchemaMap = layerSchemaList.reduce((map, next) => Object.assign(map, next), {} as Record<string, any>);
  return layerSchemaMap;
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties, FormValues> => {
  // 组件资产的配置表单面板 Schema，表单库 formily 的 Schema
  const schema = {
    isOpen: {
      title: '开启属性面板',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
    },
    ...getPropertiesFieldsFormSchemas(props),
  };
  return { schema, fromValues, toValues };
};

import type { GridLayerStyleAttributeValue } from '@antv/li-p2';
import { gridLayerStyleConfigToFlat, gridLayerStyleFlatToConfig } from '@antv/li-p2';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<GridLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser, transforms = [] } = sourceConfig;

  const transform = transforms?.find((item: Record<string, any>) => item.type === 'grid') || {};
  const { field, method } = transform;

  const coordinateType = sourceConfig.parser?.geometry ? 'geometry' : 'table';
  const pointCoordinate = parser?.geometry
    ? { geometry: parser.geometry }
    : { longitude: parser?.x, latitude: parser?.y };

  return {
    coordinateType,
    ...pointCoordinate,
    aggregateField: field,
    aggregateMethod: method,
    ...gridLayerStyleConfigToFlat(visConfig),
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<GridLayerStyleAttributeValue> => {
  const pointCoordinate = values.geometry ? { geometry: values.geometry } : { x: values.longitude, y: values.latitude };

  const sourceConfig = {
    parser: {
      ...pointCoordinate,
    },
    transforms: [
      {
        type: 'grid',
        // 网格半径 表单上为公里单位转化为米
        size: Number(values.aggregateSize) * 1000,
        field: values.aggregateField,
        method: values.aggregateMethod,
      },
    ],
  };

  const visConfig = gridLayerStyleFlatToConfig(values);

  return {
    sourceConfig,
    visConfig,
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<GridLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

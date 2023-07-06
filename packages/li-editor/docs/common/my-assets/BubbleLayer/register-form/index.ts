import type { BubbleLayerOptions } from '@antv/l7-composite-layers';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

type BubbleLayerStyleAttributeValue = Omit<BubbleLayerOptions, 'source'>;

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<BubbleLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;
  const coordinateType = sourceConfig.parser?.geometry ? 'geometry' : 'table';
  const pointCoordinate = parser.geometry
    ? { geometry: parser.geometry }
    : { longitude: parser?.x, latitude: parser?.y };

  return {
    coordinateType,
    ...pointCoordinate,
    fillColor: visConfig.fillColor,
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<BubbleLayerStyleAttributeValue> => {
  const pointCoordinate = values.geometry ? { geometry: values.geometry } : { x: values.longitude, y: values.latitude };
  const sourceConfig = {
    parser: {
      type: 'json',
      ...pointCoordinate,
    },
  };

  return {
    sourceConfig,
    visConfig: {
      fillColor: values.fillColor,
      state: {
        active: { strokeColor: 'yellow', lineWidth: 1, lineOpacity: 1 },
      },
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<BubbleLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

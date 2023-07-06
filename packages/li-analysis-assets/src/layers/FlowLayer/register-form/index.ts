import type { FlowLayerStyleAttributeValue } from '@antv/li-p2';
import { flowLayerStyleConfigToFlat, flowLayerStyleFlatToConfig } from '@antv/li-p2';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<FlowLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;

  const pointCoordinate = {
    longitude: parser?.x,
    latitude: parser?.y,
    targetLongitude: parser?.x1,
    targetLatitude: parser?.y1,
    weight: parser?.weight,
  };

  return {
    ...pointCoordinate,
    ...flowLayerStyleConfigToFlat(visConfig),
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<FlowLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: {
      type: 'json',
      x: values.longitude,
      y: values.latitude,
      x1: values.targetLongitude,
      y1: values.targetLatitude,
      weight: values.weight,
    },
  };
  const visConfig = flowLayerStyleFlatToConfig(values);
  return {
    sourceConfig,
    visConfig: {
      ...visConfig,
      clusterType: 'HCA',
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<FlowLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);

  return {
    schema,
    toValues,
    fromValues,
  };
};

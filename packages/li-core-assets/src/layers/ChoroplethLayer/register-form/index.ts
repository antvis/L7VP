import type { ChoroplethLayerStyleAttributeValue } from '@antv/li-p2';
import { choroplethLayerStyleConfigToFlat, choroplethLayerStyleFlatToConfig } from '@antv/li-p2';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<ChoroplethLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;

  return {
    geometry: parser?.geometry,
    ...choroplethLayerStyleConfigToFlat(visConfig),
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<ChoroplethLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: {
      type: 'json',
      geometry: values.geometry,
    },
  };
  const visConfig = choroplethLayerStyleFlatToConfig(values);

  // TODO: 没有值时置灰
  if (typeof visConfig.fillColor === 'object' && visConfig.fillColor.scale) {
    visConfig.fillColor.scale.unknown = '#c0c0c0';
  }

  return {
    sourceConfig,
    visConfig: {
      ...visConfig,
      state: {
        active: { strokeColor: 'yellow', fillColor: false },
        select: { fillColor: false, strokeColor: 'red' },
      },
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<ChoroplethLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

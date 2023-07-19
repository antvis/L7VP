import type { ChoroplethLayerOptions } from '@antv/l7-composite-layers';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

type ChoroplethLayerStyleAttributeValue = Omit<ChoroplethLayerOptions, 'source'>;

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<ChoroplethLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;

  return {
    geometry: parser?.geometry,

    fillColor: visConfig.fillColor,
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

export default (props: LayerRegisterFormProps): LayerRegisterForm<ChoroplethLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schemaaa
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

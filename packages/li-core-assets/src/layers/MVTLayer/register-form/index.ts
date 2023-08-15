import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import type { MVTLayerProps } from '../mvt-layer';
import getSchema from './schema';

/**
 * 栅格图层样式属性值
 */
export type MVTLayerStyleAttributeValue = Omit<MVTLayerProps, 'source' | 'metadataUrl'>;

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<MVTLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;
  const { style, minZoom = 0, maxZoom = 24, blend } = visConfig;

  return {
    opacity: style?.opacity,
    zoom: [minZoom, maxZoom],
    blend,
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<MVTLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: { type: 'mvt' },
  };

  return {
    sourceConfig,
    visConfig: {
      style: {
        opacity: values?.opacity,
      },
      minZoom: values?.zoom?.[0],
      maxZoom: values?.zoom?.[1],
      blend: values.blend,
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<MVTLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema();
  return {
    schema,
    toValues,
    fromValues,
  };
};

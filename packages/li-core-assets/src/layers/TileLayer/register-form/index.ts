import type { RasterLayerProps } from '@antv/larkmap';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 栅格图层样式属性值
 */
export type RasterLayerStyleAttributeValue = Omit<RasterLayerProps, 'source'>;

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<RasterLayerStyleAttributeValue>) => {
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
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<RasterLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: { type: 'rasterTile' },
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

export default (props: LayerRegisterFormProps): LayerRegisterForm<RasterLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema();
  return {
    schema,
    toValues,
    fromValues,
  };
};

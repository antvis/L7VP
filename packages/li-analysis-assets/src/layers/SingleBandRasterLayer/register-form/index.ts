import type { RasterDataTileLayerStyleOptions } from '@antv/l7-composite-layers/dist/esm/core-layers/raster-layer/types';
import type { RasterLayerProps } from '@antv/larkmap';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 单波段栅格图层样式属性值
 */
export type SingleBandRasterLayerStyleAttributeValue = Omit<RasterLayerProps, 'source' | 'style'> & {
  style: RasterDataTileLayerStyleOptions;
};

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<SingleBandRasterLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { parser } = sourceConfig;
  const { style, minZoom = 0, maxZoom = 24, blend } = visConfig;
  const { opacity, domain, clampLow, clampHigh, noDataValue, rampColors } = style;

  return {
    opacity: opacity,
    zoom: [minZoom, maxZoom],
    blend,
    clampLow: clampLow,
    clampHigh: clampHigh,
    domain: domain,
    nodataValue: noDataValue,
    fillColorScale: rampColors,
    fillColorRange: {
      colors: rampColors?.colors,
      isReversed: false,
    },
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (
  values: Record<string, any>,
): LayerRegisterFormResultType<SingleBandRasterLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: { type: 'raster' },
  };

  const rampColors =
    values?.fillColorScale?.type === 'quantize'
      ? {
          type: values?.fillColorScale?.type,
          colors: values?.fillColorRange?.colors,
        }
      : values?.fillColorScale;

  return {
    sourceConfig,
    visConfig: {
      style: {
        opacity: values?.opacity,
        clampLow: values?.clampLow,
        clampHigh: values?.clampHigh,
        domain: values?.domain,
        noDataValue: values?.noDataValue,
        rampColors,
      },
      minZoom: values?.zoom?.[0],
      maxZoom: values?.zoom?.[1],
      blend: values.blend,
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<SingleBandRasterLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema();
  return {
    schema,
    toValues,
    fromValues,
  };
};

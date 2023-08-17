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
  const {
    fillColor,
    opacity,
    strokeColor,
    lineWidth,
    lineOpacity,
    radius,
    minZoom = 0,
    maxZoom = 24,
    blend,
  } = visConfig;

  const styleConfug = {
    fillColorField: typeof fillColor === 'object' ? fillColor?.field : undefined,
    fillColorRange:
      typeof fillColor === 'object'
        ? {
            colors: fillColor?.value || [],
            // @ts-ignore
            isReversed: fillColor?.isReversed || false,
          }
        : undefined,
    fillColorScale: typeof fillColor === 'object' ? fillColor?.scale?.type : undefined,
    fillColor: typeof fillColor !== 'object' ? fillColor : undefined,
    fillColorOpacity: opacity,
    strokeColor: strokeColor,
    lineWidth,
    lineOpacity,
    radius: typeof radius !== 'object' ? radius : undefined,
    // @ts-ignore
    radiusField: typeof radius === 'object' ? radius?.field : undefined,
    // @ts-ignore
    radiusRange: typeof radius === 'object' ? radius?.value : undefined,
  };

  return {
    ...styleConfug,
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

  const visConfig = {
    fillColor: values.fillColorField
      ? {
          field: values.fillColorField,
          value: values.fillColorRange.colors,
          scale: { type: values.fillColorScale },
          isReversed: values.fillColorRange.isReversed,
        }
      : values.fillColor,
    opacity: values.fillColorOpacity,
    strokeColor: values.strokeColor,
    lineWidth: values.lineWidth,
    lineOpacity: values.lineOpacity,
    radius: values.radiusField
      ? {
          field: values.radiusField,
          value: values.radiusRange,
        }
      : values.radius,
    minZoom: values?.zoom?.[0],
    maxZoom: values?.zoom?.[1],
    blend: values.blend,
  };

  return {
    sourceConfig,
    visConfig,
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<MVTLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

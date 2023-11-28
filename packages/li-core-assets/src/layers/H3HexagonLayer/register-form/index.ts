import type { ChoroplethLayerStyleAttributeValue } from '@antv/li-p2';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import getSchema from './schema';

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<ChoroplethLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { fillColor, opacity, minZoom = 0, maxZoom = 24, blend } = visConfig;
  const { parser } = sourceConfig;

  const isCustom = typeof fillColor === 'object' && fillColor?.scale?.domain && fillColor?.scale?.domain.length !== 0;

  const fillColorScale =
    typeof fillColor === 'object'
      ? {
          type: fillColor?.scale?.type,
          domain: fillColor?.scale?.domain,
          range: fillColor?.value,
          isCustom,
        }
      : undefined;

  return {
    hexagonId: parser?.hexagonId,
    fillColorField: typeof fillColor === 'object' ? fillColor?.field : undefined,
    fillColorRange:
      typeof fillColor === 'object'
        ? {
            colors: fillColor?.value || [],
            // @ts-ignore
            isReversed: fillColor?.isReversed || false,
          }
        : undefined,
    fillColorScale,
    fillColor: typeof fillColor !== 'object' ? fillColor : undefined,
    fillColorOpacity: opacity,
    zoom: [minZoom, maxZoom],
    blend,
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (style: Record<string, any>): LayerRegisterFormResultType<ChoroplethLayerStyleAttributeValue> => {
  const sourceConfig = {
    parser: {
      hexagonId: style.hexagonId,
    },
  };

  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: style.fillColorScale.isCustom ? style.fillColorScale.range : style.fillColorRange?.colors,
        scale: style.fillColorScale.isCustom
          ? {
              type: style.fillColorScale.type,
              domain: style.fillColorScale.domain,
            }
          : {
              type: style.fillColorScale.type,
            },
        isReversed: style.fillColorRange?.isReversed ?? false,
      }
    : style.fillColor;

  return {
    sourceConfig,
    visConfig: {
      fillColor,
      opacity: style.fillColorOpacity,
      lineWidth: 0,
      minZoom: style?.zoom?.[0],
      maxZoom: style?.zoom?.[1],
      blend: style.blend,
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

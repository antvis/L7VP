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
    fillColorScale: typeof fillColor === 'object' ? fillColor?.scale?.type : undefined,
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
      type: 'json',
      hexagonId: style.hexagonId,
    },
  };

  return {
    sourceConfig,
    visConfig: {
      fillColor: style.fillColorField
        ? {
            field: style.fillColorField,
            value: style.fillColorRange?.colors || [],
            isReversed: style.fillColorRange?.isReversed || false,
            scale: { type: style.fillColorScale },
          }
        : style.fillColor,
      opacity: style.fillColorOpacity,
      lineWidth: 0,
      minZoom: style?.zoom?.[0],
      maxZoom: style?.zoom?.[1],
      blend: style.blend,
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

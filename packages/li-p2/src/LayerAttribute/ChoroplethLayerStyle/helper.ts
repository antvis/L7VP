import type { ChoroplethLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const choroplethLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: style.fillColorScale.isCustom ? style.fillColorScale.range : style.fillColorRange?.colors,
        scale: style.fillColorScale.isCustom
          ? {
              type: style.fillColorScale.type,
              domain: style.fillColorScale.domain,
              unknown: style.fillColorScale.unknown,
            }
          : {
              type: style.fillColorScale.type,
            },
        isReversed: style.fillColorRange?.isReversed ?? false,
      }
    : style.fillColor;

  const styleConfig: ChoroplethLayerStyleAttributeValue = {
    fillColor,
    opacity: style.fillColorOpacity,
    strokeColor: style.strokeColor,
    lineWidth: style.lineWidth,
    lineOpacity: style.lineOpacity,
    label: {
      field: style.labelField,
      visible: Boolean(style.labelField),
      style: {
        fill: style.labelColor,
        fontSize: style.labelFontSize,
        textAnchor: style.labelTextAnchor,
        textOffset: style.labelTextOffset,
        stroke: style.labelStroke,
        strokeWidth: style.labelStrokeWidth,
      },
    },
    minZoom: style.zoom?.[0],
    maxZoom: style.zoom?.[1],
    blend: style.blend,
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const choroplethLayerStyleConfigToFlat = (styleConfig: ChoroplethLayerStyleAttributeValue) => {
  const {
    fillColor,
    opacity,
    strokeColor,
    lineWidth,
    lineOpacity,
    label,
    minZoom = 0,
    maxZoom = 24,
    blend,
  } = styleConfig;

  const isCustom = typeof fillColor === 'object' && fillColor?.scale?.domain && fillColor?.scale?.domain.length !== 0;

  const fillColorScale =
    typeof fillColor === 'object'
      ? {
          type: fillColor?.scale?.type,
          domain: fillColor?.scale?.domain,
          range: fillColor?.value,
          unknown: fillColor?.scale?.unknown,
          isCustom,
        }
      : undefined;

  const config = {
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
    strokeColor: strokeColor,
    lineWidth,
    lineOpacity,
    labelField: label?.field,
    labelColor: label?.style?.fill,
    labelFontSize: label?.style?.fontSize,
    labelTextAnchor: label?.style?.textAnchor,
    labelTextOffset: label?.style?.textOffset,
    labelStroke: label?.style?.stroke,
    labelStrokeWidth: label?.style?.strokeWidth,
    zoom: [minZoom, maxZoom],
    blend,
  };

  return config;
};

import type { ChoroplethLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const choroplethLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: ChoroplethLayerStyleAttributeValue = {
    fillColor: style.fillColorField
      ? {
          field: style.fillColorField,
          value: style.fillColorRange.colors,
          scale: { type: style.fillColorScale },
          isReversed: style.fillColorRange.isReversed,
        }
      : style.fillColor,
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
    fillColorScale: typeof fillColor === 'object' ? fillColor?.scale?.type : undefined,
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
    zoom: [minZoom, maxZoom],
    blend,
  };

  return config;
};

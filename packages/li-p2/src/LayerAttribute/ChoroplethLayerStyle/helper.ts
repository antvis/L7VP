import type { ChoroplethLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const choroplethLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const isCustom =
    style.fillColorScale.type === 'threshold' ||
    (style.fillColorScale.type === 'cat' && style.fillColorScale.domain?.length !== 0);

  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: isCustom ? style.fillColorScale.range : style.fillColorRange?.colors,
        scale: isCustom
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

  const fillColorScale =
    typeof fillColor === 'object'
      ? {
          type: fillColor?.scale?.type ?? '',
          domain: fillColor?.scale?.domain ?? [],
          range: fillColor?.value,
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
    zoom: [minZoom, maxZoom],
    blend,
  };

  return config;
};

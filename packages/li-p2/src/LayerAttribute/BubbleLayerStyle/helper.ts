import type { BubbleLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const bubbleLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: typeof style.fillColorScale === 'string' ? style.fillColorRange?.colors : style.fillColorScale?.colors,
        scale:
          typeof style.fillColorScale === 'string'
            ? { type: style.fillColorScale }
            : {
                type: style.fillColorScale.type,
                domain: style.fillColorScale.domain,
              },
        isReversed: style.fillColorRange.isReversed,
      }
    : style.fillColor;

  const styleConfig: BubbleLayerStyleAttributeValue = {
    fillColor,
    opacity: style.fillColorOpacity,
    strokeColor: style.strokeColor,
    lineWidth: style.lineWidth,
    lineOpacity: style.lineOpacity,
    radius: style.radiusField
      ? {
          field: style.radiusField,
          value: style.radiusRange,
        }
      : style.radius,
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
    // animate: {
    //   enable: style.animateEnable,
    //   speed: style.animateSpeed,
    //   rings: style.animateRings,
    // },
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const bubbleLayerStyleConfigToFlat = (styleConfig: BubbleLayerStyleAttributeValue) => {
  const {
    fillColor,
    opacity,
    strokeColor,
    lineWidth,
    lineOpacity,
    radius,
    label,
    minZoom = 0,
    maxZoom = 24,
    blend,
  } = styleConfig;

  const fillColorScale =
    typeof fillColor === 'object'
      ? fillColor.scale?.domain
        ? {
            type: fillColor?.scale?.type ?? '',
            domain: fillColor?.scale?.domain ?? [],
            colors: fillColor?.value,
          }
        : fillColor?.scale?.type
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
    radius: typeof radius !== 'object' ? radius : undefined,
    // @ts-ignore
    radiusField: typeof radius === 'object' ? radius?.field : undefined,
    // @ts-ignore
    radiusRange: typeof radius === 'object' ? radius?.value : undefined,
    labelField: label?.field,
    labelColor: label?.style?.fill,
    labelFontSize: label?.style?.fontSize,
    labelTextAnchor: label?.style?.textAnchor,
    labelTextOffset: label?.style?.textOffset,
    zoom: [minZoom, maxZoom],
    blend,
    // animateEnable: typeof animate === 'object' ? animate?.enable : animate,
    // animateSpeed: typeof animate === 'object' ? animate?.speed : undefined,
    // animateRings: typeof animate === 'object' ? animate?.rings : undefined,
  };
  return config;
};

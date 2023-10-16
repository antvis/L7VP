import type { LineLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const lineLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: typeof style.fillColorScale === 'string' ? style.fillColorRange.colors : style.fillColorScale.colors,
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

  const styleConfig: LineLayerStyleAttributeValue = {
    size: style.sizeField
      ? {
          field: style.sizeField,
          value: style.sizeRange,
        }
      : style.size,

    color: fillColor,
    style: {
      opacity: style.fillColorOpacity,
      lineType: 'solid' as const,
      sourceColor: style.sourceColor,
      targetColor: style.targetColor,
    },
    minZoom: style.zoom?.[0],
    maxZoom: style.zoom?.[1],
    blend: style.blend,
    // 动画效果隐藏
    // animate: {
    //   enable: style.animateEnable,
    //   duration: style.animateDuration,
    //   interval: style.animateInterval,
    //   trailLength: style.animateTrailLength,
    // },
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const lineLayerStyleConfigToFlat = (styleConfig: LineLayerStyleAttributeValue) => {
  const { size, color, style, minZoom = 0, maxZoom = 24, blend, animate } = styleConfig;
  const fillColorScale =
    typeof color === 'object'
      ? color.scale?.domain
        ? {
            type: color?.scale?.type ?? '',
            domain: color?.scale?.domain ?? [],
            colors: color?.value,
          }
        : color?.scale?.type
      : undefined;

  const config = {
    size: typeof size === 'object' ? undefined : size,
    // @ts-ignore
    sizeField: typeof size === 'object' ? size?.field : undefined,
    // @ts-ignore
    sizeRange: typeof size === 'object' ? size?.value : undefined,
    fillColorField: typeof color === 'object' ? color?.field : undefined,
    fillColorRange:
      typeof color === 'object'
        ? {
            colors: color?.value || [],
            // @ts-ignore
            isReversed: color?.isReversed || false,
          }
        : undefined,
    fillColorScale,

    fillColorOpacity: style?.opacity,

    lineType: style?.lineType,
    sourceColor: style?.sourceColor,
    targetColor: style?.targetColor,
    zoom: [minZoom, maxZoom],
    blend,
    // 动画效果隐藏
    // animateEnable: typeof animate === 'object' ? animate?.enable : animate,
    // animateDuration: typeof animate === 'object' ? animate?.duration : undefined,
    // animateInterval: typeof animate === 'object' ? animate?.interval : undefined,
    // animateTrailLength: typeof animate === 'object' ? animate?.trailLength : undefined,
  };

  return config;
};

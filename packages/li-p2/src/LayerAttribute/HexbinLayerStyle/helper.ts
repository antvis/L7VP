import type { HexbinLayerStyleAttributeValue } from './types';
/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const hexbinLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const fillColor = style.fillColorField
    ? {
        field: style.fillColorField,
        value: typeof style.fillColorScale === 'string' ? style.fillColorRange.colors : style.fillColorScale.ranges,
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

  const styleConfig = {
    shape: 'hexagonColumn' as const,
    color: fillColor,
    // 网格半径 表单上为公里单位转化为米
    aggregateSize: Number(style.aggregateSize) * 1000,
    style: {
      opacity: style.fillColorOpacity,
      coverage: style.coverage,
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
export const hexbinLayerStyleConfigToFlat = (styleConfig: HexbinLayerStyleAttributeValue) => {
  const { aggregateSize, style, color, minZoom = 0, maxZoom = 24, blend } = styleConfig;

  const fillColorScale =
    typeof color === 'object'
      ? color.scale?.domain
        ? {
            type: color?.scale?.type ?? '',
            domain: color?.scale?.domain ?? [],
            ranges: color?.value,
          }
        : color?.scale?.type
      : undefined;

  const config = {
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
    fillColor: typeof color !== 'object' ? color : undefined,
    fillColorOpacity: style?.opacity,
    // 网格半径 表单上为公里单位 米转公里
    aggregateSize: Number(aggregateSize) / 1000,
    // @ts-ignore
    coverage: style?.coverage,
    zoom: [minZoom, maxZoom],
    blend,
  };

  return config;
};

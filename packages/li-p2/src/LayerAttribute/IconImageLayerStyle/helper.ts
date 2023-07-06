import type { IconImageLayerStyleAttributeValue, IconSelectOptionType } from './types';
/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const iconImageLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const { iconAtlasList } = style;

  const iconAtlas = (iconAtlasList || []).reduce(
    (pre: {}, item: IconSelectOptionType) => ({
      ...pre,
      [item.id]: item.image,
    }),
    {},
  );

  const styleConfig: IconImageLayerStyleAttributeValue = {
    iconAtlas,
    icon: style.iconField
      ? { field: style.iconField, value: iconAtlasList.map((item: IconSelectOptionType) => item.id) }
      : style.iconImg,
    // fillColor: style.fillColor,
    radius: style.radiusField
      ? {
          field: style.radiusField,
          value: style.radiusRange,
        }
      : style.radius,
    iconStyle: {
      opacity: style.fillOpacity,
    },
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
export const iconImageLayerStyleConfigToFlat = (styleConfig: Partial<IconImageLayerStyleAttributeValue>) => {
  const { radius, label, icon, iconStyle, iconAtlas = {}, minZoom = 0, maxZoom = 24, blend } = styleConfig || {};

  const config = {
    iconAtlasList: Object.entries(iconAtlas).map(([key, value]) => ({ id: key, image: value })),
    iconImg: typeof icon === 'object' ? undefined : icon,
    iconField: typeof icon === 'object' ? icon.field : undefined,
    fillOpacity: iconStyle?.opacity,
    // fillColor,
    radiusField: typeof radius === 'object' && !Array.isArray(radius) ? radius?.field : undefined,
    radiusRange: typeof radius === 'object' && !Array.isArray(radius) ? radius?.value : undefined,
    radius: typeof radius !== 'object' ? radius : undefined,
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

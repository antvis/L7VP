import { getUId } from '../../utils';
import { BuiltInImage, BuiltInImageList } from './constant';
import type { IconImageLayerStyleAttributeValue, IconSelectOptionType } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const iconImageLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const { iconAtlasList, iconField, iconImg } = style;

  const icon = iconField
    ? {
        field: style.iconField,
        value: iconAtlasList.map((item: IconSelectOptionType) => item.title),
        scale: {
          type: 'cat',
          domain: iconAtlasList.map((item: IconSelectOptionType) => item.value),
          unknown: '',
        },
      }
    : iconImg;

  const styleConfig: IconImageLayerStyleAttributeValue = {
    iconAtlas: BuiltInImage,
    icon,
    fillColor: style.fillColor,
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
export const iconImageLayerStyleConfigToFlat = (styleConfig: Partial<IconImageLayerStyleAttributeValue>) => {
  const { radius, label, icon, iconStyle, minZoom = 0, maxZoom = 24, blend } = styleConfig || {};

  let iconAtlasList = undefined;
  if (typeof icon === 'object' && icon.value) {
    // @ts-ignore
    iconAtlasList = icon.value.map((_item: string, index: number) => {
      const _icon = BuiltInImageList.find((item) => item.title === _item);
      return {
        id: getUId(),
        icon: _icon?.img,
        title: _icon?.title,
        value: icon.scale?.domain?.[index],
      };
    });
  }

  const config = {
    iconAtlasList,
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
    labelStroke: label?.style?.stroke,
    labelStrokeWidth: label?.style?.strokeWidth,
    zoom: [minZoom, maxZoom],
    blend,
  };

  return config;
};

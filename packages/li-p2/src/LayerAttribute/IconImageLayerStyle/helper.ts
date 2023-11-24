import { getUId } from '../../utils';
import { BuiltInImage, BuiltInImageList } from './constant';
import type { IconImageLayerStyleAttributeValue, IconSelectOptionType } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const iconImageLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const { iconAtlasList, iconField, iconImg } = style;

  let icon = iconImg;
  if (iconField) {
    const { iconList, unknownIcon } = iconAtlasList;
    const unknown = unknownIcon?.id ? unknownIcon.id : 'no-icon';
    icon = {
      field: style.iconField,
      value: iconList.map((item: IconSelectOptionType) => item.imageId),
      scale: {
        type: 'cat',
        domain: iconList.map((item: IconSelectOptionType) => item.value),
        unknown: unknown,
      },
    };
  }

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
    const _unknown = BuiltInImageList.find((item) => item.id === icon.scale?.unknown);

    iconAtlasList = {
      // @ts-ignore
      iconList: icon.value.map((_item: string, index: number) => {
        const _icon = BuiltInImageList.find((item) => item.id === _item);
        return {
          id: getUId(),
          image: _icon?.image,
          imageId: _icon?.id,
          value: icon.scale?.domain?.[index],
        };
      }),
      unknownIcon: { id: _unknown?.id, image: _unknown?.image },
    };
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

import { BuiltInImageList } from '../components/IconScaleSelector/constant';
import type { IconImageLayerStyleAttributeValue } from './types';

/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const iconImageLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const { iconImgScale, iconField, iconImg } = style;

  let icon = iconImg;
  if (iconField) {
    const { domain, range, unknown } = iconImgScale;
    icon = {
      field: style.iconField,
      value: range,
      scale: {
        type: 'cat',
        domain: domain,
        unknown,
      },
    };
  }

  let iconAtlas = {};
  if (iconImg) {
    const _img = BuiltInImageList.find((item) => item.id === iconImg);
    iconAtlas = _img ? { [_img.id]: _img.url } : {};
  } else {
    iconAtlas = BuiltInImageList.filter((item) => iconImgScale.range.includes(item.id)).reduce(
      (pre, { id, url }) => ({
        ...pre,
        [id]: url,
      }),
      {
        unknown_icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original',
      },
    );
  }

  const styleConfig: IconImageLayerStyleAttributeValue = {
    iconAtlas,
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

  let iconImgScale = undefined;
  if (typeof icon === 'object' && icon.value) {
    iconImgScale = {
      range: icon.value,
      domain: icon.scale?.domain,
      unknownIcon: icon.scale?.unknown,
    };
  }

  const config = {
    iconImgScale,
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

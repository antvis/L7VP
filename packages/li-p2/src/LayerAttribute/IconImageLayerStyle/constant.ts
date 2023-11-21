import type { IconImageLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-icon-image-layer-style-attribute';
import { DEFAULTICONOPTIONS } from '../components/IconSelector/constant';

export const BuiltInImageList: { title: string; img: string }[] = DEFAULTICONOPTIONS.map((item) => item.icons).flat();

export const BuiltInImage = BuiltInImageList.reduce(
  (pre, { title, img }) => ({
    ...pre,
    [title]: img,
  }),
  {},
);

/** 默认值样式属性 */
export const DefaultIconImageLayerStyle: IconImageLayerStyleAttributeValue = {
  iconAtlas: BuiltInImage,
  icon: '001',
  radius: 30,
  iconStyle: {
    opacity: 1,
  },
  label: {
    field: undefined,
    visible: false,
    style: {
      fill: 'blue',
      fontSize: 12,
      textAnchor: 'center',
      textOffset: [0, 0],
    },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
};

import type { IconImageLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-icon-image-layer-style-attribute';
import { DEFAULT_ICON_CATEGORY } from '../components/IconScaleSelector/constant';

export const BuiltInImageList: { id: string; url: string }[] = DEFAULT_ICON_CATEGORY.map((item) => item.icons).flat();

export const BuiltInImage = BuiltInImageList.reduce(
  (pre, { id, url }) => ({
    ...pre,
    [id]: url,
  }),
  { unknown: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original' },
);

/** 默认值样式属性 */
export const DefaultIconImageLayerStyle: IconImageLayerStyleAttributeValue = {
  iconAtlas: BuiltInImage,
  icon: BuiltInImageList[0].id,
  radius: 20,
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

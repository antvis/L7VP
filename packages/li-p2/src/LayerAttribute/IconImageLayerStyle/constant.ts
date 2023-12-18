import type { IconImageLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-icon-image-layer-style-attribute';
import { BuiltInImageList } from '../components/IconScaleSelector/constant';

export const BuiltInImage = BuiltInImageList.reduce(
  (pre, { id, url }) => ({
    ...pre,
    [id]: url,
  }),
  { unknown_icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original' },
);

/** 默认值样式属性 */
export const DefaultIconImageLayerStyle: IconImageLayerStyleAttributeValue = {
  iconAtlas: {
    [BuiltInImageList[0].id]: BuiltInImageList[0].url,
  },
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

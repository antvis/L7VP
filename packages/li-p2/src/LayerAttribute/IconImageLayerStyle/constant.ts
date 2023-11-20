import type { IconImageLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-icon-image-layer-style-attribute';

export const BuiltInImageList: { id: string; image: string }[] = [
  {
    id: 'location',
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/2f98d307-b93f-442b-a1bf-c693ea8652be.svg',
  },
  {
    id: 'location-people',
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/481fa5b8-ddeb-48c4-aefa-14e3c35d322a.svg',
  },
  {
    id: 'chain',
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/e695a9d5-86af-4ac2-8191-0ea7f2b042c1.svg',
  },
  {
    id: 'house',
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/bbaf5a67-4fad-4440-b6d6-26389b0639bd.svg',
  },
];

export const BuiltInImage = BuiltInImageList.reduce(
  (pre, { id, image }) => ({
    ...pre,
    [id]: image,
  }),
  {},
);

/** 默认值样式属性 */
export const DefaultIconImageLayerStyle: IconImageLayerStyleAttributeValue = {
  iconAtlas: {},
  icon: 'location',
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

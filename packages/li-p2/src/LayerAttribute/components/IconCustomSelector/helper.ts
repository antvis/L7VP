import { uniqueId } from 'lodash-es';
import type { IconListItem } from './type';

// 通过图层icon映射转换为 IconSelector 的数据格式
export const getLayerByIconSelectorData = (value: Record<string, string>): IconListItem[] => {
  const iconList = Object.keys(value).map((key) => ({
    icon: value[key],
    value: key,
    id: uniqueId(),
  }));

  return iconList;
};

// 通过 IconSelector 数据转换为的图层icon映射格式
export const getIconSelectorData = (iconList: IconListItem[]): Record<string, string> => {
  const _val = {};
  iconList.forEach((item) => {
    Object.assign(_val, { [item.value]: item.icon });
  });

  return _val;
};

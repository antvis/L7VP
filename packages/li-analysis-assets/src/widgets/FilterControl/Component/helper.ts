import type { FilterSettingItem } from 'packages/li-p2';

export const getFilters = (list: FilterSettingItem[]) => {
  const _list = list.map((item) => {
    if (item.type === 'string' && item.value?.includes('all')) {
      return {
        ...item,
        value: '',
      };
    }
    return item;
  });

  return _list;
};

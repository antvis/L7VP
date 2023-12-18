import type { FilterSettingItem } from 'packages/li-p2';
import type { FilterNode } from 'packages/li-sdk';

export const getFilters = (list: FilterSettingItem[]) => {
  const _list = list
    .map((item) => {
      if (item.type === 'string' && item.value?.includes('all')) {
        return {
          ...item,
          value: undefined,
        };
      }
      return item;
    })
    .filter((item) => item.value);

  if (!_list.length) {
    return [];
  }

  return _list.map((item) => {
    return (item.type === 'date'
      ? {
          id: item.id,
          field: item.field,
          type: item.type,
          operator: item.operator,
          value: item.value,
          granularity: item.granularity,
        }
      : {
          id: item.id,
          field: item.field,
          type: item.type,
          operator: item.operator,
          value: item.value,
        }) as FilterNode;
  });
};

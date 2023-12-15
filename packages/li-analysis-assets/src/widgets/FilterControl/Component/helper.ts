import type { FilterSettingItem } from 'packages/li-p2';
import type { FilterNode } from 'packages/li-sdk';

export const getFilters = (list: FilterSettingItem[]) => {
  const _list = (list.map((item) => {
    const { id, field, type, value, operator } = item;
    if (item.type === 'string') {
      if (item.value?.includes('all')) {
        return {
          id,
          field,
          type,
          value: '',
          operator,
        };
      } else {
        return { id, field, type, value, operator };
      }
    } else {
      return { id, field, type, value, operator };
    }
  }) as unknown) as FilterNode[];

  return _list;
};

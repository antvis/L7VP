import type { FilterConfig } from 'packages/li-p2';
import type { FilterNode } from 'packages/li-sdk';

export const getFilterNodes = (list: FilterConfig[]) => {
  const _list = list.filter((item) => !(item.type === 'string' && item.value?.includes('all')));

  const filterNodes = _list.map((item) => {
    return item.type === 'date'
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
        };
  });

  return filterNodes as FilterNode[];
};

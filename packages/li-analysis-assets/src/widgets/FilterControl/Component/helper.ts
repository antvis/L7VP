import type { FilterConfigType } from 'packages/li-p2';
import type { FilterNode } from 'packages/li-sdk';

export const getFilterNode = (filterConfig: FilterConfigType) => {
  let filterNode: FilterNode;

  switch (filterConfig.type) {
    case 'string':
      // 空值的情况，设置无效值; 全选情况，设置无效值;
      const value = filterConfig.value === undefined || filterConfig.value.includes('all') ? [] : filterConfig.value;
      filterNode = {
        id: filterConfig.id,
        field: filterConfig.field,
        type: filterConfig.type,
        operator: filterConfig.operator,
        value: value,
      };
      break;
    case 'number':
      filterNode = {
        id: filterConfig.id,
        field: filterConfig.field,
        type: filterConfig.type,
        operator: filterConfig.operator,
        // 空值的情况，设置无效值
        value: filterConfig.value || ([] as any),
      };
      break;
    case 'date':
      filterNode = {
        id: filterConfig.id,
        field: filterConfig.field,
        type: filterConfig.type,
        operator: filterConfig.operator,
        // 空值的情况，设置无效值
        value: filterConfig.value || (([] as unknown) as [string, string]),
        granularity: filterConfig.granularity,
      };
      break;
  }

  return filterNode;
};

export const getFilterNodes = (list: FilterConfigType[]) => {
  const filterNodes = list.map((item) => getFilterNode(item));

  return filterNodes;
};

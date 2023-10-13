import type { FilterDate, FilterNumber } from '@antv/li-sdk';

export type FilterType = 'number' | 'date';

/** 筛选器子节点，单个筛选条件 */
export type TimeLineFilter =
  | (Omit<FilterNumber, 'operator' | 'value'> & {
      // 在范围内
      operator: 'BETWEEN';
      value: [number, number];
    })
  | (Omit<FilterDate, 'operator' | 'value'> & {
      operator: 'BETWEEN';
      value: [string, string];
    });

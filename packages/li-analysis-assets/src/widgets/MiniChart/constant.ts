/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-analysis-mini-chart';

export const ChartTypeList = [
  { value: 'line', label: '折线图' },
  { value: 'column', label: '柱状图' },
  { value: 'pie', label: '饼图' },
];

export type AggregationMethodType = 'sum' | 'avel' | 'max' | 'min' | 'count';

export const AggregationMethod = [
  { value: 'count', label: '计数' },
  { value: 'sum', label: '求和' },
  { value: 'avel', label: '平均值' },
  { value: 'max', label: '最大值' },
  { value: 'min', label: '最小值' },
];

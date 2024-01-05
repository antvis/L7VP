import React from 'react';
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

export const ICON = () => {
  return (
    <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
      <path d="M896 928H128a32 32 0 0 1-32-32V128a32 32 0 0 1 64 0v736H896a32 32 0 0 1 0 64z" fill="currentColor" />
      <path
        d="M352 896a32 32 0 0 1-32-32v-320a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zM576 896a32 32 0 0 1-32-32V448a32 32 0 0 1 64 0v416a32 32 0 0 1-32 32zM800 896a32 32 0 0 1-32-32V384a32 32 0 0 1 64 0v480a32 32 0 0 1-32 32zM256 416a32.64 32.64 0 0 1-25.6-12.8 32 32 0 0 1 6.4-44.8l256-192a31.36 31.36 0 0 1 41.6 0l108.8 108.16L876.8 102.4a32 32 0 1 1 38.4 51.2l-256 192a31.36 31.36 0 0 1-41.6-3.2L512 234.24 275.2 409.6a31.36 31.36 0 0 1-19.2 6.4z"
        fill="currentColor"
      />
    </svg>
  );
};

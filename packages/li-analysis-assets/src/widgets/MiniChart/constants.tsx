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
    <svg viewBox="0 0 64 64" width="1em" height="1em" fill="currentColor">
      <path
        fill="currentColor"
        d="m57.666301,59.805701l-51.332601,0a2.138858,2.138858 0 0 1 -2.138858,-2.138858l0,-51.332601a2.138858,2.138858 0 0 1 4.277717,0l0,49.193743l49.193743,0a2.138858,2.138858 0 0 1 0,4.277717z"
      />
      <path
        fill="currentColor"
        d="m21.305709,57.666842a2.138858,2.138858 0 0 1 -2.138858,-2.138858l0,-21.388584a2.138858,2.138858 0 0 1 4.277717,0l0,21.388584a2.138858,2.138858 0 0 1 -2.138858,2.138858zm14.972009,0a2.138858,2.138858 0 0 1 -2.138858,-2.138858l0,-27.805159a2.138858,2.138858 0 0 1 4.277717,0l0,27.805159a2.138858,2.138858 0 0 1 -2.138858,2.138858zm14.972009,0a2.138858,2.138858 0 0 1 -2.138858,-2.138858l0,-32.082876a2.138858,2.138858 0 0 1 4.277717,0l0,32.082876a2.138858,2.138858 0 0 1 -2.138858,2.138858zm-36.360593,-32.082876a2.181636,2.181636 0 0 1 -1.711087,-0.855543a2.138858,2.138858 0 0 1 0.427772,-2.994402l17.110867,-12.83315a2.096081,2.096081 0 0 1 2.780516,0l7.272119,7.229341l15.613666,-11.507058a2.138858,2.138858 0 1 1 2.56663,3.422173l-17.110867,12.83315a2.096081,2.096081 0 0 1 -2.780516,-0.213886l-7.058233,-7.229341l-15.827552,11.720944a2.096081,2.096081 0 0 1 -1.283315,0.427772z"
      />
    </svg>
  );
};

import type { DatasetFilter } from '@antv/li-sdk';
import React from 'react';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-analysis-time-line-panel';

export const TimeAxisSvg = () => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentcolor">
    <path d="M3.33317 4.66732H4.6665V11.334H3.33317V4.66732ZM0.666504 6.66732H1.99984V9.33398H0.666504V6.66732ZM5.99984 1.33398H7.33317V13.334H5.99984V1.33398ZM8.6665 2.66732H9.99984V14.6673H8.6665V2.66732ZM11.3332 4.66732H12.6665V11.334H11.3332V4.66732ZM13.9998 6.66732H15.3332V9.33398H13.9998V6.66732Z" />
  </svg>
);

export const EMPTY_DATASET_FILTER: DatasetFilter = { relation: 'AND', children: [] };

import type { TooltipPlacement } from 'antd/es/tooltip';
import React from 'react';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-map-view-setting-control';

/**气泡定位位置数据 */
export const POPOVER_PLACEMENT_MAP = new Map<string | undefined, TooltipPlacement>([
  ['topleft', 'rightTop'],
  ['topcenter', 'bottom'],
  ['topright', 'leftTop'],
  ['bottomleft', 'rightBottom'],
  ['bottomcenter', 'top'],
  ['bottomright', 'leftBottom'],
  ['leftcenter', 'right'],
  ['rightcenter', 'left'],
  [undefined, 'rightBottom'],
]);

// 图标
export const MapViewSettingControlSvg = () => (
  <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentcolor">
    <path d="M874.0864 657.8176c-55.7056 0-103.76533333 36.59093333-114.688 87.38133333H423.5264c3.82293333-32.768 0-65.536-10.92266667-91.20426666-10.92266667-25.66826667-29.4912-47.5136-55.7056-65.536l225.55306667-222.27626667c14.7456 7.09973333 29.4912 7.09973333 44.2368 7.09973333 66.62826667 0 121.78773333-54.61333333 121.78773333-120.14933333 3.82293333-65.536-51.88266667-120.14933333-118.51093333-120.14933333s-121.78773333 54.61333333-121.78773333 120.14933333c0 14.7456 3.82293333 32.768 7.64586666 43.69066667L260.77866667 544.768l-214.6304 211.3536c-10.92266667 14.7456-14.7456 25.66826667-14.7456 36.59093333 0 7.09973333 0 10.92266667 3.82293333 18.0224 7.64586667 18.0224 25.66826667 28.94506667 44.2368 28.94506667h698.50453333c22.39146667 28.94506667 55.7056 50.7904 96.11946667 50.7904 66.62826667 0 118.51093333-50.7904 118.51093333-116.3264s-51.88266667-116.3264-118.51093333-116.3264z m-606.208-14.7456c18.56853333 10.92266667 29.4912 25.66826667 33.31413333 39.86773333 7.64586667 14.7456 10.92266667 32.768 7.64586667 50.7904H175.58186667L267.8784 643.072z" />
  </svg>
);

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
  <svg viewBox="0 0 1024 1024" width="30" height="30" style={{ fill: 'currentcolor' }}>
    <path d="M262.187 657.726l304.608-343.937 23.956 21.216-304.61 343.937z" />
    <path d="M274.2 652.32h475.45v32H274.2z" />
    <path d="M749.65 668.32m-56.37 0a56.37 56.37 0 1 0 112.74 0 56.37 56.37 0 1 0-112.74 0Z" />
    <path d="M579.5 323.54m-56.37 0a56.37 56.37 0 1 0 112.74 0 56.37 56.37 0 1 0-112.74 0Z" />
    <path d="M274.21 668.32m-56.37 0a56.37 56.37 0 1 0 112.74 0 56.37 56.37 0 1 0-112.74 0Z" />
    <path d="M516.43 673.66c-2.17-69.97-30.28-136.37-79.1-186.99l23.03-22.22c54.35 56.34 85.63 130.28 88.07 208.2l-32 1.01z" />
  </svg>
);

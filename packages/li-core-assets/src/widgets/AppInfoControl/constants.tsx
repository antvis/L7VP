import type { TooltipPlacement } from 'antd/es/tooltip';

export const CLS_PREFIX = 'li-core-assets-app-info-control';

export const POPOVER_PLACEMENT_LEGEND = new Map<string | undefined, TooltipPlacement>([
  ['topleft', 'rightTop'],
  ['lefttop', 'rightTop'],
  ['topright', 'leftTop'],
  ['righttop', 'leftTop'],
  ['bottomleft', 'rightBottom'],
  ['leftbottom', 'rightBottom'],
  ['bottomright', 'leftBottom'],
  ['rightbottom', 'leftBottom'],
  [undefined, 'rightTop'],
]);

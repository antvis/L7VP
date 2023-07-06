import type { Feature } from '@turf/turf';
import type { TooltipPlacement } from 'antd/es/tooltip';
import React from 'react';

export const CLS_PREFIX = 'li-analysis-draw-control';

export const DrawSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M171.240049 718.68079l137.569214 137.58343 56.835973-56.835974-137.583429-137.583429 74.86199-74.86199 136.275548 136.275548 56.835973-56.835974-136.275548-136.275548 73.411948-73.397731 188.44864 188.44864 56.835973-56.835973-188.44864-188.44864 74.193833-74.193834 135.792201 135.777985 56.835973-56.835974-135.7922-135.777984 72.075634-72.075634L874.453721 378.148297l56.835974-56.835973L749.949105 139.971734l83.135761-83.135761L776.248893 0 7.925477 768.323416l56.835973 56.835974 106.478599-106.4786zM860.138107 868.063584v35.11377H163.861893v-35.11377H7.925477v155.936416h155.936416V988.872013h696.276214v35.127987h155.936416V868.063584H860.138107z" />
  </svg>
);

export const PolygonSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M754.176 894.976H270.336c-13.824 0-26.112-8.704-30.208-22.016L90.624 412.672c-4.096-13.312 0.512-27.648 11.776-35.84l391.168-284.16c11.264-8.192 26.624-8.192 37.376 0l391.168 284.16c11.264 8.192 15.872 22.528 11.776 35.84l-149.504 460.288c-4.096 13.312-16.384 22.016-30.208 22.016z m-460.8-64h437.248l135.168-415.744L512 158.208 158.208 415.232l135.168 415.744z" />
  </svg>
);

export const LineStringSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M901.12 256c45.24032 0 81.92 35.7376 81.92 79.8208s-36.67968 79.8208-81.92 79.8208c-3.75808 0-7.45472-0.24576-11.06944-0.7168L685.89568 695.9104A77.8752 77.8752 0 0 1 696.32 734.9248c0 44.07296-36.67968 79.81056-81.92 79.81056s-81.92-35.7376-81.92-79.8208c0-16.896 5.39648-32.58368 14.592-45.48608L346.60352 413.50144A84.21376 84.21376 0 0 1 327.68 415.6416a83.4048 83.4048 0 0 1-34.9184-7.59808L150.4256 611.328A77.99808 77.99808 0 0 1 163.84 655.09376c0 44.0832-36.67968 79.8208-81.92 79.8208s-81.92-35.7376-81.92-79.8208 36.67968-79.8208 81.92-79.8208c11.6736 0 22.77376 2.38592 32.8192 6.66624L257.8432 377.56928A77.93664 77.93664 0 0 1 245.76 335.8208C245.76 291.7376 282.43968 256 327.68 256s81.92 35.7376 81.92 79.8208a78.47936 78.47936 0 0 1-22.53824 54.9888L583.3728 661.01248A83.5584 83.5584 0 0 1 614.4 655.09376c13.59872 0 26.4192 3.23584 37.70368 8.93952l194.9184-268.27776C829.952 381.1328 819.2 359.70048 819.2 335.8208 819.2 291.7376 855.87968 256 901.12 256z" />
  </svg>
);

export const DeleteSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M228 385v488.782c0 29.34 24.03 53.218 53.784 53.218h460.432C771.97 927 796 903.123 796 873.782V385H228z m640 0v488.782C868 942.99 811.634 999 742.216 999H281.784C212.366 999 156 942.99 156 873.782V385H87c-19.882 0-36-16.118-36-36v-33.575c0-38.642 14.962-78.077 41.31-108.02C121.451 174.289 162.222 155 208.593 155h607.143c46.387 0 87.094 19.174 116.128 52.197C958.151 237.096 973 276.53 973 315.425V349c0 19.882-16.118 36-36 36h-69zM352 118.5c-19.882 0-36-16.118-36-36s16.118-36 36-36h320c19.882 0 36 16.118 36 36s-16.118 36-36 36H352z m525.791 136.238C862.17 236.97 841.003 227 815.736 227H208.593c-25.208 0-46.47 10.06-62.23 27.969-14.246 16.19-22.7 37.655-23.326 58.031h777.927c-0.612-20.673-9.003-42.145-23.173-58.262zM336.5 528c0-19.882 16.118-36 36-36s36 16.118 36 36v263c0 19.882-16.118 36-36 36s-36-16.118-36-36V528z m140 0c0-19.882 16.118-36 36-36s36 16.118 36 36v263c0 19.882-16.118 36-36 36s-36-16.118-36-36V528z m140 0c0-19.882 16.118-36 36-36s36 16.118 36 36v263c0 19.882-16.118 36-36 36s-36-16.118-36-36V528z" />
  </svg>
);

export const RemoveSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M563.8 512l262.5-312.9c4.4-5.2 0.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9c-4.4 5.2-0.7 13.1 6.1 13.1h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
  </svg>
);

/**
 * 根据id判断两个feature是否为同一feature
 * @param feature1
 * @param feature2
 */
export const isSameFeature = (feature1?: Feature | null, feature2?: Feature | null) => {
  return !!(feature1 && feature2 && feature1.properties?.id === feature2.properties?.id);
};

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

export const DRAW_COMMON_Z_INDEX = 100;

export const drawControl = [
  {
    isActive: false,
    icon: LineStringSvg,
    title: '测距',
    drawType: 'line',
  },
  {
    isActive: false,
    icon: PolygonSvg,
    title: '测面积',
    drawType: 'polygon',
  },
];

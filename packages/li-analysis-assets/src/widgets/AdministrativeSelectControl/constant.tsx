import type { TooltipPlacement } from 'antd/es/tooltip';
import React from 'react';

export const CLS_PREFIX = 'li-administrative-select';

// 城市列表
export const CityUrl = 'https://npm.elemecdn.com/static-geo-atlas@latest/geo-data/administrative-data/area-tree.json';

// 边界数据
export const BoundsUrl = 'https://unpkg.com/static-geo-atlas@latest/geo-data/choropleth-data/';

export const POPOVER_PLACEMENT_LEGEND = new Map<string | undefined, TooltipPlacement>([
  ['topleft', 'bottomLeft'],
  ['lefttop', 'bottomLeft'],
  ['topright', 'bottomRight'],
  ['righttop', 'bottomRight'],
  ['bottomleft', 'topLeft'],
  ['leftbottom', 'topLeft'],
  ['bottomright', 'topRight'],
  ['rightbottom', 'topRight'],
  [undefined, 'rightTop'],
]);

export const HotCityList = [
  { adcode: '100000', name: '全国', level: 'country' },
  { adcode: '110000', name: '北京', level: 'province' },
  { adcode: '120000', name: '天津', level: 'province' },
  { adcode: '210100', name: '沈阳', level: 'city' },
  { adcode: '210200', name: '大连', level: 'city' },
  { adcode: '310000', name: '上海', level: 'province' },
  { adcode: '320100', name: '南京', level: 'city' },
  { adcode: '320500', name: '苏州', level: 'city' },
  { adcode: '330100', name: '杭州', level: 'city' },
  { adcode: '370200', name: '青岛', level: 'city' },
  { adcode: '410100', name: '郑州', level: 'city' },
  { adcode: '420100', name: '武汉', level: 'city' },
  { adcode: '430100', name: '长沙', level: 'city' },
  { adcode: '440100', name: '广州', level: 'city' },
  { adcode: '440300', name: '深圳', level: 'city' },
  { adcode: '500000', name: '重庆', level: 'province' },
  { adcode: '510100', name: '成都', level: 'city' },
  { adcode: '610100', name: '西安', level: 'city' },
  { adcode: '810000', name: '香港', level: 'province' },
  { adcode: '820000', name: '澳门', level: 'province' },
];

export const ICON = () => {
  return (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
      <path d="M575.94 117.68c0 268.54 262.48 512.32 277.06 511.5 15.64-6.11 70.76-56 127.87-134.41v432.79a85 85 0 0 1-62.63 81.82L352.33 613 530.22 32.43h59.21a276.71 276.71 0 0 0-13.49 85.25zM0.5 366.4V117.68a85.25 85.25 0 0 1 85.25-85.25H395.8l-154.13 503z m94.88 646.41h-9.63A85.25 85.25 0 0 1 0.5 927.56V521.62L202.73 662.5z m610.18 0H229.78l83.72-273.14zM853 501.31c-19.33 0-170.5-159-170.5-319.69a170.5 170.5 0 0 1 341 0c0 155.69-147.85 319.69-170.5 319.69z m0-383.63a85.25 85.25 0 1 0 85.25 85.25A85.25 85.25 0 0 0 853 117.68z" />
    </svg>
  );
};

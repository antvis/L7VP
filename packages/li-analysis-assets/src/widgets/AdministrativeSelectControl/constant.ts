import type { TooltipPlacement } from 'antd/es/tooltip';

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

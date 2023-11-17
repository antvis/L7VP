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
  { adcode: '100000', shortName: '全国', name: '全国', level: 'country' },
  { adcode: '110000', shortName: '北京', name: '北京市', level: 'province' },
  { adcode: '120000', shortName: '天津', name: '天津市', level: 'province' },
  { adcode: '210100', shortName: '沈阳', name: '沈阳市', level: 'city' },
  { adcode: '210200', shortName: '大连', name: '大连市', level: 'city' },
  { adcode: '310000', shortName: '上海', name: '上海市', level: 'province' },
  { adcode: '320100', shortName: '南京', name: '南京市', level: 'city' },
  { adcode: '320500', shortName: '苏州', name: '苏州市', level: 'city' },
  { adcode: '330100', shortName: '杭州', name: '杭州市', level: 'city' },
  { adcode: '370200', shortName: '青岛', name: '青岛市', level: 'city' },
  { adcode: '410100', shortName: '郑州', name: '郑州市', level: 'city' },
  { adcode: '420100', shortName: '武汉', name: '武汉市', level: 'city' },
  { adcode: '430100', shortName: '长沙', name: '长沙市', level: 'city' },
  { adcode: '440100', shortName: '广州', name: '广州市', level: 'city' },
  { adcode: '440300', shortName: '深圳', name: '深圳市', level: 'city' },
  { adcode: '500000', shortName: '重庆', name: '重庆市', level: 'province' },
  { adcode: '510100', shortName: '成都', name: '成都市', level: 'city' },
  { adcode: '610100', shortName: '西安', name: '西安市', level: 'city' },
  { adcode: '810000', shortName: '香港', name: '香港特别行政区', level: 'province' },
  { adcode: '820000', shortName: '澳门', name: '澳门特别行政区', level: 'province' },
];

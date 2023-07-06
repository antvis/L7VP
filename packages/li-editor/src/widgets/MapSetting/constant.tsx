import React from 'react';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-map-setting';

export const BaseMapSvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="currentColor"
  >
    <path d="M889.18 180.37l-224-66.81a24 24 0 0 0-12.85-0.26L396.32 179l-245.51-53.23A32 32 0 0 0 112 157v666.2a32 32 0 0 0 25 31.22l255.27 57.33a24 24 0 0 0 11.17-0.15l253.89-64.24L870.68 912A32 32 0 0 0 912 881.4V211a32 32 0 0 0-22.82-30.63zM840 827.41l-180.93-54.77L433 829.84V516a36 36 0 0 0-72 0v314.94l-177-39.73V206.68L397.68 253 622 195.41V512a36 36 0 0 0 72 0V197.3l146 43.5z" />
  </svg>
);

export const GaodeMapStyleConfig = [
  {
    text: '标准',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*-nqiT6Vu948AAAAAAAAAAAAAARQnAQ',
    type: 'normal',
  },
  {
    text: '月光银',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*J_wYQL_PaUEAAAAAAAAAAAAAARQnAQ',
    type: 'light',
  },
  {
    text: '幻影黑',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*U7M9QI1yat4AAAAAAAAAAAAAARQnAQ',
    type: 'dark',
  },
  {
    text: '草色青',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*T-oBT4hB5ucAAAAAAAAAAAAAARQnAQ',
    type: 'fresh',
  },
  {
    text: '雅士灰',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*OREXQ4vgQRIAAAAAAAAAAAAAARQnAQ',
    type: 'grey',
  },
  {
    text: '涂鸦',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*4UApTKmeiy4AAAAAAAAAAAAAARQnAQ',
    type: 'graffiti',
  },
  {
    text: '马卡龙',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*0GrCQLtDjNcAAAAAAAAAAAAAARQnAQ',
    type: 'macaron',
  },
  {
    text: '极夜蓝',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*uWxqSZQlPkkAAAAAAAAAAAAAARQnAQ',
    type: 'darkblue',
  },
  {
    text: '酱籽',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*OFPrTbg3an0AAAAAAAAAAAAAARQnAQ',
    type: 'wine',
  },
];

export const MapboxStyleConfig = [
  {
    text: '街道',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*AnfJTbIBJOkAAAAAAAAAAAAAARQnAQ',
    type: 'normal',
  },
  {
    text: '浅色',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*gnuiQIok9qIAAAAAAAAAAAAAARQnAQ',
    type: 'light',
  },
  {
    text: '深色',
    img: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*NwG-TbOlBH0AAAAAAAAAAAAAARQnAQ',
    type: 'dark',
  },
];

/**
 * https://lbs.amap.com/api/javascript-api/guide/abc/prepare
 */
// @ts-ignore
window._AMapSecurityConfig = {
  securityJsCode: '8803c38931b6fddc9bbfeee69df8824d',
};
// 可用域名白名单
// locationinsight.antv.antgroup.com
// li.antv.antgroup.com
// *.antgroup-inc.cn
// *.antgroup-inc.com
// *.antfin-inc.com
// *.alipay.net
export const AMAP_KEY = 'f0230f884bbd54e2913c890cdf45aa7e';
export const MAPBOX_TOKEN =
  'pk.eyJ1IjoibGl1dmlnb25nenVvc2hpIiwiYSI6ImNsYWx2dHlxOTA5NGYzeW9icGd6aDE2NnoifQ.T3wEAOe8HReAyoeu6d6HJw';

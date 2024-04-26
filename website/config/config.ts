import { defineConfig } from 'umi';
import { AnalyticsScripts } from './analytics';
import { getAssetDepExternal } from './external';
import routes from './routes';

export default defineConfig({
  title: 'L7VP',
  metas: [
    {
      name: 'keywords',
      content:
        'L7VP, LocationInsight, L7, Location, 地理, 地图, 地理可视化, 可视化, 可视分析, 地理可视分析, 地图研发, 地图应用，可视分析工具',
    },
    {
      name: 'description',
      content: 'L7VP is an geospatial intelligent visualization analysis tools and development platform.',
    },
    { 'http-equiv': 'Content-Security-Policy', content: 'upgrade-insecure-requests' },
  ],
  history: {
    type: 'hash',
  },
  routes,
  // 增量发布和避免浏览器加载缓存
  hash: true,
  mfsu: false,
  // jsMinifier 默认为 esbuild，esbuild minify 污染全局变量 L7 问题
  esbuildMinifyIIFE: true,
  ...getAssetDepExternal(),
  scripts: AnalyticsScripts,
  favicons: ['https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WCVLT5Dp5oYAAAAAAAAAAAAADmJ7AQ/original'],
});

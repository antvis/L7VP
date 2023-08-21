import { defineConfig } from 'dumi';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  title: 'LI Editor',
  favicon: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  logo: 'https://gw.alipayobjects.com/zos/antfincdn/FLrTNDvlna/antv.png',
  mode: 'site',
  base: '/',
  publicPath: '/',
  outputPath: 'docs-dist',
  metas: [],
  locales: [['zh-CN', '中文']],
  themeConfig: {
    carrier: 'LI Editor',
  },
  hash: true,
  devtool: isProduction ? false : 'eval',
  externals: {
    react: 'window.React',
    'react-dom': 'window.ReactDOM',
    // antd: 'window.antd',
    lodash: '_',
    'lodash-es': '_',
    // 'mapbox-gl': 'window.mapboxgl',
    '@turf/turf': 'window.turf',
  },
  styles: [
    // 'https://gw.alipayobjects.com/os/lib/antd/5.3.2/dist/reset.css'
  ],
  scripts: [
    'https://gw.alipayobjects.com/os/lib/react/17.0.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/17.0.1/umd/react-dom.development.js',
    // 'https://gw.alipayobjects.com/os/lib/antd/5.3.2/dist/antd.js',
    /** lodash */
    'https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js',
    /** turf */
    'https://gw.alipayobjects.com/os/lib/turf/turf/6.5.0/turf.min.js',
    /** mapbox */
    // 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.2/mapbox-gl.js',
  ],
  chainWebpack: (memo) => {
    // for @monaco-editor/react
    memo.module
      .rule('mjs$')
      .test(/\.mjs$/)
      .include.add(/node_modules/)
      .end()
      .type('javascript/auto');
  },
});

import { defineConfig } from 'umi';

export default defineConfig({
  mfsu: false,
  history: {
    type: 'hash',
  },
  esbuildMinifyIIFE: true,
  codeSplitting: { jsStrategy: 'granularChunks' },
  routes: [
    { path: '/', component: 'Project' },
    { path: '/builder/:id', component: 'Builder' },
    { path: '/app/:id', component: 'App' },
  ],
  externals: {
    lodash: '_',
    'lodash-es': '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    dayjs: 'dayjs',
    antd: 'antd',
    '@ant-design/icons': 'icons',
    '@turf/turf': 'turf',
    '@antv/l7': 'L7',
  },
  headScripts: [
    'https://unpkg.com/lodash@4.x/lodash.min.js',
    'https://unpkg.com/react@18.x/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.x/umd/react-dom.production.min.js',

    'https://unpkg.com/dayjs@1.x/dayjs.min.js',
    'https://unpkg.com/antd@5.9.2/dist/antd.min.js',
    'https://unpkg.com/@ant-design/icons@5.x/dist/index.umd.min.js',

    'https://unpkg.com/turf@3.x/turf.min.js',
    'https://unpkg.com/mapbox-gl@1.13.3/dist/mapbox-gl.js',
    'https://unpkg.com/@antv/l7@2.x/dist/l7.js',
  ],
});

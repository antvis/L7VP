import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash',
  },
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
    'https://unpkg.com/lodash@4.17.21/lodash.min.js',
    'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    'https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js',

    'https://unpkg.com/dayjs@1.x/dayjs.min.js',
    'https://unpkg.com/antd@5.x/dist/antd.min.js',
    'https://unpkg.com/@ant-design/icons@5.x/dist/index.umd.min.js',

    'https://unpkg.com/turf@3.0.14/turf.min.js',
    'https://unpkg.com/mapbox-gl@1.13.3/dist/mapbox-gl.js',
    'https://unpkg.com/@antv/l7@2.x/dist/l7.js',
  ],
});

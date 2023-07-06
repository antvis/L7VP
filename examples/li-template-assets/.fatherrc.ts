import { defineConfig } from 'father';

export default defineConfig({
  esm: { output: 'es' },
  cjs: { output: 'lib' },
  // https://github.com/umijs/father/blob/master/docs/config.md#umd
  umd: {
    name: 'LITemplateAssets',
    output: 'dist',
    extractCSS: false,
    postcssOptions: {},
    externals: {
      'lodash-es': '_',
      react: 'React',
      'react-dom': 'ReactDOM',
      antd: 'antd',
      '@ant-design/icons': 'icons',
      '@turf/turf': 'turf',
      '@antv/l7': 'L7',
      '@antv/l7-draw': {
        root: ['L7', 'Draw'],
        commonjs2: '@antv/l7-draw',
        commonjs: '@antv/l7-draw',
      },
      '@antv/larkmap': 'LarkMap',
      '@antv/li-sdk': 'LISDK',
    },
    chainWebpack(memo) {
      memo
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
          { analyzerMode: 'static', openAnalyzer: false },
        ]);
      return memo;
    },
  },
});

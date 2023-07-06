import type { IFatherConfig } from 'father/dist/types';

// https://github.com/umijs/father/blob/master/docs/config.md#umd
export const getUMDConfig = (name: string) => {
  const umd: IFatherConfig['umd'] = {
    name: name,
    output: 'dist/umd',
    extractCSS: false,
    postcssOptions: {},
    externals: [
      {
        'lodash-es': '_',
        react: 'React',
        'react-dom': 'ReactDOM',
        antd: 'antd',
        '@ant-design/icons': 'icons',
        '@turf/turf': 'turf',
        '@antv/l7': 'L7',
        '@antv/l7-draw': { root: ['L7', 'Draw'], commonjs2: '@antv/l7-draw', commonjs: '@antv/l7-draw' },
        '@antv/larkmap': 'LarkMap',
        '@antv/li-sdk': 'LISDK',
      },
      // covers and import like 'lodash-es/get' for react-color dependency
      function (data, callback) {
        if (data.request?.startsWith('lodash-es/')) {
          return callback(undefined, {
            root: ['_', data.request?.split('/')[1]],
            commonjs: data.request,
            commonjs2: data.request,
            amd: '_.' + data.request?.split('/')[1],
          });
        }
        callback();
      },
    ],
    chainWebpack(memo) {
      // 是否开启压缩
      // memo.optimization.minimize(false);

      // 打包体积分析
      memo
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
          { analyzerMode: 'static', openAnalyzer: false },
        ]);

      // worker-loader
      // memo.module
      //   .rule('worker')
      //   .test(/\.worker\.ts$/)
      //   .use('worker-loader')
      //   .tap((options) =>
      //     Object.assign(options || {}, {
      //       esModule: true,
      //       inline: 'fallback',
      //     }),
      //   );

      return memo;
    },
  };

  return umd;
};

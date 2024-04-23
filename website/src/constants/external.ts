import { version as L7DrawVersion } from '@antv/l7-draw/package.json';
import { version as L7Version } from '@antv/l7/package.json';
import { version as LarkMapVersion } from '@antv/larkmap/package.json';
import { version as LISDKVersion } from '@antv/li-sdk/package.json';
// import { version as FormilyAntdVersion } from '@formily/antd-v5/package.json';
// import { version as FormilyVersion } from '@formily/core/package.json';

export const EXTERNAL_RESOURCES = new Map<string, { globals: string | string[]; js: string[]; css?: string[] }>([
  ['lodash', { globals: '_', js: ['https://gw.alipayobjects.com/os/lib/lodash/4.17.20/lodash.min.js'] }],
  [
    'react',
    {
      globals: ['React', 'ReactDOM'],
      js: [
        'https://gw.alipayobjects.com/os/lib/react/18.2.0/umd/react.production.min.js',
        'https://gw.alipayobjects.com/os/lib/react-dom/18.2.0/umd/react-dom.production.min.js',
      ],
    },
  ],
  [
    'antd',
    {
      globals: ['dayjs', 'antd', 'icons'],
      js: [
        'https://gw.alipayobjects.com/os/lib/dayjs/1.11.10/dayjs.min.js',
        'https://gw.alipayobjects.com/os/lib/antd/5.9.2/dist/antd.min.js',
        'https://gw.alipayobjects.com/os/lib/ant-design/icons/5.2.5/dist/index.umd.min.js',
      ],
      css: ['https://gw.alipayobjects.com/os/lib/antd/5.9.2/dist/reset.css'],
    },
  ],
  [
    'formily',
    {
      globals: ['Formily'],
      js: [
        `https://gw.alipayobjects.com/os/lib/formily/reactive/2.2.29/dist/formily.reactive.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/path/2.2.29/dist/formily.path.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/shared/2.2.29/dist/formily.shared.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/validator/2.2.29/dist/formily.validator.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/core/2.2.29/dist/formily.core.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/json-schema/2.2.29/dist/formily.json-schema.umd.production.js`,
        'https://gw.alipayobjects.com/os/lib/react-is/17.0.2/umd/react-is.production.min.js',
        `https://gw.alipayobjects.com/os/lib/formily/reactive-react/2.2.29/dist/formily.reactive-react.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/react/2.2.29/dist/formily.react.umd.production.js`,
        `https://gw.alipayobjects.com/os/lib/formily/antd-v5/1.1.2/dist/formily.antd-v5.umd.production.js`,
      ],
    },
  ],
  [
    'turf',
    {
      globals: 'turf',
      js: ['https://gw.alipayobjects.com/os/lib/turf/turf/6.5.0/turf.min.js'],
    },
  ],
  [
    'L7',
    {
      globals: 'L7',
      js: [
        // 'https://api.tiles.mapbox.com/mapbox-gl-js/v1.13.3/mapbox-gl.js',
        'https://gw.alipayobjects.com/os/lib/mapbox-gl/1.13.3/dist/mapbox-gl.js',
        `https://gw.alipayobjects.com/os/lib/antv/l7/${L7Version}/dist/l7.js`,
        `https://gw.alipayobjects.com/os/lib/antv/l7-draw/${L7DrawVersion}/dist/l7-draw.min.js`,
      ],
    },
  ],

  [
    'LarkMap',
    {
      globals: 'LarkMap',
      js: [`https://gw.alipayobjects.com/os/lib/antv/larkmap/${LarkMapVersion}/dist/larkmap.min.js`],
      css: [`https://gw.alipayobjects.com/os/lib/antv/larkmap/${LarkMapVersion}/dist/larkmap.min.css`],
    },
  ],
  [
    'LISDK',
    {
      globals: 'LISDK',
      js: [`https://gw.alipayobjects.com/os/lib/antv/li-sdk/${LISDKVersion}/dist/umd/li-sdk.min.js`],
    },
  ],
]);

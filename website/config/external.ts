import { isProduction } from './env';
const { EXTERNAL_RESOURCES } = require('../src/constants/external');

const externals = {
  lodash: '_',
  'lodash-es': '_',
  react: 'React',
  'react-dom': 'ReactDOM',
  dayjs: 'dayjs',
  antd: 'antd',
  '@ant-design/icons': 'icons',
  '@formily/reactive': ['root Formily', 'Reactive'],
  '@formily/shared': ['root Formily', 'Shared'],
  '@formily/core': ['root Formily', 'Core'],
  '@formily/react': ['root Formily', 'React'],
  '@formily/antd-v5': ['root Formily', 'AntdV5'],
  '@turf/turf': 'turf',
  '@antv/l7': 'L7',
  '@antv/l7-draw': 'L7.Draw',
  '@antv/larkmap': 'LarkMap',
  ...(isProduction
    ? {
        '@antv/li-sdk': 'LISDK',
      }
    : {}),
};

const styles: string[] = [
  // /** antd */
  ...EXTERNAL_RESOURCES.get('antd')!.css!,
  /** LarkMap */
  ...EXTERNAL_RESOURCES.get('LarkMap')!.css!,
];

const scripts = [
  /** lodash */
  ...EXTERNAL_RESOURCES.get('lodash')!.js,
  /** react */
  ...EXTERNAL_RESOURCES.get('react')!.js,
  /** antd */
  ...EXTERNAL_RESOURCES.get('antd')!.js,
  /** formily */
  ...EXTERNAL_RESOURCES.get('formily')!.js,
  /** turf */
  ...EXTERNAL_RESOURCES.get('turf')!.js,
  /** L7 library */
  ...EXTERNAL_RESOURCES.get('L7')!.js,
  /** LarkMap */
  ...EXTERNAL_RESOURCES.get('LarkMap')!.js,
  /** LI SDK */
  isProduction && EXTERNAL_RESOURCES.get('LISDK')!.js[0],
].filter(Boolean);

const headScripts = scripts;

export const getAssetDepExternal = () => ({ externals, styles, headScripts });

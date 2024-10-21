import * as LIAnalysisAssets from '@antv/li-analysis-assets';
import { version as LIAnalysisAssetsVersion } from '@antv/li-analysis-assets/package.json';
import * as LICoreAssets from '@antv/li-core-assets';
import { version as LICoreAssetsVersion } from '@antv/li-core-assets/package.json';
import * as LISDK from '@antv/li-sdk';
import dayjs from 'dayjs';
import { isDevelopment } from './env';
import type { AssetPackage } from '@/services';

// 开放环境下，将 LI SDK、CoreAssets、AnalysisAssets 挂载到 window 上，与生产环境统一，方便调试
// 生产环境下，会 tree shaking 掉以下代码
if (process.env.NODE_ENV === 'development') {
  (window as any).LISDK = LISDK;
  (window as any).LIAnalysisAssets = LIAnalysisAssets;
}

//  TODO: 先内敛打包，不动态加载内置资产
(window as any).LICoreAssets = LICoreAssets;

export const CORE_ASSETS_ID = '@antv/li-core-assets';
export const ANALYSIS_ASSETS_ID = '@antv/li-analysis-assets';

export const DefaultAssetPackageIds = [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID];

// 平台内置资产包
export const BUILTIN_ASSET_PACKAGES: AssetPackage[] = [
  {
    assetId: CORE_ASSETS_ID,
    creatTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    name: '可视化核心资产',
    description: '官方可视化核心资产, 包含 L7VP 核心可视化图层、组件、服务',
    package: CORE_ASSETS_ID,
    // latest
    version: LICoreAssetsVersion,
    global: 'LICoreAssets',
    // latest 0.x
    urls: [
      `https://registry.npmmirror.com/@antv/li-core-assets/${LICoreAssetsVersion}/files/dist/umd/li-core-assets.min.js`,
    ],
    //TODO: 考虑到资产包加载速度，不动态加载内置资产
    enable: false,
  },
  {
    assetId: ANALYSIS_ASSETS_ID,
    creatTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    name: '分析场景资产包',
    description: '官方分析场景资产包，用于数据可视分析场景，包含分析图层、组件等',
    package: ANALYSIS_ASSETS_ID,
    version: LIAnalysisAssetsVersion,
    global: 'LIAnalysisAssets',
    urls: [
      `https://registry.npmmirror.com/@antv/li-analysis-assets/${LIAnalysisAssetsVersion}/files/dist/umd/li-analysis-assets.min.js`,
    ],
    enable: !isDevelopment,
  },
  {
    assetId: '@antv/li-sam-assets',
    creatTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    name: '遥感图像分割资产包',
    description: 'SAM 遥感图像分割资产包',
    package: '@antv/li-sam-assets',
    version: '0.1.3',
    global: 'SAMAssets',
    urls: [`https://registry.npmmirror.com/@antv/li-sam-assets/0.1.3/files/dist/li-sam-assets.min.js`],
  },
  {
    assetId: '@lvisei/li-zelda-assets',
    creatTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    name: '塞尔达应用资产包',
    description: '塞尔达：王国之泪应用资产包',
    package: '@lvisei/li-zelda-assets',
    version: 'latest',
    global: 'LIZeldaAssets',
    urls: ['https://unpkg.com/@lvisei/li-zelda-assets@0.x/dist/li-zelda-assets.min.js'],
  },
];

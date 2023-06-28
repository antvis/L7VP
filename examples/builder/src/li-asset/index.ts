import type { AssetPackage } from '@antv/li-sdk';
import { services } from './services';
import { DataseInfor } from './widgets';

const MY_ASSET: AssetPackage = {
  version: 'v0.0.1',
  layers: [],
  widgets: [DataseInfor],
  services: services,
};

export default MY_ASSET;

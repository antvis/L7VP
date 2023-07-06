import type { AssetPackage } from '@antv/li-sdk';
import * as Widgets from './widgets';

export * from './widgets';

const TemplateAsset: AssetPackage = {
  version: 'v0.1',
  widgets: Object.values(Widgets),
  layers: [],
};

export default TemplateAsset;

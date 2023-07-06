import { LIRuntimeApp } from '@antv/li-sdk';
import React from 'react';
import config from '../../CustomAssets/demo/config';
import CustomAssets from '../../CustomAssets/demo/CustomAssets';

const runtime = new LIRuntimeApp();
const { App, registryManager } = runtime;

registryManager.installAsset(CustomAssets);

export default () => {
  return <App style={{ height: '70vh' }} config={config} />;
};

import CoreAssets from '@antv/li-core-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import React from 'react';
import config from './config';
import CustomAssets from './CustomAssets';

const assets = [CoreAssets, CustomAssets];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <LocationInsightEditor
      defaultApplication={config}
      assets={assets}
      onChange={handleUpdate}
      style={{ height: '100vh' }}
    />
  );
};

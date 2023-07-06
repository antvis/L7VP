import TemplateAsset from '@antv/li-template-assets';
import CoreAssets from '@antv/li-core-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import React from 'react';
import config from './config';

const assets = [CoreAssets, TemplateAsset];

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

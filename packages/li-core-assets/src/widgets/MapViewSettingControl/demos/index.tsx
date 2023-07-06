import CoreAssets from '@antv/li-core-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import React from 'react';
import config from './config';

const assets = [CoreAssets];

export default () => {
  return <LocationInsightEditor style={{ height: '100vh' }} defaultApplication={config} assets={assets} />;
};

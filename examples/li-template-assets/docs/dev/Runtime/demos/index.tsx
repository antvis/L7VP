import TemplateAsset from '@antv/li-template-assets';
import CoreAssets from '@antv/li-core-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import config from './config';

const assets = [CoreAssets, TemplateAsset];

export default () => {
  return <LocationInsightApp style={{ height: '70vh' }} config={config} assets={assets} />;
};

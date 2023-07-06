import CoreAssets from '@antv/li-core-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import config from './config';
import CustomAssets from './CustomAssets';

const assets = [CoreAssets, CustomAssets];

export default () => {
  return <LocationInsightApp style={{ height: '70vh' }} config={config} assets={assets} />;
};

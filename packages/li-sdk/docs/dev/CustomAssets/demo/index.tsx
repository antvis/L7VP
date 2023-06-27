import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import config from './config';
import CustomAssets from './CustomAssets';

const assets = [CustomAssets];

export default () => {
  return <LocationInsightApp style={{ height: '70vh' }} config={config} assets={assets} />;
};

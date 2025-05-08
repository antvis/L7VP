import AnalysisAssets from '@antv/li-analysis-assets';
import CoreAssets from '@antv/li-core-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import config from './config';

const assets = [AnalysisAssets, CoreAssets];

export default () => {
  return <LocationInsightApp style={{ height: '70vh' }} config={config} assets={assets} />;
};

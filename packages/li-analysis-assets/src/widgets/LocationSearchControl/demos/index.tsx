import AnalysisAssets from '@antv/li-analysis-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import config from './config';

const assets = [AnalysisAssets];

export default () => {
  return <LocationInsightApp style={{ height: '50vh' }} config={config} assets={assets} />;
};

import TemplateAsset from '@antv/li-template-assets';
import CoreAssets from '@antv/li-core-assets';
import { LocationInsightApp } from '@antv/li-sdk';
import React from 'react';
import { LI_APPLICATION_CONFIG } from './constants';

const assets = [TemplateAsset, CoreAssets];

const Default: React.FC = () => {
  return (
    <LocationInsightApp style={{ height: 500 }} assets={assets} config={LI_APPLICATION_CONFIG} />
  );
};

export default Default;

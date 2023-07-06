# LI-SDK

> SDK for Location Insight App

## Usage

```jsx | pure
import React from 'react';
import { LocationInsightApp } from '@antv/li-sdk';
import config from './config';
import CustomAssets from './CustomAssets';

const assets = [CustomAssets];

export default () => {
  return <LocationInsightApp style={{ height: '100vh' }} config={config} assets={assets} />;
};
```

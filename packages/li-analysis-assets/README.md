# LI Analysis Assets

> Assets for Location Insight App

## Usage

```jsx | pure
import React from 'react';
import CoreAssets from '@antv/li-core-assets';
import AnalysisAssets from '@antv/li-analysis-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import defaultApplication from './application';

const assets = [CoreAssets, AnalysisAssets];

export default () => {
  return (
    <LocationInsightEditor
      style={{ height: '100vh' }}
      defaultApplication={defaultApplication}
      assets={assets}
      onChange={(app) => {}}
    />
  );
};
```

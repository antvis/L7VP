# LI Editor

> Editor for Location Insight App

## Usage

```jsx | pure
import { LocationInsightEditor } from '@antv/li-editor';
import React from 'react';
import CustomAssets from './CustomAssets';
import defaultApplication from './application';

const assets = [CustomAssets];

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

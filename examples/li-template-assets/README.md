# LI Template Assets

> Template Assets for Location Insight App

## Install

```bash
npm i @antv/li-template-assets -S
```

## Usage

```jsx | pure
import React from 'react';
import Assets from '@antv/li-template-assets';
import { LocationInsightEditor } from '@antv/li-editor';
import defaultApplication from './application';

const assets = [Assets];

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

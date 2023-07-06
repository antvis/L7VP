import type { ImplementEditorWidget } from '@antv/li-editor';
import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import React from 'react';
import MyAssets from '../../../common/my-assets';
import defaultApplication from './application';
import CustomAssets from './asset';
import CustomAddDataset from './CustomAddDataset';

const assets = [MyAssets, CustomAssets];

const editorWidgets: ImplementEditorWidget[] = [CustomAddDataset];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <LocationInsightEditor
      defaultApplication={defaultApplication}
      assets={assets}
      editorWidgets={editorWidgets}
      onChange={handleUpdate}
      style={{ height: '100vh' }}
    />
  );
};

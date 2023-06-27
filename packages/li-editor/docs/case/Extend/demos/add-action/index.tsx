import type { ImplementEditorWidget } from '@antv/li-editor';
import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import React from 'react';
import defaultApplication from '../../../../common/application';
import MyAssets from '../../../../common/my-assets';
import Share from './Share';

// 自定义编辑器的控件
const editorWidgets: ImplementEditorWidget[] = [Share];
// 资产
const assets = [MyAssets];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <LocationInsightEditor
      defaultApplication={defaultApplication}
      editorWidgets={editorWidgets}
      assets={assets}
      onChange={handleUpdate}
      style={{ height: '100vh' }}
    />
  );
};

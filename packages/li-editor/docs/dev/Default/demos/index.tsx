import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import React from 'react';
import MyAssets from '../../../common/my-assets';
import defaultApplication from './application';
// import 'antd/dist/antd.less';
// import 'antd/dist/antd.dark.less';

const assets = [MyAssets];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <LocationInsightEditor
      defaultApplication={defaultApplication}
      assets={assets}
      onChange={handleUpdate}
      style={{ height: '100vh' }}
    />
  );
};

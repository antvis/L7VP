import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import { Layout } from 'antd';
import React from 'react';
import defaultApplication from '../../../common/application';
import MyAssets from '../../../common/my-assets';

const assets = [MyAssets];

export default () => {
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '31px', background: 'rgba(255, 255, 255, 0.3)' }} />
      </Layout.Header>
      <Layout.Content>
        <LocationInsightEditor
          defaultApplication={defaultApplication}
          assets={assets}
          onChange={handleUpdate}
          style={{ height: '100%' }}
        />
      </Layout.Content>
    </Layout>
  );
};

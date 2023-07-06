import { LIEditor } from '@antv/li-editor';
import { Button, Layout } from 'antd';
import React, { useMemo } from 'react';
import defaultApplication from '../../../common/application';
import MyAssets from '../../../common/my-assets';

const assets = [MyAssets];

export default () => {
  const liEditor = useMemo(() => new LIEditor({ assets }), []);
  const { Editor: EditorApp } = liEditor;

  const handlleSaveApp = () => {
    const app = liEditor.getApplicationConfig();
    console.log('app: ', app);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ width: '120px', height: '31px', background: 'rgba(255, 255, 255, 0.3)' }} />
        <Button type="primary" onClick={handlleSaveApp}>
          保存
        </Button>
      </Layout.Header>
      <Layout.Content>
        <EditorApp style={{ height: '100%' }} defaultApplication={defaultApplication} />
      </Layout.Content>
    </Layout>
  );
};

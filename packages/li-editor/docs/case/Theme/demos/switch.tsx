import { LocationInsightEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import { ConfigProvider, Layout, Segmented } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import type { SegmentedValue } from 'antd/es/segmented';
import 'dayjs/locale/zh-cn';
import React, { useState } from 'react';
import defaultApplication from '../../../common/application';
import MyAssets from '../../../common/my-assets';
import { ANTD_DARK_THEME, ANTD_DEFAULT_THEME } from './theme';

const assets = [MyAssets];

export default () => {
  const [theme, setTheme] = useState(ANTD_DEFAULT_THEME);

  const onThemeChange = (value: SegmentedValue) => {
    setTheme(value === 'light' ? ANTD_DEFAULT_THEME : ANTD_DARK_THEME);
  };
  const handleUpdate = (app: Application) => {
    console.log('app: ', app);
  };

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <Layout style={{ height: '100vh' }}>
        <Layout.Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ width: '120px', height: '31px', background: 'rgba(255, 255, 255, 0.3)' }} />
          <Segmented
            defaultValue="light"
            options={[
              { label: '亮色', value: 'light' },
              { label: '暗色', value: 'dark' },
            ]}
            onChange={onThemeChange}
          />
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
    </ConfigProvider>
  );
};

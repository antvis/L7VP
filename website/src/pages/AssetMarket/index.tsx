import { GithubOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { AssetPackage } from '@antv/li-sdk';
import { parseAssetPackage } from '@antv/li-sdk';
import { useTitle } from 'ahooks';
import type { TabsProps } from 'antd';
import { Button, Layout, Tabs, theme } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { history } from 'umi';
import AssetPackages from './AssetPackages';
import Components from './Components';
import styles from './index.less';

const { useToken } = theme;

const AssetMarket = () => {
  const { token } = useToken();
  const [tabValue, setTabValue] = useState<'myComponents' | 'myAssetMarks'>('myComponents');
  const pageTitle = 'L7VP ｜ 资产市场';
  useTitle(pageTitle);

  const items: TabsProps['items'] = [
    {
      key: 'myComponents',
      label: `我的组件`,
      children: <Components className={styles['my-components']} />,
    },
    {
      key: 'myAssetMarks',
      label: `我的资产包`,
      children: <AssetPackages className={styles['my-assets-marks']} />,
    },
  ];

  const parseLoadedAsset = (globalName: string) => {
    let asset: AssetPackage | undefined;
    try {
      asset = parseAssetPackage(globalName);
    } catch (err) {
      console.warn(`解析 ${globalName} 失败`);
    }

    return asset;
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header} style={{ color: token.colorText, backgroundColor: token.colorBgLayout }}>
        <div
          className={styles['header-left']}
          onClick={() => {
            history.push('/');
          }}
        >
          <img
            className={styles['logo-img']}
            src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuDWR7uXkbkAAAAAAAAAAAAADmJ7AQ/original"
          />
          <div className={styles.logo}>{pageTitle}</div>
        </div>
        <div>
          <Button
            type="text"
            size="small"
            icon={<QuestionCircleOutlined />}
            onClick={() => {
              window.open(history.createHref(`/docs?path=zqvk302x61qq2kcq`));
            }}
          >
            资产手册
          </Button>
          <a href="https://github.com/antvis/L7VP" target="_blank" rel="noreferrer">
            <Button type="text" size="small" icon={<GithubOutlined />}>
              GitHub
            </Button>
          </a>
        </div>
      </Header>
      <Content style={{ color: token.colorText }} className={styles.content}>
        <Tabs
          activeKey={tabValue}
          items={items}
          destroyInactiveTabPane={true}
          onChange={(key) => {
            setTabValue(key as 'myComponents' | 'myAssetMarks');
          }}
        />
      </Content>
    </Layout>
  );
};

export default AssetMarket;

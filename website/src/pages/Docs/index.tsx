import { GithubOutlined } from '@ant-design/icons';
import { useTitle } from 'ahooks';
import { Button, ConfigProvider, Layout } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Content, Header } from 'antd/lib/layout/layout';
import { isEmpty } from 'lodash-es';
import { useRef } from 'react';
import { history, useSearchParams } from 'umi';
import styles from './index.less';

const AssetMarket = () => {
  const pageTitle = 'L7VP ｜ 文档';
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [searchParams] = useSearchParams();
  const path = searchParams.get('path');
  useTitle(pageTitle);
  const previewBaseUrl = `https://www.yuque.com/antv/l7vp`;
  const previewUrl = !isEmpty(path) ? `${previewBaseUrl}/${path}` : previewBaseUrl;

  const handleIframeLoad = () => {
    if (!iframeRef.current) return;
  };

  // useEffect(() => {
  //   const handleWindowMessage = (evt: any) => {
  //     let evtData = evt?.data || {};
  //     if (typeof evtData === 'string') {
  //       try {
  //         evtData = JSON.parse(evtData);
  //       } catch {
  //         evtData = {};
  //       }
  //     }
  //     const { type, url, payload } = evtData;
  //     console.log('type: ', type);
  //     console.log('evtData: ', evtData);
  //     switch (type) {
  //       case 'doc_ready':
  //       //
  //       case 'yuque_sdk_connect':
  //       //
  //       default:
  //         break;
  //     }
  //   };

  //   window.addEventListener('message', handleWindowMessage, true);

  //   return  () =>{
  //     window.removeEventListener('message', handleWindowMessage, true);
  //   };
  // }, []);

  return (
    <ConfigProvider locale={zhCN} theme={{ inherit: false }}>
      <Layout className={styles.layout}>
        <Header className={styles.header}>
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
          <a href="https://github.com/antvis/L7VP" target="_blank" rel="noreferrer">
            <Button type="text" size="small" icon={<GithubOutlined />}>
              GitHub
            </Button>
          </a>
        </Header>
        <Content className={styles.content}>
          <iframe
            ref={iframeRef}
            src={previewUrl}
            onLoad={handleIframeLoad}
            frameBorder="0"
            style={{ width: '100%', height: 'calc(100vh - 164px)' }}
            // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-allowfullscreen
            allow="fullscreen"
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default AssetMarket;

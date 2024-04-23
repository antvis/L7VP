import {
  DingdingOutlined,
  FileTextOutlined,
  GithubOutlined,
  QuestionCircleOutlined,
  ReadOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useResponsive, useTitle } from 'ahooks';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Layout, Menu, Popover, Space, theme } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';
import { history, Outlet, useAppData, useLocation } from 'umi';
import styles from './WorkSpace.less';
import { useInternalUserPrompt } from '@/hooks';

const { useToken } = theme;

const QA_QRCodeLink = 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3YNMR5CIKosAAAAAAAAAAAAADmJ7AQ/original';

export default function WorkSpaceLayout() {
  const internalUserPrompt = useInternalUserPrompt();
  const { token } = useToken();
  const responsive = useResponsive();
  const isMobile = responsive.md === false;
  const { pathname } = useLocation();
  const routes =
    useAppData()?.clientRoutes[0].routes?.find((item: Record<string, any>) => item?.name === 'workspace')?.routes || [];
  const menuItems = routes
    ?.filter((item: any) => !item.hideInMenu)
    .map((item: any) => ({
      key: item.path,
      label: item.name,
      disabled: item.disabled,
    }));

  const pageTitle = menuItems.find((item) => item.key === pathname)?.label || '';
  useTitle(`L7VP ${pageTitle}`);

  const helpMenuItems: MenuProps['items'] = [
    {
      key: '0',
      label: (
        <span
          onClick={() => {
            window.open(history.createHref(`/docs?path=get-started`));
          }}
        >
          快速入门
        </span>
      ),
      icon: <ReadOutlined />,
    },
    {
      key: '1',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.yuque.com/forms/share/41efda19-f8cd-4269-99c0-a827aeeac8b3"
        >
          问题反馈
        </a>
      ),
      icon: <QuestionCircleOutlined />,
    },
    {
      key: '2',
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.yuque.com/forms/share/30fcce09-67d8-4d3a-83f2-b2e1c9db0cfa"
        >
          问卷调查
        </a>
      ),
      icon: <FileTextOutlined />,
    },
  ];

  const onClickLogo = () => {
    history.push('/');
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header} style={{ color: token.colorText, backgroundColor: token.colorBgLayout }}>
        <div className={styles.left}>
          <div className={styles.logo} onClick={onClickLogo}>
            <img
              className={styles['logo-img']}
              src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuDWR7uXkbkAAAAAAAAAAAAADmJ7AQ/original"
            />
            <span className={styles['logo-text']}>L7VP</span>
            {!isMobile && <span className={styles['logo-desc']}>地理空间智能可视分析工具</span>}
          </div>
          <Menu
            className={styles.menu}
            mode="horizontal"
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={(item) => {
              history.push(`${item.key}`);
            }}
          />
        </div>

        <div className={styles['right-section']}>
          <Space size="small">
            <Button
              type="text"
              size="small"
              icon={<ToolOutlined />}
              onClick={() => {
                history.push('/asset-market');
              }}
            >
              资产市场
            </Button>
            <Dropdown menu={{ items: helpMenuItems }} placement="bottomRight">
              <Button
                type="text"
                size="small"
                icon={<ReadOutlined />}
                onClick={() => {
                  window.open(history.createHref(`/docs`));
                }}
              >
                帮助文档
              </Button>
            </Dropdown>
            <Popover placement="bottom" trigger="hover" content={<img width={200} src={QA_QRCodeLink} />}>
              <Button type="text" size="small" icon={<DingdingOutlined />}>
                使用交流
              </Button>
            </Popover>
            <a href="https://github.com/antvis/L7VP" target="_blank" rel="noreferrer">
              <Button type="text" size="small" icon={<GithubOutlined />}>
                GitHub
              </Button>
            </a>
          </Space>
        </div>
      </Header>
      <Content style={{ color: token.colorText, marginTop: '64px', padding: '50px' }}>
        {internalUserPrompt}
        <Outlet />
      </Content>
    </Layout>
  );
}

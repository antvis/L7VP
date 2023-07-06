import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { Outlet } from 'umi';
import './index.less';

export default function Layout() {
  return (
    <ConfigProvider locale={zhCN}>
      <Outlet />
    </ConfigProvider>
  );
}

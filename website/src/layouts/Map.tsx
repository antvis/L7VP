import { ConfigProvider } from 'antd';
import { Outlet } from 'umi';
import { STUDIO_THEME } from '@/constants';

const MapLayout: React.FC = () => {
  return (
    <ConfigProvider theme={STUDIO_THEME}>
      <Outlet />
    </ConfigProvider>
  );
};

export default MapLayout;

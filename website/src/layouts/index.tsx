import { WEBSITE_THEME } from '@/constants';
import { Global } from '@emotion/react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Outlet } from 'umi';

const { useToken } = theme;

const GlobalStyle = () => {
  const { token } = useToken();

  return (
    <Global
      styles={{
        body: {
          color: token.colorText,
          fontSize: token.fontSize,
          fontFamily: token.fontFamily,
          lineHeight: token.lineHeight,
          background: token.colorBgLayout,
        },
      }}
    />
  );
};

export default function Layout() {
  return (
    <ConfigProvider locale={zhCN} theme={WEBSITE_THEME}>
      <Outlet />
      <GlobalStyle />
    </ConfigProvider>
  );
}

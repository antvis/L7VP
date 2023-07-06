import { theme, ConfigProvider } from 'antd';
import { useContext } from 'react';

const { ConfigContext } = ConfigProvider;
const useConfig = () => useContext(ConfigContext);

export const useAntdToken = () => {
  const { getPrefixCls } = useConfig();
  const rootPrefixCls = getPrefixCls();

  const { useToken } = theme;
  const { token } = useToken();

  return {
    ...token,
    antCls: `.${rootPrefixCls}`,
  };
};

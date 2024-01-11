import { theme } from 'antd';

export const ANTD_DEFAULT_THEME = {
  algorithm: theme.defaultAlgorithm,
};

export const ANTD_DARK_THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#8274FF',
    colorTextBase: 'rgba(255,255,255,0.85)',
    colorBgBase: '#0f0f13',
    colorInfo: '#8274FF',
    borderRadius: 6,

    // /** 复写描边梯度变量 **/
    // colorBorder: '#434343',
    // colorBorderSecondary: '#303030',
    // colorSplit: 'rgba(255,255,255,0.85)',
    // /** 复写描边梯度变量 **/
  },
};

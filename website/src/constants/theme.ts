import { theme } from 'antd';

export const ANTD_THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#8274FF',
    colorTextBase: 'rgba(255,255,255,0.85)',
    colorBgBase: '#0f0f13',
    colorInfo: '#8274FF',
    borderRadius: 6,
  },
};

/** 网站的主题 **/
export const WEBSITE_THEME = {
  ...ANTD_THEME,
  token: {
    ...ANTD_THEME.token,

    /** 复写描边梯度变量 **/
    colorBorder: '#434343',
    colorBorderSecondary: '#303030',
    colorSplit: 'rgba(48,48,48,0.85)',
    /** 复写描边梯度变量 **/
  },
};

/** 工作台编辑态&应用态的主题 **/
export const STUDIO_THEME = {
  ...ANTD_THEME,
  token: {
    ...ANTD_THEME.token,
    colorBgBase: '#1d1e25',
  },
  components: {
    Slider: {
      colorPrimaryBorder: ANTD_THEME.token.colorPrimary,
      colorPrimaryBorderHover: ANTD_THEME.token.colorPrimary,
    },
    DatePicker: {
      cellHoverWithRangeBg: ANTD_THEME.token.colorPrimary,
    },
  },
};

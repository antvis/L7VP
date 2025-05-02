import { css } from '@emotion/css';

import { theme } from 'antd';

export default () => {
  const { useToken } = theme;
  const { token } = useToken();
  const { colorBgContainer, colorTextSecondary } = token;

  return {
    layerSwitch: css`
      background: ${colorBgContainer} !important;
      .l7-iconfont {
        fill: ${colorTextSecondary} !important;
      }
    `,
  };
};

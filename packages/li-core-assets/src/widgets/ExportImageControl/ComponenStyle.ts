import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorBorder } = token;

  return {
    exportImageIcon: css`
      color: ${colorTextDescription};
      background: ${colorBgContainer} !important;
      border-color: ${colorBorder};
      border-radius: 0px;

      .l7-iconfont {
        fill: ${colorTextDescription};
      }

      &:hover {
        .l7-iconfont {
          fill: ${colorText};
        }
      }
    `,
  };
};

export default useStyle;

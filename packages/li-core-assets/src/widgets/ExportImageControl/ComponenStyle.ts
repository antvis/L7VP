import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorBorder, borderRadius } = token;

  return {
    exportImageIcon: css`
      color: ${colorTextDescription};
      background: ${colorBgContainer} !important;
      border-color: ${colorBorder};
      border-radius: ${borderRadius}px;

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

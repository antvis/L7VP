import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, colorText, colorBgElevated } = token;

  return {
    l7Zoom: css`
      .l7-button-control {
        color: ${colorTextDescription};
        background: ${colorBgContainer};

        .l7-iconfont {
          fill: ${colorTextDescription};
        }
      }

      .l7-button-control {
        border-bottom: 1px solid ${colorBorder};
      }

      .l7-button-control:hover {
        background-color: ${colorBgElevated};

        .l7-iconfont {
          fill: ${colorText};
        }
      }

      .l7-control-zoom__number {
        font-size: 12px;
      }
    `,
  };
};

export default useStyle;

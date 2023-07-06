import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, colorText, colorBgElevated } = token;

  return {
    l7Zoom: css`
      .l7-button-control {
        color: ${colorText};
        background: ${colorBgContainer};

        .l7-iconfont {
          fill: ${colorText};
        }
      }

      .l7-button-control:first-child {
        border-bottom: 1px solid ${colorBorder};
      }

      .l7-button-control:not(:disabled):hover {
        background-color: ${colorBgContainer};
      }
    `,

    zoomControl: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,

    zoomItem: css`
      width: 28px;
      height: 28px;
      color: ${colorTextDescription};
      line-height: 28px;
      text-align: center;
      vertical-align: middle;
      background-color: ${colorBgContainer};
    `,

    zoomBtn: css`
      font-size: 16px;
      cursor: pointer;

      &:hover {
        color: ${colorText};
        background-color: ${colorBgElevated};
      }
    `,

    zoomBtnIn: css`
      border-radius: 4px 4px 0 0;
    `,

    zoomBtnOut: css`
      border-radius: 0 0 4px 4px;
    `,

    zoomNumber: css`
      font-size: 12px;
      border-top: 1px solid ${colorBorder};
      border-bottom: 1px solid ${colorBorder};
    `,
  };
};

export default useStyle;

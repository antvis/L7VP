import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorBorder, colorPrimary, colorBgElevated } = token;

  return {
    mapTheme: css`
      color: ${colorTextDescription};
      background: ${colorBgContainer} !important;
      border-color: ${colorBorder};
      border-radius: 0px;

      svg {
        fill: ${colorTextDescription} !important;
      }

      &:hover {
        svg {
          fill: ${colorText} !important;
        }
      }
    `,
    mapThemePopper: css`
      .l7-popper-content {
        color: ${colorText};
        background: ${colorBgContainer};

        .l7-select-control-item:hover {
          box-shadow: 0 5px 12px 4px rgba(0, 0, 0, 0.09), 0 3px 6px 0 rgba(0, 0, 0, 0.12),
            0 1px 2px -2px rgba(0, 0, 0, 0.16);
        }

        .l7-select-control-item {
          border: 1px solid ${colorBorder};
          border-radius: 4px;
        }

        .l7-select-control-item-active {
          border: 1px solid ${colorPrimary};
        }
      }

      &.l7-popper-right .l7-popper-arrow  {
        border-right-color: ${colorBgElevated};
      }

      &.l7-popper-left .l7-popper-arrow  {
        border-left-color: ${colorBgElevated};
      }

      &.l7-popper-bottom .l7-popper-arrow  {
        border-bottom-color: ${colorBgElevated};
      }

      &.l7-popper-top .l7-popper-arrow  {
        border-top-color: ${colorBgElevated};
      }
    `,
  };
};

export default useStyle;

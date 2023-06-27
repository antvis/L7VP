import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorPrimary, colorBgElevated, colorTextDescription, colorTextDisabled } = token;

  return {
    contentBtnItem: css`
      height: 32px;
      width: 32px;
      background-color: ${colorBgElevated};
      border-radius: 4px;
      cursor: pointer;

      .ant-btn {
        padding: 0;
        color: ${colorTextDescription};
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
      }

      &:hover {
        span {
          color: ${colorPrimary};
        }
      }
    `,

    contentBtnItemActive: css`
      &:hover {
        span {
          color: ${colorTextDisabled} !important;
        }
      }
    `,
  };
};

export default useStyle;

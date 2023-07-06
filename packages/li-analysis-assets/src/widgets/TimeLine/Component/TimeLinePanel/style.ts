import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorPrimary } = token;

  return {
    content: css`
      background-color: ${colorBgContainer};
      color: ${colorTextDescription};
      width: 80%;
      height: 250px;
      position: absolute;
      z-index: 3;
      padding: 16px 12px 8px;
      bottom: 8px;
      right: 50px;
      border-radius: 8px;
    `,

    contentHeader: css`
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      font-size: 14px;
      font-weight: 500;

      & > div {
        flex: 1;
      }
    `,

    contentHeaderField: css`
      text-align: left;
      font-size: 11px;
      span {
        margin-right: 6px;
      }
    `,

    contentHeaderTime: css`
      color: ${colorText};
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    `,

    contentHeaderBtn: css`
      cursor: pointer;
      text-align: right;
      &:hover {
        color: ${colorText};
      }
    `,

    chart: css`
      height: 140px;
    `,

    contentBtn: css`
      margin-top: 15px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      > div {
        margin: 0 5px;
      }
    `,
  };
};

export default useStyle;

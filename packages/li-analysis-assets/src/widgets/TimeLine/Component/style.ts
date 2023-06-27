import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorPrimary } = token;

  return {
    timeAxisBtn: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      font-size: 16px;
      background-color: ${colorBgContainer};
      border-radius: 4px;
      cursor: pointer;
    `,

    timeAxisBtnDefault: css`
      color: ${colorTextDescription};
      &:hover {
        color: ${colorText};
      }
    `,

    timeAxisBtnActive: css`
      color: ${colorPrimary};
      &:hover {
        color: ${colorPrimary};
      }
    `,
  };
};

export default useStyle;

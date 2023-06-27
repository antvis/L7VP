import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, colorPrimary, colorPrimaryHover } = token;

  return {
    vectorTiles: css`
      text-align: left !important;
      background-color: ${colorBgContainer};
      border-radius: ${colorBorder};
    `,

    tilesBtn: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      color: ${colorTextDescription};
      font-size: 16px;
      background-color: ${colorBgContainer};
      border-radius: ${colorBorder};
      cursor: pointer;

      &:hover {
        color: ${colorPrimaryHover};
      }
    `,

    tilesBtnSelected: css`
      color: ${colorPrimaryHover};
    `,
  };
};

export default useStyle;

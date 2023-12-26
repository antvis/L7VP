import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, borderRadius, colorPrimaryHover } = token;

  return {
    vectorTiles: css`
      text-align: left !important;
      background-color: ${colorBgContainer};
      border-radius: ${borderRadius}px;
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
      border-radius: ${borderRadius}px;
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

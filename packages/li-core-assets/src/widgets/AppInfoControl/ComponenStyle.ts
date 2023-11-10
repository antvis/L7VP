import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, colorPrimaryActive } = token;

  return {
    informationPopover: css`
      color: ${colorTextDescription};
      background: ${colorBgContainer} !important;
      border-color: ${colorBorder};
      border-radius: 4px;
      padding: 0;
    `,

    informationBtn: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      color: ${colorTextDescription};
      font-size: 16px;
      background-color: ${colorBgContainer};
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        color: ${colorPrimaryActive};
      }
    `,

    informationBtnSelect: css`
      color: ${colorPrimaryActive};
    `,

    informationContent: css`
      border-radius: 4px;
      width: 200px;
    `,

    informationContentHeader: css`
      display: flex;
      justify-content: space-between;
      height: 30px;
      align-items: center;
    `,

    informationContentHeaderBtn: css`
      &:hover {
        color: ${colorPrimaryActive};
      }
    `,

    informationContentDescription: css`
      color: ${colorTextDescription};
      font-size: 12px;
    `,
  };
};

export default useStyle;

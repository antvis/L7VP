import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const {
    colorText,
    colorTextDescription,
    colorBgElevated,
    zIndexBase,
    zIndexPopupBase,
    colorBgContainer,
    colorBorderSecondary,
  } = token;

  return {
    filterApp: css`
      display: flex;
      padding: 10px;
      flex-wrap: wrap;
      color: ${colorTextDescription};
      border: 1px solid #f00;
      align-items: center;
      background: ${colorBgContainer};
    `,

    filterItem: css`
      display: flex;
      align-items: center;
    `,

    filterItemTitle: css`
      margin-right: 10px;
    `,

    filterItemContent: css`
      width: 200px;
    `,

    numberItem: css`
      border-bottom: 1px solid ${colorBorderSecondary};
      display: flex;
      justify-content: space-between;
      padding: 10px;
    `,
  };
};

export default useStyle;

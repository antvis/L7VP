import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorderSecondary } = token;

  return {
    filterControl: css`
      display: flex;
      padding: 10px;
      flex-wrap: wrap;
      color: ${colorTextDescription};
      align-items: center;
      background: ${colorBgContainer};
    `,

    filterItem: css`
      display: flex;
      align-items: center;
    `,

    filterItemTitle: css`
      margin: 0 10px;
    `,

    filterItemContent: css`
      min-width: 150px;
      max-width: 300px;
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

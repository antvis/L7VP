import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorderSecondary, borderRadius } = token;

  return {
    filterControl: css`
      display: flex;
      flex-wrap: wrap;
      color: ${colorTextDescription};
      align-items: center;
      background: ${colorBgContainer};
      border-radius: ${borderRadius}px;
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
      display: flex;
      justify-content: space-between;
      padding: 10px;
      height: 32px;
      line-height: 32px;
      padding: 0 5px;
    `,
  };
};

export default useStyle;

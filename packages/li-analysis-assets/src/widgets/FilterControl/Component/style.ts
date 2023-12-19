import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer } = token;

  return {
    filterControl: css`
      display: flex;
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
      font-size: 14px;
    `,

    filterItemContent: css`
      min-width: 150px;
      max-width: 300px;
      font-size: 14px;

      .ant-select-selector {
        color: ${colorTextDescription};
      }

      .ant-picker-input > input {
        color: ${colorTextDescription};
      }
    `,

    numberItem: css`
      display: flex;
      justify-content: space-between;
      padding: 10px;
      height: 32px;
      line-height: 32px;
      padding: 0 5px;
    `,

    numberContent: css`
      padding: 5px;
    `,

    numberSubmit: css`
      text-align: center;
      margin-top: 20px;
    `,
  };
};

export default useStyle;

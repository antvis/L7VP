import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorBgContainer } = token;

  return {
    miniChart: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 270px;
      max-width: 600px;
      height: 100%;
      min-height: 250px;
      max-height: 300px;
      padding: 14px 10px;
      overflow: hidden;
      background-color: ${colorBgContainer};
      border-radius: 4px;
    `,

    miniChartTitle: css`
      margin-bottom: 0;
      color: ${colorText};
      font-size: 12px;
      line-height: 1;
      text-align: left;
    `,

    miniChartPlot: css`
      flex: 1;
      overflow: hidden;
    `,
  };
};

export default useStyle;

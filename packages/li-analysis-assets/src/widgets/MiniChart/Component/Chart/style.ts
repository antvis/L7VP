import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorBgContainer, colorBgElevated } = token;

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

      .g2-tooltip {
        background: ${colorBgElevated} !important;
        
        .g2-tooltip-title,
          .g2-tooltip-list-item-name,
          .g2-tooltip-list-item-value {
            color: ${colorText} !important;
          }
        }
      }
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

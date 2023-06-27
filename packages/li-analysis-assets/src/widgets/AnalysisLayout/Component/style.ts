import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorBgContainer, colorBgLayout } = token;

  return {
    analysisLayout: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .l7-control-container {
        .l7-right {
          transition: margin-right 200ms ease;
        }
      }
    `,

    layoutContainer: css`
      display: flex;
      flex: auto;
      width: 100%;
    `,

    bottomPanel: css`
      z-index: 99;
      display: flex;
      align-items: center;
      width: 100%;
      height: 300px;
      padding: 15px 10px 12px;
      overflow: hidden;
      overflow-x: auto;
      background-color: ${colorBgLayout};

      > :nth-child(n + 2) {
        margin-left: 10px;
      }
    `,

    sidePanel: css`
      width: 400px;
      padding: 15px 10px;
      overflow: hidden;
      overflow-y: auto;
      background-color: ${colorBgLayout};

      > :nth-child(n + 2) {
        margin-top: 10px;
      }
    `,

    mapContainer: css`
      flex: auto;
    `,

    showFloatPanel: css`
      .l7-control-container {
        .l7-right {
          margin-right: 210px;
          transition: margin-right 200ms ease;
        }
      }
    `,

    floatPanel: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 900;
      width: 200;
      background-color: ${colorBgContainer};
      transition: width 200ms ease;
    `,
  };
};

export default useStyle;

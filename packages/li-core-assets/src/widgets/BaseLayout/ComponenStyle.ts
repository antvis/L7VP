import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorBgLayout } = token;

  return {
    baseLayout: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    `,

    baseContainer: css`
      display: flex;
      flex: auto;
      width: 100%;
      height: 100%;
    `,

    mapContainer: css`
      flex: auto;
    `,

    sidePanel: css`
      width: 350px;
      padding: 15px 10px;
      overflow: hidden;
      overflow-y: auto;
      background-color: ${colorBgLayout};

      > :nth-child(n + 2) {
        margin-top: 10px;
      }
    `,
  };
};

export default useStyle;

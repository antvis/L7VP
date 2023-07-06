import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorBgContainer } = token;

  return {
    floatPanel: css`
      box-sizing: border-box;
    `,

    floatPanelHidden: css`
      width: 0 !important;
    `,

    toggleBtn: css`
      position: absolute;
      top: 50%;
      left: -14px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 40px;
      color: #a6a5a6;
      font-size: 14px;
      background: fade(${colorBgContainer}, 85%);
      border-radius: 4px 0 0 4px;
      transform: translate(0, -50%);
      cursor: pointer;

      &:hover {
        color: #5c5c5c;
      }
    `,

    panelContent: css`
      padding: 20px 10px;
    `,
  };
};

export default useStyle;

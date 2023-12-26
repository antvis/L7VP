import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, borderRadius } = token;

  return {
    mouseLocation: css`
      border-radius: ${borderRadius}px;
      color: ${colorTextDescription} !important;
      background: ${colorBgContainer} !important;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer } = token;

  return {
    mouseLocation: css`
      color: ${colorTextDescription} !important;
      background: ${colorBgContainer} !important;
    `,
  };
};

export default useStyle;

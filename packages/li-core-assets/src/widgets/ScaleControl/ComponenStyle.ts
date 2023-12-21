import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, borderRadius } = token;

  return {
    scalesControl: css`
      .l7-control-scale-line {
        color: ${colorTextDescription};
        background: ${colorBgContainer} !important;
        border-color: ${colorBorder};
        border-radius: ${borderRadius}px;
      }
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer, colorBorder } = token;

  return {
    geoLocation: css`
      color: ${colorTextDescription};
      background: ${colorBgContainer} !important;
      border-color: ${colorBorder};
      border-radius: 0px;

      svg {
        fill: ${colorTextDescription} !important;
      }

      &:hover {
        svg {
          fill: ${colorText} !important;
        }
      }
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextDescription, colorBgContainer, colorBorder, colorText, colorBgElevated, borderRadius } = token;

  return {
    swipeControl: css`
      border-radius: ${borderRadius}px;
    `,
  };
};

export default useStyle;

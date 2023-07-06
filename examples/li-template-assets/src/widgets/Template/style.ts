import { css } from '@emotion/css';
import { theme } from 'antd';

export const useStyle = () => {
  const { useToken } = theme;

  const {
    token: { colorText },
  } = useToken();

  return {
    templateControl: css`
      color: ${colorText};
    `,
  };
};

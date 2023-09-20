import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { controlItemBgHover, controlItemBgActive } = token;

  return {
    selectItem: css`
      &:hover {
        background: ${controlItemBgHover};
      }
    `,

    selectedItem: css`
      background: ${controlItemBgActive};
    `,
  };
};

export default useStyle;

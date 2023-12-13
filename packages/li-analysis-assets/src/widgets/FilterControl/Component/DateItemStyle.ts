import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorPrimary, colorPrimaryHover } = token;

  return {
    extraFooter: css`
      display: flex;
    `,

    extraFooterItem: css`
      margin-right: 10px;
    `,

    extraFooterItemInfo: css`
      color: ${colorPrimary};

      &:hover {
        color: ${colorPrimaryHover};
      }
    `,
  };
};

export default useStyle;

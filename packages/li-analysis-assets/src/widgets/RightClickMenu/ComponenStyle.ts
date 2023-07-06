import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorBgContainer, colorBgElevated } = token;

  return {
    rightClickMenu: css`
      .larkmap-context-menu__menu-item {
        color: ${colorText};
        background: ${colorBgContainer};
      }
      .larkmap-context-menu__menu-item:hover {
        background: ${colorBgElevated};
      }
    `,
  };
};

export default useStyle;

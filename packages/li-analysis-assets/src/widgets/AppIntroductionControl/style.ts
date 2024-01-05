import { css } from '@emotion/css';
import { theme } from 'antd';

function useStyle() {
  const { useToken } = theme;
  const { token } = useToken();
  const { colorBgContainer } = token;

  return {
    appIntroduction: css`
      background-color: ${colorBgContainer};

      .ql-editor {
        overflow: hidden;
      }

      .ql-tooltip {
        display: none;
      }
    `,
  };
}

export default useStyle;

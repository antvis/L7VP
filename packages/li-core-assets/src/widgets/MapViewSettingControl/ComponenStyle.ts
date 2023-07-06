import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgContainer } = token;

  return {
    settingContainer: css`
      width: 200px;
    `,

    SettingBtn: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      background-color: ${colorBgContainer};
      border-radius: 2px;
      cursor: pointer;

      svg {
        color: ${colorTextDescription};
      }

      &:hover {
        svg {
          color: ${colorText};
        }
      }
    `,

    settingContainerItem: css`
      display: flex;
      justify-content: space-between;
    `,
  };
};

export default useStyle;

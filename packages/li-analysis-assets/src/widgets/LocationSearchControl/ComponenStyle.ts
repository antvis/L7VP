import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorBgContainer, colorBgElevated, borderRadius } = token;

  return {
    locationSearcheContainer: css`
      .larkmap-location-search {
        background-color: ${colorBgContainer};
        border-radius: ${borderRadius}px;
      }

      .larkmap-select-selection-search {
        color: ${colorText};

        .larkmap-select-selection-search-input {
          color: ${colorText};
        }
      }

      .larkmap-select-clear {
        display: none !important;
      }
    `,

    locationSearche: css`
      width: 200px;
      background-color: ${colorBgContainer};

      .larkmap-select-item-empty,
      .larkmap-location-search__option-name {
        color: ${colorText};
      }

      .larkmap-select-item-option-active {
        background: ${colorBgElevated};
      }
    `,
  };
};

export default useStyle;

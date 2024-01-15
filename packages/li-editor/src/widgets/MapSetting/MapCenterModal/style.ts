import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorBgContainer, colorBgElevated, colorText } = useAntdToken();

  return {
    mapCenter: css`
      width: 14px;
      height: 14px;
      position: absolute;
      top: calc(50% - 9px);
      left: calc(50% - 9px);
      background: #1a90ff;
      border-radius: 50%;
      border: solid 2px #fff;
      pointer-events: none;
    `,

    control: css`
      .larkmap-location-search {
        background-color: ${colorBgElevated};
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

    locationSearch: css`
      width: 200px;
      background-color: ${colorBgElevated};
      z-index: 1101;

      .larkmap-select-item-empty,
      .larkmap-location-search__option-name {
        color: ${colorText};
      }

      .larkmap-select-item-option-active {
        background: ${colorBgContainer};
      }
    `,
  };
};

export default useStyle;

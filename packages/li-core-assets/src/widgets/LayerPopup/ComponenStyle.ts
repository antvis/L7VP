import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorText, colorTextDescription, colorBgElevated } = token;

  return {
    layerPopup: css`
      width: 280px !important;

      .l7-popup-tip {
        border-top-color: ${colorBgElevated};
        border-bottom-color: ${colorBgElevated};
      }

      .l7-popup-content {
        padding: 12px;
        color: ${colorText};
        background: ${colorBgElevated};
      }
    `,

    popupRow: css`
      display: flex;
      width: 100%;
      height: 28px;
      color: ${colorTextDescription};
      line-height: 28px;
    `,

    popupRowImage: css`
      display: flex;
      width: 100%;
      height: 40px;
      color: ${colorTextDescription};
      line-height: 40px;
    `,

    rowItem: css`
      overflow: hidden;
      font-weight: 500;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,

    rowKey: css`
      max-width: 90%;
      text-align: left;
    `,

    rowValue: css`
      flex: 1;
      min-width: 10%;
      margin-left: 5px;
      color: ${colorText};
      text-align: right !important;
    `,
  };
};

export default useStyle;
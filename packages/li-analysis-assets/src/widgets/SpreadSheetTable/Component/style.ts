import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { antCls, colorBgElevated, colorText, controlItemBgHover, colorBgContainer } = useAntdToken();

  return {
    spreadSheet: css`
      display: flex;
      flex-direction: column;
      width: 100%;
      min-width: 270px;
      max-width: 600px;
      height: 100%;
      min-height: 250px;
      max-height: 300px;
      padding: 14px 10px;
      overflow: hidden;
      background-color: ${colorBgContainer};
      border-radius: 4px;
    `,

    spreadSheetTitle: css`
      margin-bottom: 0;
      color: ${colorText};
      font-size: 12px;
      line-height: 1;
      text-align: left;
      margin-bottom: 10px;
    `,

    spreadSheetContent: css`
      width: 100%;
      height: 100%;
      overflow: auto;

      .antv-s2-tooltip-container {
        min-width: 120px !important;
        background-color: ${colorBgElevated};
      }

      .antv-s2-pagination-count {
        display: none;
      }

      ${antCls}-menu-light {
        background-color: ${colorBgElevated};
        ${antCls}-menu-item {
          ${antCls}-menu-title-content {
            color: ${colorText};
            svg {
              fill: ${colorText};
            }
          }
        }
        ${antCls}-menu-item:hover {
          color: ${colorText};
          background: ${controlItemBgHover};
        }
        ${antCls}-menu-item-selected {
          background: #1a3048;
        }
      }
    `,
  };
};

export default useStyle;

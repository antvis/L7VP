import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { antCls, colorTextSecondary, colorBgContainer, colorSplit, borderRadius } = useAntdToken();

  return {
    widgetList: css`
      ${antCls}-collapse ${antCls}-collapse-item {
        margin-bottom: 10px;
      }

      ${antCls}-collapse-content > ${antCls}-collapse-content-box {
        padding: 10px 0;
      }
    `,

    widgetGroup: css`
      & + & {
        margin-top: 20px;
      }
    `,

    widgetGroupTitle: css`
      margin-bottom: 0;
      padding-bottom: 10px;
      color: ${colorTextSecondary};
      font-weight: 400;
      font-size: 14px;
    `,

    panel: css`
      ${antCls}-collapse-header {
        padding: 6px 13px !important;
        overflow: hidden;
        background-color: ${colorBgContainer} !important;
        border: 1px solid ${colorSplit} !important;
        border-radius: ${borderRadius}px !important;

        ${antCls}-collapse-extra {
          cursor: pointer !important;
        }
      }
    `,
  };
};

export default useStyle;

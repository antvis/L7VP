import { css } from '@emotion/css';
import { useAntdToken } from '../../../../hooks';

const useStyle = () => {
  const { antCls, colorBgElevated, colorText, colorSplit, colorTextSecondary, borderRadius } = useAntdToken();

  return {
    layerForm: css`
      overflow-y: auto;

      ${antCls}-badge-count {
        color: ${colorText};
        box-shadow: none;
      }

      ${antCls}-formily-item-label {
        color: ${colorText};
      }

      ${antCls}-formily-item-asterisk {
        color: ${colorTextSecondary};
      }

      ${antCls}-formily-item-label-tooltip-icon {
        color: ${colorTextSecondary};
      }

      ${antCls}-collapse-item ${antCls}-collapse-header {
        padding: 6px 13px !important;
        background-color: ${colorBgElevated};
        border: 1px solid ${colorSplit};
        border-radius: ${borderRadius}px !important;
      }

      ${antCls}-collapse-item ${antCls}-collapse-content ${antCls}-collapse-content-box {
        padding: 10px 0 !important;
      }

      ${antCls}-collapse {
        margin-bottom: 10px;
      }
    `,
  };
};

export default useStyle;

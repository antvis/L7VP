import { css } from '@emotion/css';
import { useAntdToken } from '../../../../hooks';

const useStyle = () => {
  const { antCls, colorText, colorTextTertiary, colorSplit } = useAntdToken();

  return {
    widgetForm: css`
      ${antCls}-formily-item-label {
        color: ${colorText};
      }

      ${antCls}-formily-item-asterisk {
        color: ${colorTextTertiary};
      }

      ${antCls}-formily-item-label-tooltip-icon {
        color: ${colorTextTertiary};
      }

      ${antCls}-formily-item {
        margin-bottom: 8px;
        padding-bottom: 5px;
        border-bottom: 1px solid ${colorSplit};
      }

      ${antCls}-formily-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
      }

      ${antCls}-formily-item ${antCls}-formily-item-control-content-component {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    `,
  };
};

export default useStyle;

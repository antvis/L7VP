import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorSplit, antCls } = useAntdToken();

  return {
    layerPanel: css`
      position: relative;
      height: 100%;
    `,

    panelContent: css`
      height: 100%;
    `,

    panelContentHidden: css`
      display: none;
    `,

    panelHeader: css`
      margin: 0 20px;
      padding: 15px 0 15px;
      font-weight: 500;
      font-size: 16px;
      border-bottom: 1px solid ${colorSplit};
    `,

    addLayer: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      font-size: 14px;
    `,

    addLayerPopover: css`
      ${antCls}-popover-inner-content {
        ${antCls}-form-item {
          margin-bottom: 20px !important;
        }

        ${antCls}-form-item:last-child {
          margin-bottom: 8px !important;
        }
      }
    `,

    layerList: css`
      height: calc(100% - 57px - 52px);
      padding: 0 20px 15px;
      overflow-y: auto;
    `,

    layerAttribute: css`
      height: 100%;
    `,
  };
};

export default useStyle;

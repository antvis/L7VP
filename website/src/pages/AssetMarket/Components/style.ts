import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextSecondary } = token;

  return {
    assetsFilterBtn: css`
      position: absolute;
      top: -65px;
      right: 0;
    `,

    filterAssetPopover: css`
      width: 180px;
    `,

    filterAssetPopoverTitle: css`
      color: ${colorTextSecondary};
    `,

    filterAssetPopoverCheckbox: css`
      display: flex;
      flex-direction: column;
    `,

    filterAssetPopoverCheckboxItem: css`
      margin-bottom: 10px;
    `,

    filterAssetPopoverBtn: css`
      text-align: right;
    `,

    assetMarketModule: css`
      padding: 10px 0;
    `,
    assetMarketModuleTitle: css`
      margin-bottom: 12px;
      font-size: 14px;
    `,

    assetMarkeEmpty: css`
      justify-content: center;
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
    `,
  };
};

export default useStyle;

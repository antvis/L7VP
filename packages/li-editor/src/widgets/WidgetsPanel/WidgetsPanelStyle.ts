import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorSplit } = useAntdToken();

  return {
    panel: css`
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
      display: flex;
      justify-content: space-between;
      margin: 0 20px;
      padding: 15px 0 15px;
      border-bottom: 1px solid ${colorSplit};
    `,
    panelTitle: css`
      font-weight: 500;
      font-size: 16px;
    `,

    panelAddIcon: css`
      font-size: 16px !important;
    `,

    widgetList: css`
      height: calc(100% - 57px);
      padding: 10px 20px;
      overflow-y: auto;
    `,

    attribute: css`
      height: 100%;
    `,
  };
};

export default useStyle;

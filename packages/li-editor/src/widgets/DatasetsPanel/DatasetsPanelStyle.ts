import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorSplit } = useAntdToken();

  return {
    datasetPanel: css`
      position: relative;
      height: 100%;
    `,

    panelHeader: css`
      margin: 0 20px;
      padding: 15px 0 15px;
      font-weight: 500;
      font-size: 16px;
      border-bottom: 1px solid ${colorSplit};
    `,

    addDataset: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      font-size: 14px;
    `,

    datasetList: css`
      height: calc(100% - 57px - 52px);
      padding: 0 20px 15px;
      overflow-y: auto;
    `,
  };
};

export default useStyle;

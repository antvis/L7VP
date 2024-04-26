import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorPrimaryActive } = useAntdToken();

  return {
    caseDataset: css`
      max-height: 500px;
      overflow: hidden;
      overflow-y: auto;
    `,

    datasetItem: css`
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    `,
    datasetItemSelect: css`
      border: 2px solid ${colorPrimaryActive};
    `,

    datasetItemName: css`
      margin: 8px 0 4px 0;
      text-align: center;
    `,
  };
};

export default useStyle;

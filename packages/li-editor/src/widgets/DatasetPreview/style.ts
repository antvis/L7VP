import { css } from '@emotion/css';

const useStyle = () => {
  return {
    datasetPreview: css`
      min-width: 600px;
    `,

    datasetPreviewClamp: css`
      display: inline-block;
      width: 150px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,

    datasetPreviewTable: css`
      width: 100%;
      padding: 20px;
    `,

    datasetPreviewClampTitle: css`
      width: 100%;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';

const useStyle = () => {
  return {
    tilesZoomInputNumber: css`
      display: flex;
      flex-direction: column;
      margin-top: 5px !important;
    `,

    tilesZoomInputNumberMin: css`
      margin-bottom: 10px !important;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';

const useStyle = () => {
  return {
    dragItem: css`
      &:hover {
        opacity: 1;
      }
    `,

    itemIcon: css`
      cursor: move;
      opacity: 0;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';

const useStyle = () => {
  return {
    dragItem: css`
      &:hover [data-comp='drag-item-icon'] {
        opacity: 1 !important;
      }
    `,

    itemIcon: css`
      cursor: move;
      opacity: 0;
    `,
  };
};

export default useStyle;

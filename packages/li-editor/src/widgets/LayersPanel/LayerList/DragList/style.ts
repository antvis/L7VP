import { css } from '@emotion/css';

const useStyle = (componentsCls?: string) => {
  return {
    dragItem: css`
      &:hover ${componentsCls}drag-list__item-icon {
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

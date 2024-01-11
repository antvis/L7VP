import { css } from '@emotion/css';

const useStyle = () => {
  return {
    titleName: css`
      display: flex;
    `,

    titleNameText: css`
      display: flex;
      align-items: center;
      cursor: pointer;
      justify-content: space-between;
      max-width: 180px;
    `,

    titleNameTitle: css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,
  };
};

export default useStyle;

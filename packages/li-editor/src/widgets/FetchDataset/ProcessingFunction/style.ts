import { css } from '@emotion/css';

const useStyle = () => {
  return {
    successAndErr: css`
      margin-top: 10px;
    `,

    content: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,

    contentJs: css`
      flex: 1;
      height: 100px;
    `,

    contentIcon: css`
      width: 30px;
      text-align: center;

      &:hover {
        cursor: pointer;
      }
    `,
  };
};

export default useStyle;

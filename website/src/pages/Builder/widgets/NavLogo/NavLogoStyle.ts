import { css } from '@emotion/css';

const useStyle = () => {
  return {
    logo: css`
      margin: 15px 0;
      cursor: pointer;

      img {
        width: 26px;
        height: 26px;
      }
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';

const useStyle = () => {
  return {
    appType: css`
      margin: 8px 0 35px;
    `,

    appContent: css`
      margin: 8px 0 35px;
      display: flex;
    `,

    appTitle: css`
      width: 185px;
      margin-right: 60px;
    `,

    appSubtitle: css`
      color: rgb(160, 167, 180);
      font-size: 11px;
    `,

    codePreview: css`
      width: 100%;
      max-width: 600px;
      height: 300px;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorText, colorSplit } = useAntdToken();

  return {
    contentItem: css`
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

    appCodePre: css`
      display: inline-block;
      width: 100%;
      max-width: 600px;
      height: 180px;
      overflow: hidden;
      overflow-y: auto;
      color: ${colorText};
      border: 1 solid ${colorSplit};
      border-radius: 2px;
    `,
  };
};

export default useStyle;

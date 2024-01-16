import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorSplit, boxShadowSecondary } = useAntdToken();

  return {
    sidePanel: css`
      display: flex;
      flex-direction: column;
      height: 100%;
      border-left: 1px solid ${colorSplit};
      box-shadow: ${boxShadowSecondary};
    `,

    panelHeader: css`
      padding: 0 20px;
    `,

    panelContent: css`
      overflow: hidden;
    `,
  };
};

export default useStyle;

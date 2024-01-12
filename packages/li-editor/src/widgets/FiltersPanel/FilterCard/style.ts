import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorBgElevated } = useAntdToken();

  return {
    filterCard: css`
      width: 100%;
      margin-bottom: 10px;
      background-color: ${colorBgElevated};
    `,

    filterCardSelect: css`
      width: 100%;
    `,
  };
};

export default useStyle;

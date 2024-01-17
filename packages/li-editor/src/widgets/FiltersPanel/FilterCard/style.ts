import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorBgContainer } = useAntdToken();

  return {
    filterCard: css`
      width: 100%;
      margin-bottom: 10px;
      background-color: ${colorBgContainer};
    `,

    filterCardSelect: css`
      width: 100%;
    `,
  };
};

export default useStyle;

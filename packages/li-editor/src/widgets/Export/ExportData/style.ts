import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { antCls } = useAntdToken();

  return {
    formLabel: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin: 35px 0;
    `,

    formDesc: css`
      color: rgb(160, 167, 180);
      font-size: 11px;
    `,
  };
};

export default useStyle;

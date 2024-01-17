import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { antCls } = useAntdToken();

  return {
    exportPopover: css`
      ${antCls}-popover-inner-content {
        padding: 0;
      }
    `,
  };
};

export default useStyle;

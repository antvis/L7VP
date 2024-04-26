import { css } from '@emotion/css';
import { useAntdToken } from '../../../../hooks';

const useStyle = () => {
  const { colorBgContainer } = useAntdToken();

  return {
    codePreview: css`
      display: flex;
      flex-direction: column;
    `,

    toolBar: css`
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      height: 32px;
      padding: 6px 16px;
      background: ${colorBgContainer};
      border-radius: 10px 10px 0 0;
      opacity: 0.7;
      transition: opacity 0.3s;

      &:hover {
        opacity: 1;
      }
    `,

    action: css`
      position: relative;
      display: flex;
      align-items: center;
      width: 16px;
      height: 16px;
    `,

    actionIcon: css`
      width: 16px;
      height: 16px;
      overflow: hidden;
      color: rgba(255, 255, 255, 0.7);
      font-size: 16px;
      border: 0;
      cursor: pointer;
      transition: all 0.24s;

      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    `,
  };
};

export default useStyle;

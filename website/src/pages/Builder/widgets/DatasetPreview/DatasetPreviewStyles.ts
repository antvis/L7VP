import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorBgContainer } = useAntdToken();

  return {
    datasetPreview: css`
      min-width: 600px;
      height: calc(100% - 200px);
    `,

    modelTabel: css`
      position: relative;
      height: calc(100vh - 300px);
      padding: 10px 0 20px;
    `,

    tabelToolbar: css`
      display: flex;
      align-items: center;
      height: 36px;
      padding: 0 10px;
      background: ${colorBgContainer};
    `,

    toolbarItem: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 24px;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        svg {
          width: 13px;
          height: 13px;
          fill: #fff;
        }
      }
    `,

    toolbarItemActived: css`
      background: rgba(255, 255, 255, 0.2);
    `,
  };
};

export default useStyle;

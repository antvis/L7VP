import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { boxShadow, colorPrimary } = useAntdToken();

  return {
    uploadListContent: css`
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
    `,

    uploadListContentItem: css`
      position: relative;
      display: flex;
      align-items: center;
      margin: 0 5px 10px 0;
      padding: 5px 10px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 2px;
      cursor: pointer;

      &:hover {
        box-shadow: ${boxShadow};
      }
    `,

    uploadListContentItemTitle: css`
      width: 250px;
      height: 30px;
      overflow: hidden;
      line-height: 30px;
      text-overflow: ellipsis;
    `,

    uploadListContentItemSelected: css`
      position: absolute;
      top: 50%;
      right: 10px;
      width: 20px;
      height: 20px;
      margin-top: -10px;
      text-align: center;
      background: ${colorPrimary};
      border-radius: 50%;

      svg {
        color: #fff;
      }
    `,

    contentItemSelecteds: css`
      border: 1px solid ${colorPrimary};
    `,
  };
};

export default useStyle;

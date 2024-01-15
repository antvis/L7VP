import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { antCls, colorText, colorBgContainer, colorPrimary, colorTextTertiary } = useAntdToken();

  return {
    addPanel: css`
      position: relative;
      ${antCls}-modal-footer {
        ${antCls}-badge {
          margin-left: 10px;

          ${antCls}-badge-count {
            color: ${colorText};
            box-shadow: none;
          }
        }
      }
    `,

    panelImpty: css`
      padding-top: 20px;
    `,

    panelContent: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
    `,

    contentItem: css`
      position: relative;
      width: 200px;
      margin: 0 5px 5px 0;
      background-color: ${colorBgContainer};
      cursor: pointer;

      &:hover {
        box-shadow: 0 5px 12px 4px rgb(0 0 0 / 9%), 0 3px 6px 0 rgb(0 0 0 / 12%), 0 1px 2px -2px rgb(0 0 0 / 16%);
      }
    `,

    contentItemSelected: css`
      border: 1px solid ${colorPrimary};
    `,

    itemContent: css`
      position: relative;
      display: flex;
      align-items: center;
      padding: 10px;
    `,

    itemContentSelected: css`
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      text-align: center;
      background: ${colorPrimary};
      border-radius: 50%;

      svg {
        color: #fff;
      }
    `,
    itemContentImg: css`
      margin-right: 10px;
      font-size: 40px;

      svg {
        color: ${colorPrimary};
      }
    `,

    itemContentInfo: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    `,

    itemContentInfoTitle: css`
      display: -webkit-box;
      height: 25px;
      overflow: hidden;
      font-size: 14px;
      line-height: 20px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    `,

    itemContentInfoDescription: css`
      display: -webkit-box;
      height: 40px;
      overflow: hidden;
      color: ${colorTextTertiary};
      font-size: 12px;
      line-height: 20px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    `,
  };
};

export default useStyle;

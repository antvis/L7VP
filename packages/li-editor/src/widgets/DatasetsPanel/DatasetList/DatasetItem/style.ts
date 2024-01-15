import { css } from '@emotion/css';
import { useAntdToken } from '../../../../hooks';

const useStyle = (componentsCls?: string) => {
  const { antCls, colorBgElevated, colorSplit, colorPrimary, borderRadius } = useAntdToken();

  return {
    listCard: css`
      position: relative;
      width: auto;
      padding: 8px;
      background-color: ${colorBgElevated};
      border: 1px solid ${colorSplit};
      border-left: 3px solid ${colorPrimary};
      border-radius: ${borderRadius}px;
      cursor: pointer;

      & + & {
        margin-top: 10px;
      }
    `,

    listActions: css`
      position: absolute;
      top: 0;
      right: 10px;
      height: 40px !important;
      padding-top: 6px;
      cursor: pointer;

      ${antCls}-space-item {
        opacity: 1;
      }

      &:hover ${componentsCls}dataset-list__actions-item_show {
        opacity: 1 !important;
      }
    `,

    actionsItemHide: css`
      opacity: 0;
    `,

    listInfo: css`
      width: 200px;
      height: 100%;
      padding-top: 3px;
      overflow: hidden;

      > * {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    `,

    infoName: css`
      color: #979a9d;
      font-size: 12px;
    `,

    infoCount: css`
      color: #979a9d;
    `,

    popconfirmTitle: css`
      margin-bottom: 0;
      color: #bbb;
      font-size: 10px;
    `,

    popconfirmLayersCount: css`
      color: #faad14;
    `,
  };
};

export default useStyle;

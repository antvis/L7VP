import { css } from '@emotion/css';
import { useAntdToken } from '../../../../hooks';
import { LayerIconBg } from './constant';

const useStyle = () => {
  const { colorBgElevated, colorSplit, colorPrimary, borderRadius } = useAntdToken();

  return {
    layerItem: css`
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      background: ${colorBgElevated};
      border: 1px solid ${colorSplit};
      border-left: 3px solid;
      border-radius: ${borderRadius}px;
      padding: 0 8px;
    `,

    dragIcon: css`
      margin: 3px;
    `,

    itemInfor: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 15px 0;
      .li-title-name__title {
        width: 140px !important;
      }
    `,

    itemTitle: css`
      display: flex;
      flex: 1;
      align-items: center;
      cursor: pointer;
    `,

    itemTag: css`
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
      color: ${colorPrimary};
      background-image: url(${LayerIconBg});
      background-repeat: no-repeat;
      border-radius: 2;
      font-size: 30px;
    `,

    itemActions: css`
      float: right;
      height: 100%;
      cursor: pointer;

      .ant-space-item:last-child {
        margin-left: -5px !important;
      }

      &:hover [data-comp='layer-actions-item_hover-show'] {
        opacity: 1;
      }
    `,
    actionsItem: css`
      opacity: 0;
    `,
  };
};

export default useStyle;

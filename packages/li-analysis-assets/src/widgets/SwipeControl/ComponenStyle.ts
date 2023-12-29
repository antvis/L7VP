import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const {
    antCls,
    colorPrimary,
    colorTextDescription,
    colorBgContainer,
    colorBorder,
    colorText,
    colorBgElevated,
    borderRadius,
  } = useAntdToken();

  return {
    swipeControl: css`
      border-radius: ${borderRadius}px;

      .l7-control-swipe__button {
        background-color: ${colorPrimary};
      }
    `,

    swipeBtn: css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      color: ${colorTextDescription};
      font-size: 16px;
      background-color: ${colorBgContainer};
      border-radius: ${borderRadius}px;
      cursor: pointer;
      &:hover {
        color: ${colorText};
      }
    `,

    swipeBtnSelected: css`
      color: ${colorText};
    `,

    popover: css`
      ${antCls}-popover-content {
        width: 280px;
        max-height: 600px;
        overflow-y: auto;

        ${antCls}-popover-inner {
          padding: 10px 0;
        }
    `,

    popoverHeaderTitle: css`
      margin-bottom: 5px;
      padding: 2px 12px;
      font-size: 13px;
      border-bottom: ${colorBorder} solid 1px;
    `,

    layerItem: css`
      padding: 8px 12px;
      color: rgb(160, 167, 180);
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & + & {
        border-top: ${colorBorder} solid 1px;
      }
    `,

    layerName: css`
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    `,

    layerActions: css`
      ${antCls}-divider-vertical {
        border-color: ${colorTextDescription};
      }
    `,
  };
};

export default useStyle;

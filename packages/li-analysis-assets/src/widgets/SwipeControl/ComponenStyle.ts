import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const {
    antCls,
    colorPrimary,
    colorTextDescription,
    colorBgContainer,
    colorBorderSecondary,
    colorBorder,
    colorText,
    borderRadius,
  } = useAntdToken();

  return {
    l7swipe: css`
      color: #fff;

      .l7-control-swipe__button {
        color: #fff;
        background-color: ${colorPrimary};
        border: #fff solid 2px;
        border-radius: ${borderRadius}px;
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
      padding: 0 12px 5px;

      font-size: 13px;
      border-bottom: ${colorBorder} solid 1px;
    `,

    layerItem: css`
      padding: 8px 12px;
      color: ${colorText};
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
        border-color: ${colorBorderSecondary};
      }
    `,
  };
};

export default useStyle;

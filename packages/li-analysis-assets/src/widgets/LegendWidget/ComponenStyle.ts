import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorText, colorTextDescription, colorBgContainer, borderRadius, colorBorder, antCls } = useAntdToken();

  return {
    legendPopover: css`
      ${antCls}-popover-content {
        width: 330px;
        max-height: 600px;
        overflow-y: auto;

        ${antCls}-popover-inner {
          padding: 10px 0;
        }
      }
    `,

    popoverHeaderTitle: css`
      margin-bottom: 5px;
      padding: 2px 12px;
      font-size: 13px;
      border-bottom: ${colorBorder} solid 1px;
    `,

    popoveContentItem: css`
      padding: 8px 12px;
      color: rgb(160, 167, 180);
      font-size: 12px;

      & + & {
        border-top: ${colorBorder} solid 1px;
      }

      .larkmap-legend-category {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-height: 100px;
        overflow-y: auto;

        &__content {
          margin-bottom: 0;
          padding-right: 5px;

          &__shape {
            margin-right: 10px;
          }

          &__square {
            width: 20px;
            height: 10px;
          }

          &__circle {
            width: 6px;
            height: 6px;
          }
        }
      }
    `,

    itemHeader: css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      svg {
        color: ${colorTextDescription};
        font-size: 20px;
      }

      &:hover {
        svg {
          color: ${colorText};
        }
      }
    `,

    itemTitle: css`
      color: rgb(160, 167, 180);
      font-weight: 500;
      font-size: 12px;
    `,

    itemField: css`
      padding-top: 2px;
      padding-bottom: 5px;
      color: ${colorText};
      font-size: 12px;
      line-height: 1;
    `,

    legendBtn: css`
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

    legendBtnSelect: css`
      color: ${colorText};
    `,
  };
};

export default useStyle;

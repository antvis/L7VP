import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const {
    colorText,
    colorTextDescription,
    colorBgContainer,
    borderRadius,
    antCls,
    fontSize,
    colorPrimary,
    colorPrimaryHover,
  } = useAntdToken();

  return {
    measureControl: css`
      text-align: left !important;
      background-color: ${colorBgContainer};
    `,

    measureBtn: css`
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

    measureBtnSelected: css`
      color: ${colorText};
    `,

    drawContainer: css`
      display: flex;
      align-items: center;
      justify-content: space-between;

      ${antCls}-divider-vertical {
        height: 12px;
        margin: 0 6px;
        vertical-align: initial;
        opacity: 0.4;
        border-inline-start-color: ${colorTextDescription} !important;
      }

      ${antCls}-btn {
        height: 29px;
        padding: 0 !important;
      }
    `,
    drawIcon: css`
      width: 18px;
      height: 25px;
      font-size: 16px;
      line-height: 28px !important;
    `,

    drawBtn: css`
      color: ${colorPrimary};
      &:hover {
        color: ${colorPrimaryHover} !important;
      }
    `,

    drawClear: css`
      width: 18px;
      height: 25px;
      font-size: 16px;
      cursor: pointer;
    `,

    drawMarkerContent: css`
      display: flex;
      align-items: center;
      padding: 3px 5px;
      background: ${colorBgContainer};
      color: ${colorText};
      font-size: ${fontSize}px;
      border-radius: ${borderRadius}px;
    `,

    drawMarkerIcon: css`
      width: 18px;
      margin-left: 6px;
    `,
  };
};

export default useStyle;

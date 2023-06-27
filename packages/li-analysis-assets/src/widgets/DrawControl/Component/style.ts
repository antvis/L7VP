import { css } from '@emotion/css';
import { theme } from 'antd';

function useStyle() {
  const { useToken } = theme;
  const { token } = useToken();
  const {
    colorBgContainer,
    borderRadius,
    colorPrimary,
    boxShadow,
    colorBgTextHover,
    fontSize,
    colorText,
    colorTextDescription,
  } = token;

  return {
    popoverBtn: css`
      color: ${colorTextDescription};
      width: 28px;
      height: 28px;
      box-shadow: ${boxShadow};
      text-align: center;
      line-height: 28px;
      font-size: 14px;
      background-color: ${colorBgContainer};
      border-radius: ${borderRadius}px;
      cursor: pointer;
      &:hover {
        color: ${colorText};
      }
      &.selected {
        color: ${colorText};
      }
    `,

    drawTools: css`
      padding: 4px;
    `,

    divider: css`
      margin: 4px 0;
      border: 1px solid ${colorBgContainer};
    `,
    drawToolItem: css`
      display: flex;
      align-items: center;
      justify-content: start;
      font-family: PingFangSC;
      cursor: pointer;
      font-size: ${fontSize}px;
      height: 32px;
      padding: 0 8px 0 4px;
      border-radius: ${borderRadius}px;
      overflow: hidden;
      transition: all 0.2s;
      white-space: nowrap;
      svg {
        width: 26px;
        margin-right: 2px;
        font-size: 14px;
        cursor: pointer;
      }
      &:hover {
        background-color: ${colorBgTextHover};
      }
    `,

    drawToolItemAction: css`
      color: ${colorPrimary};
    `,

    drawToolContextmenu: css`
      border-radius: ${borderRadius}px;
      background-color: ${colorBgContainer};
      color: ${colorTextDescription};
    `,
  };
}

export default useStyle;

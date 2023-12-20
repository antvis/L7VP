import { css } from '@emotion/css';
import { theme } from 'antd';

function useStyle() {
  const { useToken } = theme;
  const { token } = useToken();
  const { colorBgContainer, borderRadius, colorPrimary, fontSizeSM, fontSize, colorText, colorTextDescription } = token;

  const Public = css`
    display: flex;
    flex-wrap: wrap;
  `;

  const areaPublic = css`
    width: auto;
    height: 140px;
    overflow: auto;
    scroll-behavior: smooth;
    ::-webkit-scrollbar {
      display: none;
    }
  `;

  return {
    popover: css`
      .ant-popover-arrow {
        display: none;
      }

      .ant-popover-inner {
        margin-top: -5px;
      }

      .ant-tabs-nav {
        margin: 0 0 8px 0;
      }

      .ant-popover-content {
        min-width: 400px;
        max-width: 500px;
      }
      .ant-tabs-tab-btn,
      .ant-select-selection-placeholder {
        font-size: ${fontSizeSM}px;
      }
    `,

    popoverContent: css`
      min-width: 36px;
      border-radius: ${borderRadius}px;
      background: ${colorBgContainer};
      color: ${colorTextDescription};
      cursor: pointer;
      :hover {
        color: ${colorText};
      }
    `,
    popoverTitle: css`
      display: flex;
      align-items: center;
      height: 32px;
      padding: 0 8px;
      font-size: ${fontSize}px;
    `,
    popoverTitleName: css`
      margin-right: 10px;
    `,

    tabContentTitle: Public,
    tabContentItem: css`
      margin-right: 10px;
      color: ${colorPrimary};
      cursor: pointer;
      font-size: ${fontSizeSM}px;
      margin-bottom: 8px;
    `,
    city: areaPublic,
    cityContentLabel: css`
      float: left;
      margin-right: 10px;
      font-size: ${fontSizeSM}px;
    `,
    cityValue: css`
      ${Public}
      margin-bottom: 8px
    `,
    cityItem: css`
      margin-right: 9px;
      padding-right: 4px;
      color: ${colorTextDescription};
      cursor: pointer;
      font-size: ${fontSizeSM}px;
      :hover {
        color: ${colorPrimary};
      }
    `,
    province: areaPublic,
    provinceLabel: css`
      float: left;
      margin-right: 10px;
      cursor: pointer;
      font-size: ${fontSizeSM}px;
    `,
    provinceValue: css`
      ${Public}
      margin-bottom: 8px;
    `,
    provinceItem: css`
      margin-right: 9px;
      padding-right: 4px;
      color: ${colorTextDescription};
      cursor: pointer;
      font-size: ${fontSizeSM}px;
      :hover {
        color: ${colorPrimary};
      }
    `,
    location: Public,
    locationItem: css`
      width: 18px;
      background-color: ${colorBgContainer};
      text-align: center;
      margin: 0 4px 4px 0;
      cursor: pointer;
      font-size: ${fontSizeSM}px;
      :hover {
        background-color: ${colorPrimary};
      }
    `,

    locationItemActive: css`
      background-color: ${colorPrimary};
    `,
    selectOption: css`
      .ant-select-item-option-content {
        font-size: ${fontSizeSM}px;
      }
    `,
    popoverName: css`
      display: flex;
      align-items: center;
    `,
  };
}

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorBgContainer, zIndexPopupBase } = token;

  return {
    propertiesPanel: css`
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      // 浮动面板，需要在其它控件资产上面
      z-index: ${zIndexPopupBase + 80};
      box-sizing: border-box;
      overflow-y: auto;
      text-align: start;
      background-color: ${colorBgContainer};
      transition: width 0.5s 10ms cubic-bezier(0.075, 0.82, 0.165, 1);
    `,

    panelHeader: css`
      position: sticky;
      top: 0;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding: 14px;
      background-color: ${colorBgContainer};
    `,

    panelTooltip: css`
      max-height: 300px !important;
      overflow-y: auto !important;
      font-size: 6px !important;
    `,

    panelContent: css`
      padding: 14px;
    `,

    panelHeaderTitle: css`
      width: 250px;
      overflow: hidden;
      font-weight: 600;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,

    panelHeaderLabel: css`
      opacity: 0.45;
    `,
  };
};

export default useStyle;

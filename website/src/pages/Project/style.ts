import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextSecondary, colorPrimaryText, colorText, colorBgElevated } = token;

  return {
    project: css`
      padding: 0 95px;
    `,

    projectTabs: css`
      .ant-tabs-tab-active .ant-tabs-tab-btn {
        color: ${colorText} !important;
      }
      .ant-tabs-ink-bar {
        background: ${colorText} !important;
      }
    `,

    projectCard: css`
      cursor: pointer;
    `,

    projectCardImg: css`
      height: 200px;
      object-fit: cover;
      width: 100%;
    `,

    projectCardTools: css`
      position: absolute;
      top: 10px;
      right: 10px;
      border-radius: 20px;
      &:hover {
        background: ${colorBgElevated};
      }
    `,

    itemDescription: css`
      margin-bottom: 0 !important;
    `,

    addCard: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 113px;
      color: ${colorTextSecondary};
    `,

    addCardIcon: css`
      font-size: 20px;
      margin-bottom: 12px;
    `,

    importBtnIcon: css`
      transition: transform 0.1s linear, -webkit-transform 0.1s linear;
    `,
    importBtnIconRotate: css`
      transform: rotate(180deg);
    `,
  };
};

export default useStyle;

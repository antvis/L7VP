import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { antCls, colorBgContainer, colorTextSecondary, colorText, colorPrimary } = useAntdToken();

  return {
    noviceTour: css`
      position: fixed;
      right: 40px;
      bottom: 10px;
      border-radius: 20px;
    `,

    tourPopover: css`
      z-index: 2;
    `,

    tourContent: css`
      width: 180px;
    `,

    tourContentHeader: css`
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
    `,

    tourContentMenu: css`
      padding-top: 10px;
    `,

    tourContentMenuItem: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 5px;
      font-size: 12px;
      border-radius: 5px;

      &:hover {
        background-color: ${colorBgContainer};
      }
    `,

    tourContentMenuItemSelected: css`
      background-color: ${colorBgContainer};
    `,

    tourContentMenuItemHeader: css`
      display: flex;
      align-items: center;
      height: 20px;
      color: ${colorTextSecondary};
      line-height: 20px;
      cursor: pointer;
    `,

    tourContentMenuItemHeaderSelected: css`
      color: ${colorText};
    `,

    tourContentMenuItemHeaderIndex: css`
      width: 20px;
      margin-right: 5px;
      text-align: center;
      border-radius: 50%;
    `,
    tourContentMenuItemHeaderIndexSelected: css`
      color: ${colorText};
      background-color: ${colorPrimary};
    `,

    tourContentMenuItemNext: css`
      height: 20px;
      color: ${colorPrimary};
      line-height: 20px;
      cursor: pointer;
    `,

    tourContentBtn: css`
      width: 48px;
      color: ${colorTextSecondary};
      font-size: 12px;
      border-bottom: 1px solid ${colorTextSecondary};
      cursor: pointer;
      &:hover {
        color: ${colorPrimary};
        border-bottom: 1px solid ${colorPrimary};
      }
    `,

    tourContentTour: css`
      width: 396px;
      ${antCls}-tour-content {
        width: 350px;
      }
    `,

    clearBtn: css`
      display: flex;
      margin: 20px 0 10px;
    `,

    noTour: css`
      color: ${colorTextSecondary};
      font-size: 12px;
      cursor: pointer;
      &:hover {
        color: ${colorPrimary};
      }
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextSecondary } = token;

  return {
    navCard: css`
      width: 100%;
      height: 200px;
      margin-bottom: 20px;
    `,

    navCardTitle: css`
      font-size: 20px;
      font-weight: 500;
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    `,

    navCardClosed: css`
      font-size: 16px;
      line-height: 22px;
      padding: 0;
      width: 22px;
      height: 22px;
      color: ${colorTextSecondary};
    `,

    navCardContent: css`
      display: flex;
      justify-content: space-between;
    `,

    navCardContentItem: css`
      display: flex;
      flex: 1;
      margin-right: 10px;
      align-items: flex-start;
    `,

    itemSerialNumber: css`
      margin-right: 5px;
      font-size: 16px;
      font-weight: 500;
      height: 30px;
    `,

    itemContent: css`
      display: flex;
      flex-direction: column;
      width: 100%;
    `,

    itemTitle: css`
      font-size: 16px;
      font-weight: 500;
      height: 30px;
      display: flex;
      width: 100%;
      margin-bottom: 10px;
      justify-content: space-between;
      align-items: flex-start;
    `,

    itemTitleIcon: css`
      font-size: 10px;
      color: ${colorTextSecondary};
      margin-top: 7px;
      margin-right: 20px;
    `,

    itemDesc: css`
      color: ${colorTextSecondary};
      font-size: 12px;
    `,
  };
};

export default useStyle;

import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();
  const { colorBgElevated } = token;

  return {
    cases: css`
      padding: 0 95px;
    `,

    catalogTitle: css`
      font-size: 16px;
      margin-bottom: 12px;
    `,

    caseCard: css`
      cursor: pointer;
    }
    `,

    caseImg: css`
      width: 100%;
      height: 240px;
      object-fit: cover;
    `,

    caseHead: css`
      position: absolute;
      top: 0;
      width: 100%;
      padding: 10px;
      display: flex !important;
      justify-content: space-between;
      align-items: center;
    `,

    caseTools: css`
      border-radius: 20px;
      &:hover {
        background: ${colorBgElevated};
      }
    `,

    itemDescription: css`
      margin-bottom: 0 !important;
      min-height: 44px;
    `,
  };
};

export default useStyle;

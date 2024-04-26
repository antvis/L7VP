import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextSecondary, colorPrimary } = token;

  return {
    card: css`
      cursor: pointer;
    `,

    cardTitle: css`
      display: flex;

      .ant-tag {
        position: relative;
      }
    `,

    cardDescription: css`
      height: 25px;
      overflow: hidden;
      color: ${colorTextSecondary};
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,

    cardPackage: css`
      position: relative;
      color: ${colorTextSecondary};
      font-size: 12px;
      display: flex;

      .ant-tag {
        position: relative;
      }
    `,

    cardPackageVerson: css`
      position: absolute;
      margin-left: 5px;
      color: ${colorPrimary};
    `,

    cardPackagName: css`
      line-height: 20px;
    `,

    importAsset: css`
      position: absolute;
      top: -65px;
      right: 0;
    `,
  };
};

export default useStyle;

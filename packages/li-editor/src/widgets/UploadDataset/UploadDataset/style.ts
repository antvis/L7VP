import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorTextSecondary } = useAntdToken();

  return {
    uploadDescription: css`
      color: ${colorTextSecondary};
    `,

    uploadContent: css`
      display: flex;
      height: 400px;
      overflow: hidden;
    `,

    uploadDataset: css`
      flex: 1;
    `,

    draggerContent: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    `,
    draggerContentIcon: css`
      font-size: 40px;
    `,

    draggerContentText: css`
      padding-bottom: 20px;
    `,
    uploadList: css`
      display: flex;
      flex-direction: column;
      margin-left: 10px;
    `,
    uploadListTitle: css`
      color: ${colorTextSecondary};
    `,
  };
};

export default useStyle;

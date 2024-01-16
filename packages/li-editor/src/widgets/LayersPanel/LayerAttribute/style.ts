import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorBorder, colorPrimaryHover } = useAntdToken();

  return {
    attributeHeader: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 57px;
      margin: 0 20px;
      overflow: hidden;
      font-weight: 500;
      font-size: 16px;
      border-bottom: 1px solid ${colorBorder};
    `,

    attributeTitle: css`
      display: flex;
      align-items: center;
    `,

    attributeBackIcon: css`
      margin-right: 10px;
      cursor: pointer;

      &:hover {
        color: ${colorPrimaryHover};
      }
    `,

    layerForm: css`
      height: calc(100% - 57px);
      padding: 15px 20px;
    `,

    dropdownIcon: css`
      font-size: 16px;
      cursor: pointer;
    `,
  };
};

export default useStyle;

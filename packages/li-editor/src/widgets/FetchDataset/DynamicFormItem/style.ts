import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { antCls, colorBorder } = useAntdToken();

  return {
    dynamicFormItem: css`
      display: flex;
      flex: 1;
      justify-content: space-between;
      height: 42px;
      overflow: hidden;

      ${antCls}-form-item {
        margin-bottom: 10px;
      }
    `,

    itemField: css`
      width: 200px;
    `,

    itemIcon: css`
      width: 10px;
      color: ${colorBorder};
    `,

    itemValue: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 450px;
      overflow: hidden;
    `,

    valueContent: css`
      width: 100%;

      ${antCls}-input-number {
        width: 100%;
      }

      ${antCls}-input-number-input {
        vertical-align: baseline;
      }
    `,

    valueType: css`
      margin-left: 5px;
    `,

    dynamicFormAddBtn: css`
      width: 100px;
      margin: 0;
    `,
  };
};

export default useStyle;

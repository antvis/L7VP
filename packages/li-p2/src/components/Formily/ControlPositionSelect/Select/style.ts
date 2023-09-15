import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { antCls, componentCls, controlHeight, lineWidth } = token;
  const selectHeightWithoutBorder = controlHeight - lineWidth * 2;

  return {
    [`${componentCls}-select`]: {
      [`${antCls}-select-selection-item`]: {
        height: selectHeightWithoutBorder,
      },
    },

    [componentCls]: {
      [`${componentCls}-item`]: {
        lineHeight: '30px',
      },
    },
  };
});

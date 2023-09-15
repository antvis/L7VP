import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('ribbon-select', (token) => {
  const { componentCls, antCls, controlHeight, lineWidth } = token;
  const selectHeightWithoutBorder = controlHeight - lineWidth * 2;

  return {
    [componentCls]: {
      [`${antCls}-select-selection-item`]: {
        height: selectHeightWithoutBorder,
      },

      [`${componentCls}__selection-item`]: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      },
    },
  };
});

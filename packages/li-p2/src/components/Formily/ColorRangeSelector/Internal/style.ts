import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector', (token) => {
  const { componentCls, antCls, controlHeight, lineWidth } = token;
  const selectHeightWithoutBorder = controlHeight - lineWidth * 2;
  return {
    [componentCls]: {
      maxWidth: 260,

      [`${antCls}-select-selection-item`]: {
        height: selectHeightWithoutBorder,
      },

      [`${componentCls}__selection-item`]: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',

        [`${componentCls}__selection-item-color:nth-child(1)`]: {
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        },

        [`${componentCls}__selection-item-color:last-child`]: {
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      },
    },

    [`${antCls}-select-dropdown`]: {
      maxHeight: '400px',
      overflowY: 'auto',
    },
  };
});

import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-custom-selector', (token) => {
  const { antCls, componentCls, colorTextBase, colorPrimaryActive } = token;

  return {
    [componentCls]: {
      [`${antCls}-select-selection-item`]: {
        display: 'flex',
        justifyContent: 'left',
        img: {
          width: '20px',
          marginRight: '10px',
        },
      },
    },

    [`${componentCls}__add-item`]: {
      height: '32px',
      lineHeight: '32px',
      fontSize: '16px',
      color: colorTextBase,
      '&:hover': {
        cursor: 'pointer',
        color: colorPrimaryActive,
      },
    },
  };
});

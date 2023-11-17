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

    [`${componentCls}__header`]: {
      border: '1px solid #f00',
      display: 'flex',

      '&-icon': {
        width: '30px',
        fontSize: '12px',
        color: colorTextBase,
      },
    },

    [`${componentCls}__add-item`]: {
      height: '20px',
      lineHeight: '20px',
      fontSize: '12px',
      color: colorPrimaryActive,
      border: '1px solid #f00',
      '&:hover': {
        cursor: 'pointer',
        color: colorPrimaryActive,
      },
    },
  };
});

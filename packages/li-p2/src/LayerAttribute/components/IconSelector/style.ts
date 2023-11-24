import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-list', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      [`${antCls}-select-selection-item`]: {
        display: 'flex',
        justifyContent: 'left',
        img: {
          width: '20px',
          marginRight: '10px',
        },
      },
    },
  };
});

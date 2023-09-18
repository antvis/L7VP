import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('ribbon-select', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      [`${antCls}-select-selection-item`]: {
        span: {
          marginTop: 10,
        },
      },
    },
  };
});

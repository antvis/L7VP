import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}-item`]: {
        lineHeight: '30px',
      },
    },
  };
});

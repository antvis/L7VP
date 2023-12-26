import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-string-config', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {},
  };
});

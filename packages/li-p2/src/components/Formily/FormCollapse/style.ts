import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('form-collapse', (token) => {
  const { antCls, componentCls } = token;

  return {
    [componentCls]: {
      [`${antCls}-collapse-item`]: {
        [`${antCls}-collapse-header`]: {
          padding: '12px 0 !important',
        },
      },

      [`${antCls}-collapse-content ${antCls}-collapse-content-box`]: {
        padding: '5px 0 0 25px !important',
      },
    },
  };
});

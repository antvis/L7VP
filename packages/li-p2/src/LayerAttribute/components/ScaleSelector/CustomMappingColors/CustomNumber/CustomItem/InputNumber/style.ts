import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-input__number', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      width: '100%',
      textAlign: 'right',
      display: 'flex',
      flex: 1,
      justifyContent: 'space-between',

      '&__input': {
        '&-desc': {
          fontSize: '12px !important',
          width: '50px',
        },

        [`${antCls}-input-number-input-wrap`]: {
          input: {
            fontSize: '12px',
          },
        },
      },
    },
  };
});

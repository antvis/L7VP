import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-content__custom-item__item-number', (token) => {
  const { componentCls } = token;

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

        '.ant-input-number-input-wrap': {
          input: {
            fontSize: '12px',
          },
        },
      },
    },
  };
});

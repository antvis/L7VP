import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-content__custom-item__item', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      flex: 1,
      margin: '0 5px',

      '&__input-group': {
        width: '100%',
        textAlign: 'right',
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',

        '&__input': {
          width: 50,

          '&-desc': {
            width: 50,
            fontSize: '12px !important',
            textAlign: 'center',
          },

          '.ant-input-number-handler-wrap': {
            display: 'none',
          },
          '.ant-input-number-input-wrap': {
            input: {
              fontSize: '12px',
            },
          },
        },
      },
    },
  };
});

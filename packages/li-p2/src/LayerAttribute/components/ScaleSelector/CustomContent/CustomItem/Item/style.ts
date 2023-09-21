import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-content__custom-item__item', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      flex: 1,
      margin: '0 5px',

      '&__input-group': {
        margin: '0 5px',
        display: 'flex',

        '&__input': {
          width: 60,
        },
      },
    },
  };
});

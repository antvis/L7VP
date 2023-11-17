import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-custom-selector-icon-item', (token) => {
  const {
    componentCls,
    controlItemBgHover,
    controlItemBgActive,
    colorTextBase,
    borderRadius,
    colorPrimaryActive,
    colorBgElevated,
    zIndexPopupBase,
  } = token;

  return {
    [componentCls]: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      margin: '10px 0',
      height: '28px',

      '&__select': {
        width: '100%',
      },

      '&__icon': {
        verticalAlign: 'middle',
        marginRight: '5px',
        zIndex: zIndexPopupBase + 50,

        '&__img': {
          width: '20px',
          height: '20px',
          background: controlItemBgHover,
          verticalAlign: 'middle',
          borderRadius: borderRadius,
          '&:hover': {
            background: controlItemBgActive,
          },
        },
      },

      '&__icon-popover': {
        width: '250px',
        height: '300px',
        overflowY: 'auto',

        '&__icon-content': {
          marginBottom: '10px',

          '&__header': {
            fontWeight: 500,
          },

          '&__img': {
            display: 'flex',
            flexWrap: 'wrap',

            img: {
              width: '20px',
              height: '20px',
              margin: '10px',
            },
          },
        },
      },

      '&__value': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },

      '&__delete': {
        width: '14px',
        marginLeft: '5px',

        '&:hover': {
          cursor: 'pointer',
          color: colorPrimaryActive,
        },
      },
    },
  };
});

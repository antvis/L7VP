import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-list', (token) => {
  const { componentCls, colorBorderBg, antCls, colorBorder } = token;

  return {
    [componentCls]: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 30,
      padding: '2px 11px',
      overflow: 'hidden',
      border: `1px solid ${colorBorder}`,
      borderRadius: '4px',
      cursor: 'pointer',

      [`${componentCls}-item`]: {
        display: 'flex',
        alignItems: 'center',
        width: 40,
        height: '100%',
        img: {
          height: 20,
        },
        '&__more': {
          position: 'absolute',
          right: 10,
          cursor: 'pointer',
        },
      },

      [`${componentCls}-icon`]: {
        height: '12px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.25)',
        position: 'absolute',
        right: '11px',
      },
    },

    [`${componentCls}-popover`]: {
      width: 200,
      overflow: 'hidden',

      [`${componentCls}-popover-icon-list`]: {
        display: 'flex',
        flexWrap: 'wrap',
        maxHeight: 150,
        overflowY: 'auto',

        [`${componentCls}-popover-icon-list__item`]: {
          width: 60,
          height: 60,
          marginBottom: 5,
          textAlign: 'center',
          cursor: 'pointer',
          p: {
            width: 60,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          },
          img: {
            height: 24,
            textAlign: 'center',
          },
        },
      },

      [`${componentCls}-popover-add-icon`]: {
        marginTop: 10,
        paddingTop: 10,
        borderTop: `1px solid  ${colorBorderBg}`,
        [`${antCls}-form `]: {
          [`${antCls}-form-item`]: {
            marginBottom: 10,
          },
          [`${antCls}-form-item:last-child`]: {
            float: 'right',
          },
        },
      },
    },
  };
});

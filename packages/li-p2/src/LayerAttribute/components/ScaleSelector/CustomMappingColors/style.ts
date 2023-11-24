import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__custom-range', (token) => {
  const { componentCls, lineWidth, lineType, colorTextSecondary, colorBorder, colorInfoTextHover } = token;

  return {
    [componentCls]: {
      [`${componentCls}_custom-content`]: {
        maxHeight: '200px',
        overflow: 'hidden',
        overflowY: 'auto',
      },

      [`${componentCls}__btn`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        marginTop: '10px',
        paddingTop: '10px',
        textAlign: 'right',
        borderTop: `${lineWidth}px ${lineType} ${colorBorder}`,

        span: {
          marginLeft: '20px',
          color: colorTextSecondary,
          cursor: 'pointer',
        },

        'span:hover': {
          color: colorInfoTextHover,
        },
      },
    },
  };
});

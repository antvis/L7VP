import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('rich-editor', (token) => {
  const { componentCls, colorText, colorBgElevated, colorPrimaryHover, colorPrimaryActive, colorBorder } = token;

  return {
    [componentCls]: {
      width: '100%',
      minHeight: '300px',

      '.ql-editor': {
        minHeight: '300px',
      },

      '.ql-snow .ql-picker-options': {
        backgroundColor: colorBgElevated,
      },

      // 颜色
      '.ql-snow .ql-picker': {
        color: colorText,
      },

      '.ql-snow .ql-stroke': {
        stroke: colorText,
      },

      '.ql-snow .ql-fill': {
        fill: colorText,
      },

      // 鼠标经过
      '.ql-snow.ql-toolbar .ql-picker-label:hover': {
        color: colorPrimaryHover,

        '.ql-stroke': {
          stroke: colorPrimaryHover,
        },

        '.ql-fill': {
          fill: colorPrimaryHover,
        },
      },

      '.ql-snow.ql-toolbar button:hover': {
        color: colorPrimaryHover,
        '.ql-stroke': {
          stroke: colorPrimaryHover,
        },

        '.ql-fill': {
          fill: colorPrimaryHover,
        },
      },

      '.ql-snow.ql-toolbar .ql-picker-item:hover': {
        color: colorPrimaryHover,

        '.ql-stroke': {
          stroke: colorPrimaryHover,
        },
      },

      // 选中颜色
      '.ql-snow.ql-toolbar button.ql-active': {
        color: colorPrimaryActive,
        '.ql-stroke': {
          stroke: colorPrimaryActive,
        },

        '.ql-fill': {
          fill: colorPrimaryActive,
        },
      },

      '.ql-snow.ql-toolbar .ql-picker-label.ql-active': {
        color: colorPrimaryActive,
        '.ql-stroke': {
          stroke: colorPrimaryActive,
        },

        '.ql-fill': {
          fill: colorPrimaryActive,
        },
      },

      // 边框颜色
      '.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options': {
        borderColor: colorBgElevated,
      },

      '.ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label': {
        borderColor: colorBorder,
      },

      '.ql-toolbar.ql-snow , .ql-container.ql-snow': {
        borderColor: colorBorder,
      },
    },
  };
});

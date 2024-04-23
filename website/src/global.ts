import { loader } from '@monaco-editor/react';

loader.config({
  'vs/nls': {
    availableLanguages: {
      '*': 'zh-cn',
    },
  },
  paths: {
    // 此处可根据需要调整版本和产物类型
    vs: 'https://gw.alipayobjects.com/os/lib/monaco-editor/0.43.0/min/vs',
  },
});

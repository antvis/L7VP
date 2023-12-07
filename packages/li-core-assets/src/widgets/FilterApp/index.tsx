import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FilterApp',
    displayName: '筛选组件--',
    description: '筛选组件',
    type: 'Auto',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    isOpen: true,
    trigger: 'hover',
    items: [],
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MyLayout',
    displayName: '我的布局',
    description: '',
    type: 'Layout',
    category: 'Layout',
  },
  defaultProperties: {
    showSidePanel: true,
  },
  component,
  registerForm,
});

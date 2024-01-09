import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'BaseLayout',
    displayName: '基础布局',
    description: '基础的布局组件，带有侧边栏',
    type: 'Layout',
    category: 'Layout',
    icon: ICON,
  },
  defaultProperties: {
    showSidePanel: true,
  },
  component,
  registerForm,
});

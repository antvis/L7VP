import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'Template',
    displayName: '模板组件',
    description: '****',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LayerSwitch',
    displayName: '图层选择器',
    description: '用于图层选择',
    type: 'Auto',
    category: 'MapControl',
  },
  component,
  registerForm,
});

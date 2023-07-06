import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MeasureControl',
    displayName: '距离/面积测量',
    description: '用于测量距离/面积',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
    color: '#ec25fa',
  },
  component,
  registerForm,
});

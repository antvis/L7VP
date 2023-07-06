import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ScaleControl',
    displayName: '比例尺',
    description: '地图比例尺',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'rightbottom',
  },
  component,
  registerForm,
});

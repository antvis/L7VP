import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FullscreenControl',
    displayName: '地图全屏',
    description: '地图全屏',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});

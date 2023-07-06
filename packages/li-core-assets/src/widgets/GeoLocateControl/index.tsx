import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'GeoLocateControl',
    displayName: 'GPS 定位',
    description: '地图定位',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'bottomright' as const,
  },
  component,
  registerForm,
});

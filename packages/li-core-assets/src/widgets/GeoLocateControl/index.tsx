import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'GeoLocateControl',
    displayName: 'GPS 定位',
    description: '使用 GPS 定位到地图上',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'bottomright' as const,
  },
  component,
  registerForm,
});

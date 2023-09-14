import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LocationSearchControl',
    displayName: '地名查询',
    description: 'POI 查询地理位置',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'lefttop',
  },
  component,
  registerForm,
});

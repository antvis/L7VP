import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LocationSearchControl',
    displayName: '位置查询',
    description: '用于查询地图位置',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'lefttop',
  },
  component,
  registerForm,
});

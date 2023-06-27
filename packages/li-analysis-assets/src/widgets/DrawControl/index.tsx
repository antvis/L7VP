import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'DrawControl',
    displayName: '绘制组件',
    description: '用于地图绘制',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});

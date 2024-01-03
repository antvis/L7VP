import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'SwipeControl',
    displayName: '卷帘对比',
    description: '用于分屏对比两个地图上叠加图层',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
    defaultOpen: false,
    orientation: 'vertical',
    defaultLeftLayers: [],
    defaultRightLayers: [],
  },
  component,
  registerForm,
});

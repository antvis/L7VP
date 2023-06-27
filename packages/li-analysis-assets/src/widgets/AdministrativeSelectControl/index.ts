import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AdministrativeSelectControl',
    displayName: '行政区域选择器',
    description: '用于选择行政名地图跳转到行政区域',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'lefttop',
    showBounds: false,
  },
  component,
  registerForm,
});

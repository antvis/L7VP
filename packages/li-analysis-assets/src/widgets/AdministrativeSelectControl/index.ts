import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';
import { ICON } from './constant';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AdministrativeSelectControl',
    displayName: '行政区域选择器',
    description: '选择行政名地图切换到行政区域',
    type: 'Auto',
    category: 'MapControl',
    icon: ICON,
  },
  defaultProperties: {
    position: 'lefttop',
    showBounds: false,
  },
  component,
  registerForm,
});

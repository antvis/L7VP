import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constant';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ScaleControl',
    displayName: '比例尺',
    description: '地图比例尺',
    type: 'Auto',
    category: 'MapControl',
    icon: ICON,
  },
  defaultProperties: {
    position: 'rightbottom',
  },
  component,
  registerForm,
});

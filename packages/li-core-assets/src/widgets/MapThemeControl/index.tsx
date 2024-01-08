import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MapThemeControl',
    displayName: '底图主题切换',
    description: '地图底图主题样式切换',
    type: 'Auto',
    category: 'MapControl',
    icon: ICON,
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});

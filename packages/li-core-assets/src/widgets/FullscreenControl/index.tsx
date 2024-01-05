import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constant';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FullscreenControl',
    displayName: '全屏切换',
    description: '全屏模式下看地图',
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

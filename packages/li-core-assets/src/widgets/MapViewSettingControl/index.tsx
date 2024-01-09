import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { MapViewSettingControlSvg } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MapViewSettingControl',
    displayName: '倾角调整',
    description: '调整地图视角',
    type: 'Auto',
    category: 'MapControl',
    icon: MapViewSettingControlSvg,
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});

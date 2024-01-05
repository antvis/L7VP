import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constant';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MouseLocationControl',
    displayName: '光标经纬度',
    description: '显示光标在地图上的经纬度信息',
    type: 'Auto',
    category: 'MapControl',
    icon: ICON,
  },
  defaultProperties: {
    position: 'leftbottom',
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MouseLocationControl',
    displayName: '光标经纬度',
    description: '光标经纬度',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'leftbottom',
  },
  component,
  registerForm,
});

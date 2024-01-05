import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constant';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ExportImageControl',
    displayName: '截图地图',
    description: '地图截图并导出',
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

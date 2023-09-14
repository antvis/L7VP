import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'DrawControl',
    displayName: '绘制图形',
    description: '地图上绘制点、线、面、圆数据',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
  },
  component,
  registerForm,
});

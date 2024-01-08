import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { DrawSvg } from './Component/constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MeasureControl',
    displayName: '测距测面',
    description: '地图上测量距离与面积',
    type: 'Auto',
    category: 'MapControl',
    icon: DrawSvg,
  },
  defaultProperties: {
    position: 'topright',
    color: '#ec25fa',
  },
  component,
  registerForm,
});

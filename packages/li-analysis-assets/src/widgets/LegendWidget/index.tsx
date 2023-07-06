import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LegendWidget',
    displayName: '图例组件',
    description: '用于图层图例',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'bottomright',
    open: false,
  },
  component,
  registerForm,
});

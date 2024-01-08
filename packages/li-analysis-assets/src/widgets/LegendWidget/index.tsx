import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { LegendWidgetSvg } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LegendWidget',
    displayName: '图例',
    description: '显示地图上图层的图例信息',
    type: 'Auto',
    category: 'MapControl',
    icon: LegendWidgetSvg,
  },
  defaultProperties: {
    position: 'bottomright',
    open: false,
  },
  component,
  registerForm,
});

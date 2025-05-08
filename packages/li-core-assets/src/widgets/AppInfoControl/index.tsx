import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ApplicationInformationControl',
    displayName: '应用信息',
    description: '用于展示应用信息',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright',
    open: true,
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'PropertiesPanel',
    displayName: '属性面板',
    description: '图层属性面板',
    category: 'LayerInteraction',
    type: 'Auto',
    icon: '',
    defaultProperties: {
      isOpen: true,
      items: [],
    },
  },
  component,
  registerForm,
});

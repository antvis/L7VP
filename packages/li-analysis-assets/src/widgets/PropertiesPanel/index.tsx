import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'PropertiesPanel',
    displayName: '属性面板',
    description: '面板形式展示图层的额外信息',
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

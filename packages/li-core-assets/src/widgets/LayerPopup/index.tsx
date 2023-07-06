import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LayerPopup',
    displayName: '图层信息框',
    description: '图层信息框',
    type: 'Auto',
    category: 'LayerInteraction',
  },
  defaultProperties: {
    isOpen: true,
    trigger: 'hover',
    items: [],
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LayerPopup',
    displayName: '信息框',
    description: '弹窗形式展示图层的额外信息',
    type: 'Auto',
    category: 'LayerInteraction',
    icon: ICON,
  },
  defaultProperties: {
    isOpen: true,
    trigger: 'hover',
    items: [],
  },
  component,
  registerForm,
});

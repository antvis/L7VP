import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'RightClickMenu',
    displayName: '右键菜单',
    description: '地图右键展示菜单',
    type: 'Auto',
    category: 'MapInteraction',
    icon: ICON,
  },
  defaultProperties: {
    showRightMenu: true,
  },
  component,
  registerForm,
});

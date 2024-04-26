import { implementEditorWidget } from '@antv/li-editor';
import NavLogo from './NavLogo';

export default implementEditorWidget({
  version: 'v0.1',
  component: NavLogo,
  metadata: {
    name: 'NavLogo',
    displayName: 'Logo',
    description: '导航栏 Logo',
  },
  container: {
    type: 'SideNav',
    slot: 'top',
  },
});

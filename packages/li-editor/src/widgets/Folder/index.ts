import { implementEditorWidget } from '../../utils';
import Folder from './Folder';

export default implementEditorWidget({
  version: 'v0.1',
  component: Folder,
  metadata: {
    name: 'Folder',
    displayName: '折叠器',
    description: '面板折叠器',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

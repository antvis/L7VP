import { implementEditorWidget } from '@antv/li-editor';
import Share from './Share';

export default implementEditorWidget({
  version: 'v0.1',
  component: Share,
  metadata: {
    name: 'Share',
    displayName: '分享',
    description: '分享编辑结果',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

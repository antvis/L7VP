import { implementEditorWidget } from '@antv/li-editor';
import Preview from './Preview';

export default implementEditorWidget({
  version: 'v0.1',
  component: Preview,
  metadata: {
    name: 'Preview',
    displayName: '预览',
    description: '预览编辑结果',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

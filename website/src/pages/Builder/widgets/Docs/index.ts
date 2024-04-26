import { implementEditorWidget } from '@antv/li-editor';
import Docs from './Docs';

export default implementEditorWidget({
  version: 'v0.1',
  component: Docs,
  metadata: {
    name: 'Docs',
    displayName: '文档',
    description: '用户指南',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

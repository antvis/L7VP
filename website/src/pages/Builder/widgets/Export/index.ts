import { implementEditorWidget } from '@antv/li-editor';
import Export from './Export';

export default implementEditorWidget({
  version: 'v0.1',
  component: Export,
  metadata: {
    name: 'Export',
    displayName: '导出',
    description: '数据与应用导出',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

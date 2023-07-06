import { implementEditorWidget } from '../../utils';
import Export from './Export';

export default implementEditorWidget({
  version: 'v0.1',
  component: Export,
  metadata: {
    name: 'Export',
    displayName: '导出',
    description: '数据导出',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

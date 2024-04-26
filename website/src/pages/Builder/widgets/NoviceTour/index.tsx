import { implementEditorWidget } from '@antv/li-editor';
import NoviceTour from './NoviceTour';

export default implementEditorWidget({
  version: 'v0.1',
  component: NoviceTour,
  metadata: {
    name: 'NoviceTour',
    displayName: '新手引导',
    description: '用于引导分析操作',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

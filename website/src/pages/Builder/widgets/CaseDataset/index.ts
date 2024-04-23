import { implementEditorWidget } from '@antv/li-editor';
import CaseDataset from './CaseDataset';

export default implementEditorWidget({
  version: 'v0.1',
  component: CaseDataset,
  metadata: {
    name: 'CaseDataset',
    displayName: '示例数据',
    description: '示例数据集',
  },
  container: {
    type: 'Datasets',
    slot: 'addDataset',
  },
});

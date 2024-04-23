import { implementEditorWidget } from '@antv/li-editor';
import DatasetPreview from './DatasetPreview';

export default implementEditorWidget({
  version: 'v0.1',
  component: DatasetPreview,
  metadata: {
    name: 'DatasetPreview',
    displayName: '数据预览',
    description: '预览数据集',
  },
  container: {
    type: 'Datasets',
    slot: 'preview',
  },
});

import { implementEditorWidget } from '../../utils';
import UploadDataset from './UploadDataset';

export default implementEditorWidget({
  version: 'v0.1',
  component: UploadDataset,
  metadata: {
    name: 'UploadDataset',
    displayName: '文件上传',
    description: '静态文件上传数据集',
  },
  container: {
    type: 'Datasets',
    slot: 'addDataset',
  },
});

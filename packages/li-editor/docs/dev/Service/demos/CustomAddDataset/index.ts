import { implementEditorWidget } from '@antv/li-editor';
import CustomAddDataset from './CustomAddDataset';

export default implementEditorWidget({
  version: 'v0.1',
  component: CustomAddDataset,
  metadata: {
    name: 'MyAddDataset',
    displayName: '我的新增数据集',
    description: '自定义新增数据集',
  },
  container: {
    type: 'Datasets',
    slot: 'addDataset',
  },
});

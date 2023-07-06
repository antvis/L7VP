import { implementEditorWidget } from '../../utils';
import TilesetsDataset from './TilesetsDataset';

export default implementEditorWidget({
  version: 'v0.1',
  component: TilesetsDataset,
  metadata: {
    name: 'TilesetsDataset',
    displayName: '瓦片数据集',
    description: '瓦片数据集',
  },
  container: {
    type: 'Datasets',
    slot: 'addDataset',
  },
});

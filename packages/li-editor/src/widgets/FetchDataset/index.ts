import { implementEditorWidget } from '../../utils';
import FetchDataset from './FetchDataset';

export default implementEditorWidget({
  version: 'v0.1',
  component: FetchDataset,
  metadata: {
    name: 'FetchDataset',
    displayName: 'HTTP 请求',
    description: 'HTTP 请求',
  },
  container: {
    type: 'Datasets',
    slot: 'addDataset',
  },
});

import { implementService } from '@antv/li-sdk';
import { getFetchData } from './helper';

export default implementService({
  version: 'v0.1',
  metadata: {
    name: 'GET_FETCH_DATA_LIST',
    displayName: '通过 fetch 获取数据',
    type: 'Dataset',
  },
  service: getFetchData,
});

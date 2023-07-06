import { implementService } from '@antv/li-sdk';
import { joinAdcodeData } from './helper';

export default implementService({
  version: 'v0.1',
  metadata: {
    name: 'JOIN_ADCODE_DATA',
    displayName:
      '行政元数据信息关联地理数据，数据带有行政名称或行政编吗，支持国/省/市/县/市，地理数据列支持行政中心点或行政区域边界，返回插入新的地理数据列的数据',
    type: 'Custom',
  },
  service: joinAdcodeData,
});

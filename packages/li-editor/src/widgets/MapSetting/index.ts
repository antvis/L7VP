import { implementEditorWidget } from '../../utils';
import MapSetting from './MapSetting';

export default implementEditorWidget({
  version: 'v0.1',
  component: MapSetting,
  metadata: {
    name: 'MapSetting',
    displayName: '地图初始化配置',
    description: '修改地图初始化配置，center 和 zoom',
  },
  container: {
    type: 'SideNav',
    slot: 'bottom',
  },
});

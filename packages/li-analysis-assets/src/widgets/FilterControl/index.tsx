import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FilterControl',
    displayName: '数据筛选器',
    description: '在地图上的实时筛选数据，支持默认值设置',
    type: 'Auto',
    category: 'DataAnalysis',
    icon: ICON,
  },
  defaultProperties: {
    defaultFilters: [],
  },
  component,
  registerForm,
});

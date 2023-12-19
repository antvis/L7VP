import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FilterControl',
    displayName: '筛选组件',
    description: '在右侧地图上添加筛选条件，供实时筛选',
    type: 'Auto',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    defaultFilters: [],
  },
  component,
  registerForm,
});

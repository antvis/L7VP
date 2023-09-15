import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FilterWidget',
    displayName: '数据筛选器',
    description: '用于添加筛选条件过滤数据',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    showAddFilter: false,
    showDeleteFilter: false,
  },
  component,
  registerForm,
});

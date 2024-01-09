import { implementWidget } from '@antv/li-sdk';
import component from './Component/index';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'FilterWidget',
    displayName: '条件过滤器',
    description: '用于动态添加筛选条件来过滤数据',
    type: 'Atom',
    category: 'DataAnalysis',
    icon: ICON,
  },
  defaultProperties: {
    showAddFilter: false,
    showDeleteFilter: false,
    showFilterRelation: false,
  },
  component,
  registerForm,
});

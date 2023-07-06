import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export const DataseInfor = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'DataseInfor',
    displayName: '数据源信息',
    description: '数据源消费组件',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component,
  registerForm,
});

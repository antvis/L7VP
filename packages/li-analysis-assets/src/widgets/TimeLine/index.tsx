import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { TimeAxisSvg } from './Component/constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'TimeLine',
    displayName: '时间轴',
    description: '用于在时间维度对数据进行筛选',
    type: 'Auto',
    category: 'DataAnalysis',
    icon: TimeAxisSvg,
  },
  component,
  registerForm,
});

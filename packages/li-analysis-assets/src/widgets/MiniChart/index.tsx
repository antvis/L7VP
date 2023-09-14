import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './register-form';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'MiniChart',
    displayName: '统计图表',
    description: '以图表的形式展示数据',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    chartType: 'column',
    showLegend: false,
    adaptive: true,
    aggregationMethod: 'count',
    theme: 'dark',
  },
  component,
  registerForm,
});

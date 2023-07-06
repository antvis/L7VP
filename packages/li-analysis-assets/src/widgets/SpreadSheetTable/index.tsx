import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'SpreadSheetTable',
    displayName: '统计表格',
    description: '用于统计数据表格形式展示',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  defaultProperties: {
    layoutWidthType: 'colAdaptive',
    colHeader: [],
    theme: 'dark',
    showSeriesNumber: false,
    adaptive: true,
    frozenCol: false,
    showPagination: false,
  },
  component,
  registerForm,
});

import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { ICON } from './constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'SpreadSheetTable',
    displayName: '统计表格',
    description: '以表格的形式展示数据',
    type: 'Atom',
    category: 'DataAnalysis',
    icon: ICON,
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

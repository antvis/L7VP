import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AnalysisLayout',
    displayName: '分析布局',
    description: '用于分析场景的布局，带有侧边栏、底部栏、折叠面板',
    type: 'Layout',
    category: 'Layout',
  },
  defaultProperties: {
    showSidePanel: false,
    showBottomPanel: false,
    showFloatPanel: false,
    collapsedFloatPanel: false,
  },
  component,
  registerForm,
});

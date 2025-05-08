import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AppIntroductionControl',
    displayName: '应用描述控件',
    description: '利用富文本编辑器，添加应用描述信息',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topright' as const,
    width: 300,
  },
  component,
  registerForm,
});

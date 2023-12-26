import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AppIntroductionControl',
    displayName: '应用简介',
    description: '添加应用介绍说明信息',
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

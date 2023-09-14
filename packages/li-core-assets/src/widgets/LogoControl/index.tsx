import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LogoControl',
    displayName: 'Logo',
    description: '自定义 Logo 图标',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'leftbottom' as const,
    url: 'https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*GRb1TKp4HcMAAAAAAAAAAAAAARQnAQ',
    width: 89,
    height: 16,
  },
  component,
  registerForm,
});

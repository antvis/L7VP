import { implementWidget } from '@antv/li-sdk';
import component from './Component';
import registerForm from './registerForm';
import { VectorTileSvg } from './Component/constants';

export default implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'VectorTilesLoaderControl',
    displayName: '矢量瓦片加载器',
    description: '用于加载矢量瓦片图层，方便可视化验证矢量瓦片数据',
    type: 'Auto',
    category: 'MapControl',
    icon: VectorTileSvg,
  },
  defaultProperties: {
    position: 'topleft',
  },
  component,
  registerForm,
});

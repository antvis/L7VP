import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="62px" height="62px" style={{ fill: 'currentcolor' }}>
    <g>
      <polygon
        id="Path"
        points="12.1949893 42.9771532 3 37.4596134 12.2699446 31.9771532 21 37.45407"
        style={{ opacity: 0.6 }}
      />
      <polygon points="22.2609912 37 13.0660019 31.4824602 22.3359466 26 31.0660019 31.4769168" />
      <polygon points="32.1949893 21 23 15.4824602 32.2699446 10 41 15.4769168" />
      <polygon points="22.2609912 49 13.0660019 43.4824602 22.3359466 38 31.0660019 43.4769168" />
      <polygon
        points="32.3269931 43.0228468 23.1320038 37.505307 32.4019485 32.0228468 41.1320038 37.4997636"
        style={{ opacity: 0.6 }}
      />
      <polygon points="42.3269931 37.0228468 33.1320038 31.505307 42.4019485 26.0228468 51.1320038 31.4997636" />
      <polygon
        points="32.2609912 55 23.0660019 49.4824602 32.3359466 44 41.0660019 49.4769168"
        style={{ opacity: 0.6 }}
      />
      <polygon points="42.3269931 49.0228468 33.1320038 43.505307 42.4019485 38.0228468 51.1320038 43.4997636" />
      <polygon
        points="53.3269931 43.0228468 44.1320038 37.505307 53.4019485 32.0228468 62.1320038 37.4997636"
        style={{ opacity: 0.4 }}
      />
    </g>
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'MVTLayer',
    displayName: '矢量瓦片',
    description: '用于矢量瓦片服务展示',
    type: 'Layer',
    icon: ICON,
    color: '#5558db',
  },
  defaultVisConfig: {
    visible: true,
    radius: 6,
    fillColor: 'rgb(90, 216, 166)',
    opacity: 0.6,
    strokeColor: 'rgb(146, 112, 202)',
    lineWidth: 0.5,
    lineOpacity: 0.75,
    minZoom: 0,
    maxZoom: 24,
    blend: 'normal',
  },
  component,
  registerForm,
});

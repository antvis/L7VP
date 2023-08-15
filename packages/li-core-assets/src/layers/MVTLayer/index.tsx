import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const TMSICON = () => (
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

const ICON = () => (
  <svg viewBox="0 0 56 56" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <path d="m27.55,22.84L1.87,37.3l26.58,14.97,25.68-14.46-26.58-14.97Z" style={{ opacity: 0.6 }} />
    <path d="m27.55,14.32L1.87,28.78l26.58,14.97,25.68-14.46-26.58-14.97Z" style={{ opacity: 0.6 }} />
    <path d="m27.55,3.73L1.87,18.19l26.58,14.97,25.68-14.46L27.55,3.73Z" style={{ opacity: 0.6 }} />
    <path
      d="m9.93,20.28h3.17l1.65,2.86,1.6-2.86h3.14l-2.9,4.51,3.17,4.8h-3.23l-1.84-2.99-1.84,2.99h-3.21l3.21-4.85-2.92-4.46Z"
      fill="#c0c0c0"
    />
    <path d="m21.1,20.28h3.19l1.88,3.14,1.88-3.14h3.18l-3.62,5.41v3.9h-2.88v-3.9l-3.62-5.41Z" fill="#c0c0c0" />
    <path d="m33.28,20.28h8.14v1.86l-5.22,5.45h5.41v2h-8.83v-1.93l5.17-5.39h-4.67v-1.99Z" fill="#c0c0c0" />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'MVTLayer',
    displayName: '矢量瓦片',
    description: '用于矢量瓦片服务展示',
    type: 'Layer',
    icon: TMSICON,
    color: '#5558db',
  },
  defaultVisConfig: {
    visible: true,
    zIndex: 0,
    style: {
      opacity: 1,
    },
    minZoom: 0,
    maxZoom: 24,
    blend: 'normal',
  },
  component,
  registerForm,
});

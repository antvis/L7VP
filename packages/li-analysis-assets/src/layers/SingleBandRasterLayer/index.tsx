// @ts-ignore
import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="6 0 48 48" width="62px" height="62px" style={{ fill: 'currentcolor' }}>
    <g>
      <path
        d="M38.244 36.0125C39.0513 35.2052 39.0513 33.8928 38.244 33.0855C37.6319 32.4735 36.6666 32.3479 35.9007 32.6936L33.8528 30.6463L37.2683 27.2302C37.398 27.1004 37.4705 26.9252 37.4705 26.7423C37.4705 26.5595 37.398 26.3835 37.2683 26.2545L31.9001 20.887L32.8764 19.9113L34.3399 21.3755C34.4745 21.5101 34.6511 21.5777 34.8278 21.5777C35.0044 21.5777 35.181 21.5101 35.3156 21.3755L42.1459 14.5452C42.4157 14.2754 42.4157 13.8393 42.1459 13.5695L38.2433 9.66621C37.9735 9.39642 37.5374 9.39642 37.2676 9.66621L30.4366 16.4965C30.3069 16.6262 30.2344 16.8015 30.2344 16.9843C30.2344 17.1672 30.3069 17.3431 30.4366 17.4722L31.9001 18.9364L30.9244 19.912L28.4853 17.4729C28.0513 17.0389 27.4392 16.8091 26.7161 16.8091C25.2078 16.8091 23.2682 17.811 21.655 19.4242C20.5379 20.5413 19.7016 21.8199 19.3 23.0253C18.8439 24.3922 18.9874 25.539 19.703 26.2545L22.1428 28.6943L21.1671 29.6707L19.703 28.2065C19.5732 28.0768 19.398 28.0043 19.2151 28.0043C19.0323 28.0043 18.8563 28.0768 18.7273 28.2065L11.897 35.0368C11.7673 35.1658 11.6948 35.3411 11.6948 35.5246C11.6948 35.7082 11.7673 35.8834 11.897 36.0125L15.8003 39.9151C15.9349 40.0497 16.1115 40.1173 16.2882 40.1173C16.4648 40.1173 16.6414 40.0497 16.776 39.9151L23.6063 33.0855C23.736 32.9558 23.8085 32.7812 23.8085 32.5977C23.8085 32.4141 23.736 32.2389 23.6063 32.1098L22.1421 30.6463L23.1185 29.67L28.4853 35.0368C28.615 35.1665 28.7903 35.239 28.9731 35.239C29.156 35.239 29.3319 35.1665 29.4609 35.0368L32.8764 31.622L34.9182 33.663C34.5538 34.4317 34.6808 35.377 35.3156 36.0125C35.7061 36.403 36.2264 36.619 36.7798 36.619C37.3325 36.619 37.8527 36.403 38.244 36.0125Z"
        fill="currentColor"
      />
      <path
        d="M36.6146 39.3087C37.9049 39.3087 39.1173 38.8063 40.0281 37.8955C40.9402 36.984 41.4426 35.771 41.4419 34.48C41.4419 34.0985 41.1328 33.79 40.7519 33.79C40.3703 33.79 40.0619 34.0992 40.0619 34.48C40.0619 35.4026 39.7031 36.2692 39.0524 36.9199C38.4024 37.5699 37.5365 37.9287 36.6146 37.9287C36.6133 37.9287 36.6119 37.9287 36.6119 37.9287C36.231 37.9287 35.9219 38.2371 35.9219 38.618C35.9219 38.9995 36.2303 39.3087 36.6112 39.3087C36.6126 39.3087 36.6133 39.3087 36.6146 39.3087Z"
        fill="currentColor"
      />
      <path
        d="M36.6119 40.69C36.2303 40.69 35.9219 40.9985 35.9219 41.38C35.9219 41.7616 36.2303 42.07 36.6119 42.07C40.7974 42.07 44.2026 38.6649 44.2026 34.48C44.2026 34.0985 43.8941 33.79 43.5126 33.79C43.131 33.79 42.8226 34.0985 42.8226 34.48C42.8226 37.9045 40.0363 40.69 36.6119 40.69Z"
        fill="currentColor"
      />
      <path
        d="M46.2719 33.79C45.8903 33.79 45.5819 34.0985 45.5819 34.48C45.5819 39.426 41.5578 43.45 36.6119 43.45C36.2303 43.45 35.9219 43.7585 35.9219 44.14C35.9219 44.5216 36.2303 44.83 36.6119 44.83C42.3189 44.83 46.9619 40.187 46.9619 34.48C46.9619 34.0985 46.6534 33.79 46.2719 33.79Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'SingleBandRasterLayer',
    displayName: '单波段栅格',
    description: '单波段栅格数据渲染、根据栅格数据进行可视化着色',
    type: 'Layer',
    icon: ICON,
    color: 'purple',
  },
  defaultVisConfig: {
    blend: 'normal',
    style: {
      clampLow: true,
      clampHigh: true,
      noDataValue: -9999999,
      rampColors: {
        type: 'quantize',
        colors: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
        positions: [],
      },
    },
  },
  component,
  registerForm,
});

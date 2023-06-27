import type { TooltipPlacement } from 'antd/es/tooltip';
import React from 'react';

export const CLS_PREFIX = 'li-analysis-vector-tiles-loader-control';

export const VectorTileSvg = () => (
  <svg viewBox="0 0 1024 1024" version="1.1" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <path d="M128 128h768v768H128z" fill="gray" />
    <path d="M928 928H128a32 32 0 0 1-32-32V96h800a32 32 0 0 1 32 32v800zM896 128H288v160H128v608h448V576h320V128z m-160 640h-128v128h128v-128z m160 0h-128v128h128v-128z m0-160h-128v128h128v-128z m-160 0h-128v128h128v-128zM256 128H128v128h128V128z" />
    <path d="M896 576v320H576V576h320zM256 128v128H128V128h128z" />
    <path d="M288 608v288H256v-288h32z m-32-32v32H128v-32h128zM896 256v32h-288V256h288z m-288-128v128h-32V128h32z" />
    <path d="M288 288h288v288H288z" />
    <path d="M608 256v352H256V256h352z m-32 32H288v288h288V288z" />
  </svg>
);

export const POPOVER_PLACEMENT_LEGEND = new Map<string | undefined, TooltipPlacement>([
  ['topleft', 'rightTop'],
  ['lefttop', 'rightTop'],
  ['topright', 'leftTop'],
  ['righttop', 'leftTop'],
  ['bottomleft', 'rightBottom'],
  ['leftbottom', 'rightBottom'],
  ['bottomright', 'leftBottom'],
  ['rightbottom', 'leftBottom'],
  [undefined, 'rightTop'],
]);

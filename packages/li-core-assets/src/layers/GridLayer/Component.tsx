import type { HeatmapLayerProps } from '@antv/larkmap';
import { HeatmapLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface GridLayerWrapperProps extends ImplementLayerProps, HeatmapLayerProps {}

const GridLayerWrapper: React.FC<GridLayerWrapperProps> = (props) => {
  return <HeatmapLayer {...props} shape="square" />;
};

export default GridLayerWrapper;

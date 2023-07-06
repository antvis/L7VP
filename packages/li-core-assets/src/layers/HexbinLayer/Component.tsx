import type { HeatmapLayerProps } from '@antv/larkmap';
import { HeatmapLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface HexbinLayerWrapperProps extends ImplementLayerProps, HeatmapLayerProps {}

const HexbinLayerWrapper: React.FC<HexbinLayerWrapperProps> = (props) => {
  return <HeatmapLayer {...props} shape="hexagon" />;
};

export default HexbinLayerWrapper;

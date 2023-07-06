import type { RasterLayerProps } from '@antv/larkmap';
import { RasterLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface TileLayerProps extends ImplementLayerProps, RasterLayerProps {}

const TileLayer: React.FC<TileLayerProps> = (props) => {
  return <RasterLayer {...props} />;
};

export default TileLayer;

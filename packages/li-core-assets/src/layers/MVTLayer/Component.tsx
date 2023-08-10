import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';
import type { MVTLayerProps } from './mvt-layer';
import MVTLayer from './mvt-layer';

type Tilestats = {
  layerCount: number;
  layers: TilestatsLayer[];
};

type TilestatsLayer = {
  layer: string;
  count: number;
  geometry: 'Polygon' | 'LineString' | 'Point';
  attributeCount: number;
  attributes: Attribute[];
};

type Attribute = {
  attribute: string;
  count: number;
  type: 'string' | 'number';
  values: (number | string)[];
  min?: number;
  max?: number;
};

export type MVTLayerWrapperProps = ImplementLayerProps

const MVTLayerWrapper: React.FC<MVTLayerWrapperProps> = (props) => {
  // TODO: get metadata
  const source = { url: '', parser: { minZoom: 0 } };

  const vectorLayers: MVTLayerProps['vectorLayers'] = [];

  return <MVTLayer source={source} vectorLayers={vectorLayers} />;
};

export default MVTLayerWrapper;

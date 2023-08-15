import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';
import MVTLayer from './mvt-layer';
import type { MVTLayerSource } from './type';

export interface MVTLayerWrapperProps extends ImplementLayerProps {
  source: MVTLayerSource;
}

const MVTLayerWrapper: React.FC<MVTLayerWrapperProps> = (props) => {
  const { source } = props;
  const metadataUrl = props.source.parser.metadataUrl;

  return <MVTLayer source={source} metadataUrl={metadataUrl} />;
};

export default MVTLayerWrapper;

import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';
import type { MVTLayerProps } from './mvt-layer';
import MVTLayer from './mvt-layer';
import type { MVTLayerSource } from './type';

export interface MVTLayerWrapperProps extends ImplementLayerProps, MVTLayerProps {
  source: MVTLayerSource;
}

const MVTLayerWrapper: React.FC<MVTLayerWrapperProps> = (props) => {
  const { source } = props;
  const metadataUrl = source.parser.metadataUrl;

  return <MVTLayer {...props} metadataUrl={metadataUrl} />;
};

export default MVTLayerWrapper;

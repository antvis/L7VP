import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';
import type { MVTLayerProps } from './mvt-layer';
import MVTLayer from './mvt-layer';
import type { MVTLayerSource } from './type';

export interface MVTLayerWrapperProps extends ImplementLayerProps, Omit<MVTLayerProps, 'source'> {
  source: MVTLayerSource;
}

const MVTLayerWrapper: React.FC<MVTLayerWrapperProps> = (props) => {
  const { source } = props;
  const { data, parser } = source;
  const metadataUrl = parser.metadataUrl;

  const mVTLayerSource = {
    data: data,
    parser,
  };

  return <MVTLayer {...props} metadataUrl={metadataUrl} source={mVTLayerSource} />;
};

export default MVTLayerWrapper;

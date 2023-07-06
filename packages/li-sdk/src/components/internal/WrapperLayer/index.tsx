import React, { memo } from 'react';
import { useRegistryManager } from '../../../hooks/internal';
import type { LayerSchema } from '../../../specs';
import { useLayerProps } from './hooks/useLayerProps';

export type WrapperLayerProps = {
  layer: LayerSchema;
};

const WrapperLayer: React.FC<WrapperLayerProps> = (props) => {
  const { layer } = props;
  const { id, type, metadata, visConfig, sourceConfig } = layer;
  const registryManager = useRegistryManager();
  const ImplLayer = registryManager.getLayer(type).component;

  const layerProps = useLayerProps(visConfig, sourceConfig);

  return <ImplLayer id={id} name={metadata.name} {...layerProps} />;
};

export default memo(WrapperLayer);

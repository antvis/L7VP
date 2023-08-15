import type { ITileParserCFG } from '@antv/l7';
import { Source } from '@antv/l7';
import type { PointLayerProps } from '@antv/larkmap';
import { LineLayer, PointLayer, PolygonLayer } from '@antv/larkmap';
import React, { useEffect, useRef, useState } from 'react';
import type { MVTMetadata } from './type';

export interface MVTLayerProps extends Omit<PointLayerProps, 'source'> {
  source: { data: string; parser: Partial<Omit<ITileParserCFG, 'type'>> };
  metadataUrl: string;
}

const MVTLayer: React.FC<MVTLayerProps> = (props) => {
  const { source, metadataUrl } = props;
  const [metadata, setMetadata] = useState<MVTMetadata>();
  const vectorSourceRef = useRef<Source>();

  useEffect(() => {
    fetch(metadataUrl)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data !== 'object') return;
        const json = typeof data.json === 'string' ? JSON.parse(data.json) : data.json;
        const _metadata: MVTMetadata = { ...data, tilestats: json.tilestats, vector_layers: json.vector_layers };
        setMetadata(_metadata);
      });
  }, [metadataUrl]);

  useEffect(() => {
    return () => {
      if (vectorSourceRef.current) {
        vectorSourceRef.current.destroy();
      }
    };
  }, []);

  if (!metadata) return null;

  const { minzoom, maxzoom, tilestats, bounds, vector_layers } = metadata;
  if (!vectorSourceRef.current) {
    const extent = bounds.split(',').map((n) => Number(n));
    vectorSourceRef.current = new Source(source.data, {
      parser: { type: 'mvt', ...source.parser, minZoom: minzoom, maxZoom: maxzoom, extent },
    });
  }

  const vectorSource = vectorSourceRef.current;
  const vectorLayers = vector_layers.map((layer) => ({
    ...layer,
    geometry: tilestats.layers.find((l) => l.layer === layer.id)?.geometry,
  }));

  return vectorLayers.map((vectorLayer) => {
    if (vectorLayer.geometry === 'Point') {
      return (
        <PointLayer key={vectorLayer.id} source={vectorSource} sourceLayer={vectorLayer.id} shape="circle" size={5} />
      );
    } else if (vectorLayer.geometry === 'LineString') {
      return (
        <LineLayer key={vectorLayer.id} source={vectorSource} sourceLayer={vectorLayer.id} shape="line" size={1} />
      );
    } else if (vectorLayer.geometry === 'Polygon') {
      return <PolygonLayer key={vectorLayer.id} source={vectorSource} sourceLayer={vectorLayer.id} shape="fill" />;
    }

    return null;
  });
};

export default MVTLayer;

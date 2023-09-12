import type { ITileParserCFG } from '@antv/l7';
import { Source } from '@antv/l7';
import type { CompositeLayerOptions } from '@antv/l7-composite-layers/dist/esm/core/composite-layer';
import type { PointLayerProps } from '@antv/larkmap';
import { LineLayer, PointLayer, PolygonLayer } from '@antv/larkmap';
import { pick } from 'lodash-es';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import type { MVTMetadata } from './type';

export interface MVTLayerProps extends CompositeLayerOptions {
  source: { data: string; parser: Partial<Omit<ITileParserCFG, 'type'>> };
  metadataUrl: string;
  fillColor?: PointLayerProps['color'];
  opacity?: number;
  strokeColor?: string;
  lineWidth?: number;
  lineOpacity?: number;
  radius?: PointLayerProps['size'];
}

const MVTLayer: React.FC<MVTLayerProps> = (props) => {
  const { source, metadataUrl, fillColor, opacity, strokeColor, lineWidth, lineOpacity, radius } = props;
  const commonAttr = pick(props, ['name', 'id', 'zIndex', 'visible', 'minZoom', 'maxZoom', 'blend']);
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

  const layers = vectorLayers.map((vectorLayer) => {
    if (vectorLayer.geometry === 'Point') {
      return (
        <PointLayer
          key={vectorLayer.id}
          source={vectorSource}
          sourceLayer={vectorLayer.id}
          shape="circle"
          size={radius}
          color={fillColor}
          style={{ opacity: opacity, stroke: strokeColor, strokeWidth: lineWidth, strokeOpacity: lineOpacity }}
          {...commonAttr}
        />
      );
    } else if (vectorLayer.geometry === 'LineString') {
      return (
        <LineLayer
          key={vectorLayer.id}
          source={vectorSource}
          sourceLayer={vectorLayer.id}
          shape="line"
          size={lineWidth || 0.5}
          color={strokeColor}
          style={{ opacity: lineOpacity }}
          {...commonAttr}
        />
      );
    } else if (vectorLayer.geometry === 'Polygon') {
      return (
        <Fragment key={vectorLayer.id}>
          <PolygonLayer
            key={vectorLayer.id}
            source={vectorSource}
            sourceLayer={vectorLayer.id}
            shape="fill"
            color={fillColor}
            style={{ opacity: opacity }}
            {...commonAttr}
          />
          {lineWidth && (
            <LineLayer
              key={vectorLayer.id + 'line'}
              source={vectorSource}
              sourceLayer={vectorLayer.id}
              shape="line"
              size={lineWidth}
              color={strokeColor}
              style={{ opacity: lineOpacity }}
              {...commonAttr}
            />
          )}
        </Fragment>
      );
    }

    return null;
  });

  return <>{layers}</>;
};

export default MVTLayer;

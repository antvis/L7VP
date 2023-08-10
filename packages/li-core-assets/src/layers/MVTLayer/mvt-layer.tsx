import type { ITileParserCFG } from '@antv/l7';
import { Source } from '@antv/l7';
import { LineLayer, PointLayer, PolygonLayer } from '@antv/larkmap';
import React, { useMemo } from 'react';

type VectorLayer = {
  id: string;
  description?: string;
  minzoom?: number;
  maxzoom?: number;
  fields: Record<string, 'Number' | 'String'>;
  geometry: 'Polygon' | 'LineString' | 'Point';
};

export interface MVTLayerProps {
  source: { url: string; parser: Partial<Omit<ITileParserCFG, 'type'>> };
  vectorLayers: VectorLayer[];
}

const MVTLayer: React.FC<MVTLayerProps> = (props) => {
  const { source, vectorLayers } = props;
  const vectorSource = useMemo(() => new Source(source.url, { parser: { type: 'MVT', ...source.parser } }), []);

  return vectorLayers.map((vectorLayer) => {
    if (vectorLayer.geometry === 'Point') {
      return <PointLayer key={vectorLayer.id} source={vectorSource} />;
    } else if (vectorLayer.geometry === 'LineString') {
      return <LineLayer key={vectorLayer.id} source={vectorSource} />;
    } else if (vectorLayer.geometry === 'Polygon') {
      return <PolygonLayer key={vectorLayer.id} source={vectorSource} />;
    }

    return null;
  });
};

export default MVTLayer;

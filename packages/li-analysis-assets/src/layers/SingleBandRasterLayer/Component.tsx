import { Source } from '@antv/l7';
import type { RasterLayerProps } from '@antv/larkmap';
import { RasterLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import { fromArrayBuffer } from 'geotiff';
import React, { useEffect, useState } from 'react';

export interface SingleBandRasterLayerWrapperProps extends Omit<RasterLayerProps, 'source'>, ImplementLayerProps {
  source: { data: string; parser: { minZoom?: number; maxZoom?: number; extent?: [number, number, number, number] } };
}

const getTiffData = async (url: string) => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const tiff = await fromArrayBuffer(arrayBuffer);
  const image = await tiff.getImage();
  const width = image.getWidth();
  const height = image.getHeight();
  const values = await image.readRasters();
  return {
    data: values[0],
    width,
    height,
  };
};

const SingleBandRasterLayerWrapper: React.FC<SingleBandRasterLayerWrapperProps> = (props) => {
  const { source, style, ...commonAttr } = props;
  const [rasterSource, setRasterSource] = useState<Source>();

  const url = source.data;

  useEffect(() => {
    getTiffData(url).then((tiffdata) => {
      const _source = new Source(tiffdata.data, {
        parser: {
          type: 'raster',
          width: tiffdata.width,
          height: tiffdata.height,
          minZoom: source.parser.minZoom,
          maxZoom: source.parser.maxZoom,
          extent: source.parser.extent,
        },
      });
      setRasterSource(_source);
    });
  }, [url]);

  if (!rasterSource) return <></>;

  return <RasterLayer {...commonAttr} style={style} source={rasterSource} />;
};

export default SingleBandRasterLayerWrapper;

import { CustomControl, HeatmapLayer, LarkMap } from '@antv/larkmap';
import type { HexbinLayerStyleAttributeValue } from '@antv/li-p2';
import { HexbinLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const hexbinLayerOptions: HexbinLayerStyleAttributeValue = {
  autoFit: true,
  aggregateSize: 20000,
  color: 'rgb(90, 216, 166)',
  style: {
    coverage: 0.9,
    opacity: 1,
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(hexbinLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
    transforms: [{ type: 'hexagon', size: 20000, field: 'temperature', method: 'sum' }],
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Lx96%24Pnwhw/city-weather.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  useEffect(() => {
    if (layerOptions.aggregateSize) {
      setSource((pre) => ({
        ...pre,
        transforms: [
          {
            type: 'grid',
            size: Number(layerOptions.aggregateSize),
            field: 'temperature',
            method: 'sum',
          },
        ],
      }));
    }
  }, [layerOptions.aggregateSize]);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '16px' }}>
        <h3>属性配置</h3>
        <HexbinLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={hexbinLayerOptions}
          onChange={(values: HexbinLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={source} shape="hexagon" />
    </LarkMap>
  );
};

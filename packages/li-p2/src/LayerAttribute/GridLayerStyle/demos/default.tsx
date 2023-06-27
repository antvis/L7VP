import { CustomControl, HeatmapLayer, LarkMap } from '@antv/larkmap';
import type { GridLayerStyleAttributeValue } from '@antv/li-p2';
import { GridLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const gridLayerOptions: GridLayerStyleAttributeValue = {
  autoFit: true,
  visible: true,
  aggregateSize: 20000,
  color: '#f00',
  style: {
    coverage: 0.8,
    opacity: 0.8,
  },
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(gridLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
    transforms: [
      {
        type: 'grid',
        size: 4000,
        field: 'temperature',
        method: 'sum',
      },
    ],
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
        <GridLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={gridLayerOptions}
          onChange={(values: GridLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={source} shape="square" />
    </LarkMap>
  );
};

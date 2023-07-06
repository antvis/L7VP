import type { HeatmapLayerProps } from '@antv/larkmap';
import { CustomControl, HeatmapLayer, LarkMap } from '@antv/larkmap';
import type { HeatmapLayerStyleAttributeValue } from '@antv/li-p2';
import { HeatmapLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', label: 'c', value: 'c', typeColor: 'green' },
  { type: 'number', label: 't', value: 't', typeColor: 'gold' },
];

const DefaultHeatmapLayerStyle = {
  size: {
    field: 't',
    value: [0, 1],
  },
  style: {
    intensity: 2,
    radius: 30,
    opacity: 1,
    rampColors: {
      colors: ['#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c', '#feb24c', '#fed976', '#ffeda0', '#ffffcc'],
      positions: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
      isReversed: true,
    },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal' as const,
};

const heatmapLayerOptions: Omit<HeatmapLayerProps, 'source'> = {
  autoFit: true,
  shape: 'heatmap',
  ...DefaultHeatmapLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(heatmapLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/o1GNZoJ2rK/points-center.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl
        position="topleft"
        style={{
          width: '300px',
          background: '#fff',
          padding: '16px',
        }}
      >
        <h3>属性配置</h3>
        <HeatmapLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultHeatmapLayerStyle}
          fieldList={FieldList}
          onChange={(values: HeatmapLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <HeatmapLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

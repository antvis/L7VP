import type { BubbleLayerProps } from '@antv/larkmap';
import { BubbleLayer, CustomControl, LarkMap } from '@antv/larkmap';
import type { BubbleLayerStyleAttributeValue } from '@antv/li-p2';
import { BubbleLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', label: '城市', value: 'name', typeColor: 'green', typeName: '文本' },
  { type: 'number', label: '温度', value: 'temperature', typeColor: 'gold', typeName: '数值' },
];

const DefaultBubbleLayerStyle = {
  radius: 40,
  fillColor: '#00468c',
  opacity: 0.7,
  strokeColor: '#222',
  lineWidth: 2,
  lineOpacity: 1,
  label: {
    field: 'temperature',
    visible: true,
    style: { fill: '#ffffff', fontSize: 18, textAnchor: 'center' as const, textOffset: [0, 0] as [number, number] },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal' as const,
};

const bubbleLayerOptions: Omit<BubbleLayerProps, 'source'> = {
  autoFit: true,
  state: {
    active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
  },
  ...DefaultBubbleLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(bubbleLayerOptions);
  const [source, setSource] = useState({
    data: [],
    parser: { type: 'json', x: 'lng', y: 'lat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/Lx96%24Pnwhw/city-weather.json')
      .then((response) => response.json())
      .then((data: any) => {
        setSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '16px' }}>
        <h3>属性配置</h3>
        <BubbleLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultBubbleLayerStyle}
          fieldList={FieldList}
          onChange={(values: BubbleLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <BubbleLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

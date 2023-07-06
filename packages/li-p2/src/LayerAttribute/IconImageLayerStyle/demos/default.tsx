import type { IconImageLayerProps } from '@antv/larkmap';
import { CustomControl, IconImageLayer, LarkMap } from '@antv/larkmap';
import type { IconImageLayerStyleAttributeValue } from '@antv/li-p2';
import { DefaultIconImageLayerStyle, IconImageLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', label: '城市', value: 'name', typeColor: 'green', typeName: '文本' },
  { type: 'number', label: '温度', value: 'temperature', typeColor: 'gold', typeName: '数值' },
];

const defaultIconImageLayerStyle: Omit<IconImageLayerProps, 'source'> = {
  ...DefaultIconImageLayerStyle,
  autoFit: true,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(defaultIconImageLayerStyle);
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
        <IconImageLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultIconImageLayerStyle}
          fieldList={FieldList}
          onChange={(values: IconImageLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>

      <IconImageLayer {...layerOptions} source={source} />
    </LarkMap>
  );
};

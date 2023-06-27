import type { LineLayerProps } from '@antv/larkmap';
import { CustomControl, LarkMap, LineLayer } from '@antv/larkmap';
import type { LineLayerStyleAttributeValue } from '@antv/li-p2';
import { LineLayerStyleAttribute } from '@antv/li-p2';
import React, { useEffect, useState } from 'react';

const FieldList = [
  { type: 'string', label: '名称', value: 'line_name', typeColor: 'green', typeName: '文本' },
  { type: 'number', label: 'id', value: 'line_id', typeColor: 'gold', typeName: '数值' },
];
const DefaultLineLayerStyle = {
  color: {
    field: 'line_id',
    value: ['#a6cee3', '#1f78b4', '#b2df8a'],
    isReversed: false,
    scale: { type: 'quantile' as const },
  },
  size: 1.5,
  style: {
    opacity: 0.8,
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal' as const,
  animate: false,
};

const lineLayerOptions: Omit<LineLayerProps, 'source'> = {
  autoFit: true,
  shape: 'line',
  state: { active: { color: '#FFF684' } },
  ...DefaultLineLayerStyle,
};

export default () => {
  const [layerOptions, setLayerOptions] = useState(lineLayerOptions);
  const [layerSource, setLayerSource] = useState({
    data: [],
    parser: { type: 'json', coordinates: 'lnglat' },
  });

  useEffect(() => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/1atwIMvcMo/beijinggongjiaoluxian.json')
      .then((response) => response.json())
      .then((data: any) => {
        setLayerSource((prevState) => ({ ...prevState, data }));
      });
  }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '16px' }}>
        <h3>属性配置</h3>
        <LineLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultLineLayerStyle}
          fieldList={FieldList}
          onChange={(values: LineLayerStyleAttributeValue) => {
            // console.log('values: ', values);
            setLayerOptions(values);
          }}
        />
      </CustomControl>
      <LineLayer {...layerOptions} source={layerSource} />
    </LarkMap>
  );
};

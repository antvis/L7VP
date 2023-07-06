import { CustomControl, LarkMap } from '@antv/larkmap';
import type { FlowLayerStyleAttributeValue } from '@antv/li-p2';
import { FlowLayerStyleAttribute } from '@antv/li-p2';
import React from 'react';

const FieldList = [
  { type: 'number', label: '权重', value: 'weight', typeColor: 'green', typeName: '数值' },
  { type: 'string', label: '始经度', value: 'f_lon', typeColor: 'red', typeName: '文本' },
  { type: 'string', label: '始纬度', value: 'f_lat', typeColor: 'red', typeName: '文本' },
  { type: 'string', label: '终经度', value: 't_lon', typeColor: 'red', typeName: '文本' },
  { type: 'string', label: '终纬度', value: 't_lat', typeColor: 'red', typeName: '文本' },
];

const DefaultFlowLayerStyle = {
  // 客流点聚合类型
  clusterType: 'HCA',
  // zoom 计算步长
  clusterZoomStep: 1,
  // 聚合点像素尺寸
  clusterNodeSize: 64,
  // 聚合半径
  clusterRadius: 40,
  // 聚合力度
  clusterExtent: 512,
  // 最大展示的客流线条数
  maxTopFlowNum: 5000,
  color: '#fff',
  zoom: 12,
  radius: {
    field: 'weight',
    value: [1, 16],
  },
  lineColor: {
    field: 'weight',
    value: ['orange', 'red'],
  },
  lineSize: {
    field: 'weight',
    value: [1, 16],
  },
  // 是否启用根据权重映射半透明值
  fadeOpacityEnabled: true,
  // 半透明的权重
  fadeOpacityAmount: 0,
  state: {
    select: { strokeColor: 'pink', lineWidth: 1.5, lineOpacity: 0.8 },
  },
};

export default () => {
  // useEffect(() => {
  //   fetch('https://gw.alipayobjects.com/os/antfincdn/Y8eGLb9j9v/hangzhou-district.json')
  //     .then((response) => response.json())
  //     .then((data: any) => {
  //       setLayerSource((prevState) => ({ ...prevState, data }));
  //     });
  // }, []);

  return (
    <LarkMap mapType="Gaode" style={{ height: '400px', overflow: 'hidden' }}>
      <CustomControl position="topleft" style={{ width: '300px', background: '#fff', padding: '16px' }}>
        <h3>属性配置</h3>
        <FlowLayerStyleAttribute
          style={{ overflowX: 'hidden', overflowY: 'auto', maxHeight: '300px' }}
          initialValues={DefaultFlowLayerStyle}
          fieldList={FieldList}
          onChange={(values: FlowLayerStyleAttributeValue) => {
            console.log('values: ', values);
            // setLayerOptions(values);
          }}
        />
      </CustomControl>
    </LarkMap>
  );
};

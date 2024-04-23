import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: 'AI 遥感',
    description: 'SAM 图像分割大模型在遥感领域的应用：AI 识别、提取家乡所在城市体育馆、飞机场飞机、自家房产等轮廓。',
    creatTime: '2023-05-24 16:48:56',
  },
  datasets: [
    {
      id: '57f6893a-f9ab-49c7-888b-a07551432828',
      type: 'raster-tile',
      metadata: { name: 'Google 卫星影像', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        url: 'https://www.google.com/maps/vt?lyrs=s@820&gl=cn&x={x}&y={y}&z={z}',
        type: 'xyz-tile',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 18,
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 17,
        center: [120.104836, 30.261078],
        pitch: 0,
        bearing: 0,
        style: 'dark',
        preserveDrawingBuffer: true,
        rotation: 0,
        viewMode: '2D',
        dragRotate: true,
        pitchWithRotate: true,
        WebGLParams: { preserveDrawingBuffer: true },
      },
    },
    layers: [
      {
        id: 'ed7c2a49-2e7a-4767-b362-474ea15b2ac5',
        type: 'TileLayer',
        metadata: { name: '谷歌瓦片图层' },
        sourceConfig: { datasetId: '57f6893a-f9ab-49c7-888b-a07551432828', parser: { type: 'rasterTile' } },
        visConfig: { visible: true },
      },
    ],
    widgets: [
      { id: 'SamLayout', type: 'SamLayout', metadata: { name: '布局组件' }, properties: { showSidePanel: true } },
      {
        id: 'SamComponent',
        type: 'SamComponent',
        metadata: { name: '遥感图像分割' },
        properties: {
          modelUrl:
            'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*eRf_QauRmqoAAAAAAAAAAAAADmJ7AQ/sam_onnx_example.glb',
          embeddingUrl: 'https://sam.lvisei.icu/api',
          strokeColor: '#8274FF',
          editorTheme: 'vs-dark',
        },
        container: { id: 'SamLayout', slot: 'sidePanel' },
      },
      {
        id: 'AdministrativeSelectControl',
        type: 'AdministrativeSelectControl',
        metadata: {
          name: '行政区域选择器',
        },
        properties: {
          position: 'lefttop',
        },
        container: {
          id: 'SamLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LocationSearchControl_d6b4f11f-c76d-4899-b325-98e680c984eb',
        type: 'LocationSearchControl',
        metadata: { name: '位置查询' },
        properties: { position: 'lefttop' },
        container: { id: 'SamLayout', slot: 'controls' },
      },
      {
        id: 'MouseLocationControl_88d28c82-8c2b-4930-8f5d-d1393070d6a9',
        type: 'MouseLocationControl',
        metadata: { name: '光标经纬度' },
        properties: { position: 'bottomleft' },
        container: { id: 'SamLayout', slot: 'controls' },
      },
      {
        id: 'ScaleControl_155a2899-cfc2-4dc9-8d24-05cc74f5b1e8',
        type: 'ScaleControl',
        metadata: { name: '比例尺' },
        properties: { position: 'bottomleft' },
        container: { id: 'SamLayout', slot: 'controls' },
      },
      {
        id: 'MeasureControl_47906900-6411-40aa-ae06-26c83e66763d',
        type: 'MeasureControl',
        metadata: { name: '距离/面积测量' },
        properties: { position: 'bottomleft', color: '#ec25fa' },
        container: { id: 'SamLayout', slot: 'controls' },
      },
    ],
  },
};

export default APP_CONFIG;

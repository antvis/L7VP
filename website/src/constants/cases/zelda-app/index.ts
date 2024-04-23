import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: 'Zelda: Tears of the Kingdom - Power by  AntV L7VP',
    creatTime: '2023-05-05 14:38:33',
    description: '通过 L7VP 搭建研发的《塞尔达：王国之泪》移动端地图应用',
  },
  datasets: [
    {
      id: '20f29561-8381-4209-9ccf-04999d01db35',
      type: 'raster-tile',
      metadata: { name: 'Groundtiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        type: 'xyz-tile',
        url: 'https://tiles.lvisei.icu/zelda-2/groundtiles/{z}/{x}/{y}.png',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 7,
        extent: [-180, 15.04206005516698, 17.75066182074289, 85.051355],
      },
    },
    {
      id: '734eb079-260c-4b3f-bf48-e28e92f88368',
      type: 'raster-tile',
      metadata: { name: 'Skytiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        type: 'xyz-tile',
        url: 'https://tiles.lvisei.icu/zelda-2/skytiles/{z}/{x}/{y}.png',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 7,
        extent: [-180, 15.04206005516698, 17.75066182074289, 85.051355],
      },
    },
    {
      id: 'f803ba2c-f41a-48d8-bb14-6f9d40e23cda',
      type: 'raster-tile',
      metadata: { name: 'Undergroundtiles', description: 'XYZ Tile', serviceType: 'XYZ Tile' },
      properties: {
        type: 'xyz-tile',
        url: 'https://tiles.lvisei.icu/zelda-2/undergroundtiles/{z}/{x}/{y}.png',
        tileSize: 256,
        minZoom: 0,
        maxZoom: 7,
        extent: [-180, 15.04206005516698, 17.75066182074289, 85.051355],
      },
    },
    {
      id: '3b8eac94-4114-4a24-83c5-8a2a21ab79d8',
      metadata: {
        name: 'Zelda Mark',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*OwhUQ5bSRTUAAAAAAAAAAAAADrd2AQ/data.json',
        requestOptions: {
          method: 'GET',
        },
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Map',
      config: {
        zoom: 3,
        minZoom: 1,
        maxZoom: 7,
        center: [-85.153576, 74.287459],
        bounds: [-119.693328, 85.021499, -54.115116, 33.984887],
        maxBounds: [-180, 15.04206005516698, 17.75066182074289, 85.051355],
        pitch: 0,
        bearing: 0,
        style: 'dark',
        WebGLParams: { preserveDrawingBuffer: true },
      },
    },
    layers: [
      {
        id: 'b0c70759-7706-49c6-b98e-635624e8c6f4',
        type: 'TileLayer',
        metadata: { name: 'Underground Layer' },
        sourceConfig: {
          parser: { type: 'rasterTile' },
          datasetId: 'f803ba2c-f41a-48d8-bb14-6f9d40e23cda',
        },
        visConfig: {
          style: { opacity: 1 },
          minZoom: 0,
          maxZoom: 8,
          blend: 'normal',
          visible: false,
        },
      },
      {
        id: 'ab8af73f-fd47-4607-9eb2-686bef746e06',
        type: 'TileLayer',
        metadata: { name: 'Ground Layer' },
        sourceConfig: {
          parser: { type: 'rasterTile' },
          datasetId: '20f29561-8381-4209-9ccf-04999d01db35',
        },
        visConfig: {
          style: { opacity: 1 },
          minZoom: 0,
          maxZoom: 8,
          blend: 'normal',
          visible: true,
        },
      },
      {
        id: '7f4c248c-33cd-4133-842e-e256344d590c',
        type: 'TileLayer',
        metadata: { name: 'Sky Layer' },
        sourceConfig: {
          parser: { type: 'rasterTile' },
          datasetId: '734eb079-260c-4b3f-bf48-e28e92f88368',
        },
        visConfig: {
          style: { opacity: 1 },
          minZoom: 0,
          maxZoom: 8,
          blend: 'normal',
          visible: false,
        },
      },
    ],
    widgets: [
      {
        id: '0ce6afbd-cd82-4879-9639-f2c978fdd920',
        type: 'ZeldaMobileLayout',
        metadata: {
          name: '塞尔达应用布局',
        },
        properties: {
          datasetId: '3b8eac94-4114-4a24-83c5-8a2a21ab79d8',
        },
      },
      // {
      //   id: 'FullscreenControl1',
      //   type: 'FullscreenControl',
      //   metadata: { name: '地图全屏' },
      //   properties: { position: 'topright' },
      //   container: { id: '0ce6afbd-cd82-4879-9639-f2c978fdd920', slot: 'controls' },
      // },
      // {
      //   id: 'MouseLocationControl4',
      //   type: 'MouseLocationControl',
      //   metadata: { name: '光标经纬度' },
      //   properties: { position: 'topleft' },
      //   container: { id: '0ce6afbd-cd82-4879-9639-f2c978fdd920', slot: 'controls' },
      // },
      // {
      //   id: 'ExportImageControl_ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
      //   type: 'ExportImageControl',
      //   metadata: { name: '导出图片' },
      //   properties: { position: 'topright' },
      //   container: { id: '0ce6afbd-cd82-4879-9639-f2c978fdd920', slot: 'controls' },
      // },
      {
        id: 'ZeldaMoreControl',
        type: 'ZeldaMoreControl',
        metadata: {
          name: '更多控件',
        },
        properties: {
          position: 'topright',
        },
        container: {
          id: '0ce6afbd-cd82-4879-9639-f2c978fdd920',
          slot: 'controls',
        },
      },
      {
        id: 'ZeldaLayerControl',
        type: 'ZeldaLayerControl',
        metadata: { name: '图层控件' },
        properties: {
          position: 'topright',
          undergroundLayerId: 'b0c70759-7706-49c6-b98e-635624e8c6f4',
          groundLayerId: 'ab8af73f-fd47-4607-9eb2-686bef746e06',
          skyLayerId: '7f4c248c-33cd-4133-842e-e256344d590c',
        },
        container: { id: '0ce6afbd-cd82-4879-9639-f2c978fdd920', slot: 'controls' },
      },
      {
        id: 'ZeldaZoomControl',
        type: 'ZeldaZoomControl',
        metadata: { name: '缩放器' },
        properties: { position: 'topleft', showZoom: true },
        container: { id: '0ce6afbd-cd82-4879-9639-f2c978fdd920', slot: 'controls' },
      },
    ],
  },
};

export default APP_CONFIG;

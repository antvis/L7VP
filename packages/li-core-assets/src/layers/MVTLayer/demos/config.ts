import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [
    {
      id: 'f751aab1-e333-4521-aa41-94a0db675aed',
      type: 'vector-tile',
      metadata: {
        name: 'ne_10m_railroads',
        description: 'MVT Tile',
        serviceType: 'MVT Tile',
      },
      properties: {
        url: 'http://127.0.0.1:8080/ne_10m_railroads/{z}/{x}/{y}.pbf',
        parser: {
          type: 'mvt',
          metadataUrl: 'http://127.0.0.1:8080/ne_10m_railroads/metadata.json',
        },
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        zoom: 10,
        center: [120.153576, 30.287459] as [number, number],
        pitch: 0,
        bearing: 0,
        rotation: 0,
        style: 'dark',
      },
    },
    layers: [
      {
        id: '5d148cba-5775-435c-b34c-9882dbc584e8',
        type: 'MVTLayer',
        metadata: {
          name: 'ne_10m_railroads',
        },
        sourceConfig: {
          datasetId: 'f751aab1-e333-4521-aa41-94a0db675aed',
          parser: {
            type: 'mvt',
          },
        },
        visConfig: {
          visible: true,
        },
      },
    ],
    widgets: [
      {
        id: 'BaseLayout',
        type: 'BaseLayout',
        metadata: { name: '基础布局' },
        properties: {
          showSidePanel: false,
        },
      },
      {
        id: 'zoomControl',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default config;

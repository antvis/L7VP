import type { Application } from '@antv/li-sdk';
import { cloneDeep } from 'lodash-es';
import { ANALYSIS_ASSETS_ID, DEFAULT_ANALYSIS_WIDGETS, DEFAULT_MAP_WIDGETS } from '@/constants';

export const creatApplication = (applicationName: string, assetPackageIds: string[]) => {
  const widgets = assetPackageIds.includes(ANALYSIS_ASSETS_ID) ? DEFAULT_ANALYSIS_WIDGETS : DEFAULT_MAP_WIDGETS;
  const config: Application = {
    version: 'v0.1',
    metadata: {
      name: applicationName,
    },
    datasets: [],
    spec: {
      map: {
        basemap: 'Gaode' as const,
        config: {
          zoom: 3,
          center: [120.153576, 30.287459] as [number, number],
          pitch: 0,
          bearing: 0,
          style: 'dark',
          WebGLParams: {
            preserveDrawingBuffer: true,
          },
        },
        logoPosition: 'leftbottom',
      },
      layers: [],
      widgets: cloneDeep(widgets),
    },
  };

  return config;
};

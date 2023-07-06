import type { ServiceParams } from '@antv/li-sdk';
import { implementService } from '@antv/li-sdk';
import type { FeatureCollection } from 'geojson';

interface ChinaGeoListServiceParams extends ServiceParams {
  countryCode: string;
}

function getChinaGeoListService(
  params: ChinaGeoListServiceParams,
): Promise<Record<string, any>[]> {
  const { properties } = params;
  const { adcode = '100000' } = properties;
  return fetch(
    `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`,
  )
    .then((res) => res.json())
    .then((fc: FeatureCollection) =>
      fc.features.map((item) => {
        return {
          ...item.properties,
          _geometry: item.geometry,
        };
      }),
    );
}

export const services = [
  implementService({
    version: 'v0.1',
    metadata: {
      name: 'GET_CHINA_GEO_LIST',
      displayName: '中国省市区地理数据源',
      type: 'Dataset',
    },
    service: getChinaGeoListService,
  }),
];

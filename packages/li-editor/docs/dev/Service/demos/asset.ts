import type { AssetPackage, ServiceParams } from '@antv/li-sdk';
import { implementService } from '@antv/li-sdk';
import type { FeatureCollection } from 'geojson';
import { DataseInfor, LocationSearchControl } from './CustomWidgets';
interface ChinaGeoListServiceParams extends ServiceParams {
  countryCode: string;
}

function getChinaGeoListService(params: ChinaGeoListServiceParams): Promise<Record<string, any>[]> {
  const { properties } = params;
  const { adcode = '100000' } = properties;
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`)
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

function getLocationInputtips(params: { keywords: string }): Promise<Record<string, any>> {
  return fetch(
    `https://restapi.amap.com/v3/assistant/inputtips?&keywords=${params.keywords}&key=fdef552a086edf93e01b6bac2eb89197`,
  ).then((res) => res.json());
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
  implementService({
    version: 'v0.1',
    metadata: {
      name: 'POI_SEARCH',
      displayName: '附近点位查询',
      type: 'Custom',
      category: 'POI_SEARCH',
    },
    service: getLocationInputtips,
  }),
];

const asset: AssetPackage = {
  version: 'v0.0.1',
  layers: [],
  widgets: [DataseInfor, LocationSearchControl],
  services: services,
};
export default asset;

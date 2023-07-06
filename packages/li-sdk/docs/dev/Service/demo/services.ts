import type { ServiceParams } from '@antv/li-sdk';
import { implementService } from '@antv/li-sdk';
import type { FeatureCollection } from 'geojson';

interface ProvinceListService extends ServiceParams {
  countryCode: string;
}

function getProvinceListService(params: ProvinceListService): Promise<Record<string, any>[]> {
  const { countryCode = '100000' } = params ?? {};
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${countryCode}_full.json`)
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

function getCityListService(params: ServiceParams & { provinceCode: string }): Promise<Record<string, any>[]> {
  const { provinceCode = '330000' } = params ?? {};
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${provinceCode}_full.json`)
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
      name: 'GET_PROVINCE_LIST',
      displayName: '获取中国省份列表',
      type: 'Dataset',
    },
    service: getProvinceListService,
  }),
  implementService({
    version: 'v0.1',
    metadata: {
      name: 'GET_CITY_LIST',
      displayName: '获取浙江市区列表',
      type: 'Dataset',
    },
    service: getCityListService,
  }),
];

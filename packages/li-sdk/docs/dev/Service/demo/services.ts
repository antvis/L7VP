import type { DatasetServiceParams } from '@antv/li-sdk';
import { implementService } from '@antv/li-sdk';
import type { FeatureCollection } from 'geojson';

type ProvinceListServiceParams = {
  adcode: string;
};

function getProvinceListService(
  params: DatasetServiceParams<ProvinceListServiceParams>,
): Promise<Record<string, any>[]> {
  const { properties, signal } = params;
  const { adcode = '100000' } = properties;
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`, { signal })
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

function getCityListService(params: DatasetServiceParams<{ provinceCode: string }>): Promise<Record<string, any>[]> {
  const { properties, signal } = params;
  const { provinceCode = '330000' } = properties;
  return fetch(`https://geo.datav.aliyun.com/areas_v3/bound/${provinceCode}_full.json`, { signal })
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

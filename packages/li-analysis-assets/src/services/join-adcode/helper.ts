import type { Feature, FeatureCollection } from '@turf/turf';
import { point } from '@turf/turf';
import { isString, isUndefined } from 'lodash-es';

const Chache = new Map<string, FeatureCollection>();

const BASE_URL = 'https://fastly.jsdelivr.net/npm/static-geo-atlas';

const getAdministrativeCentroidList = () => {
  return fetch(`${BASE_URL}@0.0.2/geo-data/administrative-data/area-list.json`).then<Record<string, any>[]>((data) =>
    data.json(),
  );
};

export const getAdministrativeBoundary = (
  adminBoundaryGranularity: 'country' | 'province' | 'city' | 'district' | 'chinaCountryBoundary',
) => {
  const prefixUrl = `${BASE_URL}/geo-data/choropleth-data`;
  const adminBoundaryGranularityMap = {
    country: `${prefixUrl}/world/all_world_country.json`,
    chinaCountryBoundary: `${prefixUrl}/country/100000_country_boundary.json`,
    province: `${prefixUrl}/country/100000_country_province.json`,
    city: `${prefixUrl}/country/100000_country_city.json`,
    district: `${prefixUrl}/country/100000_country_district.json`,
  };
  const url = adminBoundaryGranularityMap[adminBoundaryGranularity];
  if (Chache.has(url)) return Promise.resolve(Chache.get(url)!);

  return fetch(url)
    .then<FeatureCollection>((data) => data.json())
    .then((data) => {
      Chache.set(url, data);
      return data;
    });
};

const getAdministrativeBoundaryMap = (geojson: FeatureCollection, adminBoundaryType: 'name' | 'adcode') => {
  const AdministrativeMap = new Map<string, Feature>();

  geojson.features.forEach((feature) => {
    const { name, adcode } = feature.properties!;
    const key = adminBoundaryType === 'name' ? name : adcode;
    AdministrativeMap.set(key, feature);
  });

  return AdministrativeMap;
};

export type JoinAdcodeDataParams = {
  dataset: Record<string, any>[];
  adminBoundaryField: string;
  adminBoundaryGranularity: 'country' | 'province' | 'city' | 'district';
  adminBoundaryType?: 'name' | 'adcode';
  geometryType: 'centroid' | 'boundary';
  adminBoundaryGeometryField?: string;
};

/**
 * 将数据集的行政元数据信息与地理数据关联，返回插入新的地理数据列的数据集
 */
export const joinAdcodeData = async (params: JoinAdcodeDataParams) => {
  const {
    dataset,
    adminBoundaryField,
    adminBoundaryGranularity,
    adminBoundaryType = 'name',
    geometryType,
    adminBoundaryGeometryField = adminBoundaryField + '_geometry',
  } = params;

  const geojson: FeatureCollection = await getAdministrativeBoundary(adminBoundaryGranularity);
  const administrativeMap = getAdministrativeBoundaryMap(geojson, adminBoundaryType);

  const _dataset = [];

  for (let i = 0; i < dataset.length; i++) {
    const datum = dataset[i];
    const adminBoundaryValue = datum[adminBoundaryField];

    if (isUndefined(adminBoundaryValue) || (isString(adminBoundaryValue) && adminBoundaryValue === '')) {
      _dataset.push({ ...datum, [adminBoundaryGeometryField]: null });
      continue;
    }

    const adminBoundary = administrativeMap.get(adminBoundaryValue);
    if (!adminBoundary) {
      _dataset.push({ ...datum, [adminBoundaryGeometryField]: null });
      continue;
    }

    const geometry =
      geometryType === 'boundary' ? adminBoundary.geometry : point(adminBoundary?.properties?.centroid).geometry;
    // const adminProperties = {
    //   [adminBoundaryField + '_name']: adminBoundary.properties?.name,
    //   [adminBoundaryField + '_adcode']: adminBoundary.properties?.adcode,
    // };
    _dataset.push({ ...datum, [adminBoundaryGeometryField]: geometry });
  }

  return Promise.resolve(_dataset);
};

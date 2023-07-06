import type { FeatureCollection } from '@turf/turf';
import { getAdministrativeBoundary } from '../../services/join-adcode/helper';
import type { ChinaAdminLayerSource } from './type';

export const geChinaAdminBoundaryData = async () => {
  const geojson = await getAdministrativeBoundary('chinaCountryBoundary');

  const chinaBoundary: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.filter(({ properties }) => ['coast', 'national'].includes(properties?.type)),
  };
  const hkmBoundary: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.filter(({ properties }) => properties?.type === 'hkm'),
  };
  const disputeBoundary: FeatureCollection = {
    type: 'FeatureCollection',
    features: geojson.features.filter(({ properties }) => properties?.type === 'dispute'),
  };

  return { chinaBoundary, hkmBoundary, disputeBoundary };
};

export const getAdminBoundaryData = async (
  data: Record<string, any>[],
  countryAdConfig: ChinaAdminLayerSource['countryAdConfig'],
) => {
  const { countryGranularity, countryAdType, countryAdField } = countryAdConfig;
  const boundaryGeoJSON = await getAdministrativeBoundary(countryGranularity);
  const boundaryData = boundaryGeoJSON.features.map((feature) => ({
    ...feature.properties,
    _geometry: feature.geometry,
  }));
  const labelData = boundaryGeoJSON.features.map((feature) => feature.properties as Record<string, any>);

  const joinBy = {
    type: 'join',
    sourceField: countryAdField,
    targetField: countryAdType === 'adname' ? 'name' : 'adcode',
    data,
  };

  return { data: boundaryData, joinBy, labelData };
};

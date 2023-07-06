/**
 * 检查是否是 GeoJson FeatureCollection 类型
 */
export const checkIsGeoJson = (data: any) => {
  return data instanceof Object && data.type === 'FeatureCollection' && Array.isArray(data.features)
    ? 'geojson'
    : 'json';
};

import type { Position } from '@antv/l7';
import type { Feature } from '@turf/turf';
import { area, centroid, length, lineString, polygon } from '@turf/turf';
import type { LineMarkerType, PolygonMarkerType } from './typings';

/**
 * 计算每段线的距离，当距离大于等于1k 并格式化
 * @param coordinates
 * @returns
 */
export const getLineDistance = (coordinates: Position[]) => {
  const meters = length(lineString(coordinates), { units: 'meters' });
  return meters >= 1000 ? +(meters / 1000).toFixed(2) + 'km' : +meters.toFixed(2) + 'm';
};
/**
 * 计算多边形的面积，当距离大于等于1k 并格式化
 * @param coordinates
 * @returns
 */
export const getPolygonArea = (coordinates: Position[][]) => {
  const polygonArea = area(polygon(coordinates));
  return polygonArea > 1000000 ? `${+(polygonArea / 1000000).toFixed(2)}km²` : `${+polygonArea.toFixed(2)}m²`;
};
/**
 * 计算多边形的中心点
 * @param coordinates
 * @returns
 */
export const getCenterPosition = (coordinates: Position[][]) => {
  return centroid(polygon(coordinates)).geometry.coordinates;
};

// 处理Features-polygon
export const collectionPolygon = (featureList: Feature[]) => {
  const newFeatures: PolygonMarkerType[] = [];
  featureList.forEach((feature: Feature) => {
    const { geometry, properties } = feature;
    const { coordinates } = geometry as { coordinates: Position[][] };
    if (coordinates[0].length > 3) {
      const text = getPolygonArea(coordinates);
      const [lng, lat] = getCenterPosition(coordinates);
      newFeatures.push({
        lngLat: { lng, lat },
        polygonId: properties?.id,
        text,
        editFeature: feature,
      });
    }
  });
  return newFeatures;
};

// 处理Features-Line
export const collectionLine = (featureList: Feature[]) => {
  const newFeatures: LineMarkerType[] = [];
  featureList.forEach((feature: Feature) => {
    const { geometry, properties } = feature;
    const { nodes } = properties ?? {};
    const { coordinates } = geometry as { coordinates: Position[] };
    const newData = nodes.map((node: Feature, index: number) => {
      const text = index > 0 ? getLineDistance(coordinates.slice(0, index + 1)) : '起点';
      const [lng, lat] = (node.geometry as any).coordinates;
      return {
        lngLat: { lng, lat },
        nodeId: node.properties?.id,
        lineId: properties?.id,
        text,
        isLast: index === nodes.length - 1 && index !== 0,
        nodeIndex: index,
        editFeature: feature,
      };
    });
    newFeatures.push(...newData);
  });
  return newFeatures;
};

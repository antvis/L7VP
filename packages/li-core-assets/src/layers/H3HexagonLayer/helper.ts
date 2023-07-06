import type { ChoroplethLayerSourceOptions } from '@antv/l7-composite-layers';
import type { H3Index } from 'h3-js';
import { cellToBoundary, cellToLatLng } from 'h3-js';

type NumericArray = number[];

/**
 * Interpolate between two numbers or two arrays
 */
function lerp(a: number, b: number, t: number): number;
function lerp(a: NumericArray, b: NumericArray, t: number): NumericArray;

function lerp(a: number | NumericArray, b: number | NumericArray, t: number): number | NumericArray {
  if (Array.isArray(a)) {
    return (a as NumericArray).map((ai: number, i: number) => lerp(ai, (b as NumericArray)[i], t));
  }
  return t * (b as number) + (1 - t) * (a as number);
}

// normalize longitudes w.r.t center (refLng), when not provided first vertex
function normalizeLongitudes(vertices: number[][], refLng?: number): void {
  const _refLng = refLng === undefined ? vertices[0][0] : refLng;
  for (const pt of vertices) {
    const deltaLng = pt[0] - _refLng;
    if (deltaLng > 180) {
      pt[0] -= 360;
    } else if (deltaLng < -180) {
      pt[0] += 360;
    }
  }
}

// scale polygon vertices w.r.t center (hexId)
function scalePolygon(hexId: H3Index, vertices: number[][], factor: number): void {
  const [lat, lng] = cellToLatLng(hexId);
  const actualCount = vertices.length;

  // normalize with respect to center
  normalizeLongitudes(vertices, lng);

  // `cellToBoundary` returns same array object for first and last vertex (closed polygon),
  // if so skip scaling the last vertex
  const vertexCount = vertices[0] === vertices[actualCount - 1] ? actualCount - 1 : actualCount;
  for (let i = 0; i < vertexCount; i++) {
    vertices[i][0] = lerp(lng, vertices[i][0], factor);
    vertices[i][1] = lerp(lat, vertices[i][1], factor);
  }
}

export function h3ToPolygon(hexId: H3Index, coverage: number = 1): number[][] {
  const vertices = cellToBoundary(hexId, true);

  if (coverage !== 1) {
    // scale and normalize vertices w.r.t to center
    scalePolygon(hexId, vertices, coverage);
  } else {
    // normalize w.r.t to start vertex
    normalizeLongitudes(vertices);
  }

  return vertices;
}

export const getSource = (sourceData: Record<string, any>[], hexagonId: string): ChoroplethLayerSourceOptions => {
  const geometry = `${hexagonId}_geometry`;

  const data = sourceData
    .filter((item) => item[hexagonId])
    .map((item) => ({
      ...item,
      [geometry]: {
        type: 'Polygon',
        coordinates: [h3ToPolygon(item[hexagonId])],
      },
    }));

  const layerSource = {
    data,
    parser: {
      type: 'json',
      geometry,
    },
  };

  return layerSource;
};

import type { LineLayerProps } from '@antv/larkmap';
import { LineLayer } from '@antv/larkmap';
import type { FeatureCollection } from '@turf/turf';
import { merge } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { geChinaAdminBoundaryData } from './helper';

/**
 * 中国国界样式
 */
const CHINA_BOUNDARY_STYLE = {
  // 国界
  national: {
    color: 'red',
    width: 1,
    opacity: 1,
  },
  // 争议
  dispute: {
    color: 'red',
    width: 1,
    opacity: 0.8,
    dashArray: [2, 4],
  },
  // 海洋
  coast: {
    color: 'blue',
    width: 0.7,
    opacity: 0.8,
  },
  // 港澳
  hkm: {
    color: 'gray',
    width: 0.7,
    opacity: 0.8,
    dashArray: [2, 4],
  },
};

/**
 * 中国国界样式配置
 */
type ChinaBoundaryStyle = Partial<typeof CHINA_BOUNDARY_STYLE>;

type ChinaBoundaryStyleKeys = keyof ChinaBoundaryStyle;

type ChinaCountryBoundaryProps = {
  zIndex?: number;
  visible?: boolean;
  minZoom?: number;
  maxZoom?: number;
  chinaBorder?: ChinaBoundaryStyle;
};

const ChinaCountryBoundary: React.FC<ChinaCountryBoundaryProps> = (props) => {
  const { visible, minZoom, maxZoom, zIndex = 0, chinaBorder } = props;

  const [data, setData] = useState<{
    chinaBoundary: FeatureCollection;
    hkmBoundary: FeatureCollection;
    disputeBoundary: FeatureCollection;
  }>();

  const borderStyle = useMemo(
    () => (typeof chinaBorder === 'object' ? merge({}, CHINA_BOUNDARY_STYLE, chinaBorder) : CHINA_BOUNDARY_STYLE),
    [chinaBorder],
  );

  useEffect(() => {
    geChinaAdminBoundaryData().then((boundarys) => setData(boundarys));
  }, []);

  if (!data) return null;

  const chinaBoundaryLayerOptions: LineLayerProps = {
    id: 'chinaBoundaryLayer',
    name: '中国国界海岸线图层',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: data?.chinaBoundary,
      parser: { type: 'geojson' },
    },
    color: {
      field: 'type',
      value: ({ type }) => borderStyle[type as ChinaBoundaryStyleKeys].color,
    },
    size: {
      field: 'type',
      value: ({ type }) => borderStyle[type as ChinaBoundaryStyleKeys].width,
    },
    style: {
      opacity: ['type', (type) => borderStyle[type as ChinaBoundaryStyleKeys].opacity],
    },
  };

  const chinaHkmBoundaryLayerOptions: LineLayerProps = {
    name: 'chinaHkmBoundaryLayer',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: data?.hkmBoundary,
      parser: { type: 'geojson' },
    },
    color: borderStyle.hkm.color,
    size: borderStyle.hkm.width,
    style: {
      opacity: borderStyle.hkm.opacity,
      lineType: 'dash',
      dashArray: borderStyle.hkm.dashArray as [number, number],
    },
  };

  const chinaDisputeBoundaryLayerOptions: LineLayerProps = {
    name: 'chinaDisputeBoundaryLayer',
    visible,
    minZoom,
    maxZoom,
    zIndex: zIndex + 0.1,
    source: {
      data: data?.disputeBoundary,
      parser: { type: 'geojson' },
    },
    color: borderStyle.dispute.color,
    size: borderStyle.dispute.width,
    style: {
      opacity: borderStyle.dispute.opacity,
      lineType: 'dash',
      dashArray: borderStyle.dispute.dashArray as [number, number],
    },
  };

  return (
    <>
      <LineLayer {...chinaBoundaryLayerOptions} />
      <LineLayer {...chinaHkmBoundaryLayerOptions} />
      <LineLayer {...chinaDisputeBoundaryLayerOptions} />
    </>
  );
};

export default React.memo(ChinaCountryBoundary);

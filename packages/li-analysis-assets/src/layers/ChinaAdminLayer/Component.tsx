import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer, TextLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React, { useEffect, useState } from 'react';
import ChinaCountryBoundary from './ChinaCountryBoundary';
import { getAdminBoundaryData } from './helper';
import type { ChinaAdminLayerSource } from './type';

export interface ChinaAdminLayerProps extends ChoroplethLayerProps, ImplementLayerProps {
  source: ChinaAdminLayerSource;
  showAdminLabel: boolean;
  adminLabelColor: string;
  adminLabelFontSize: number;
  adminLabelStroke: string;
  adminLabelStrokeWidth: number;
  showNationalBorders: boolean;
}

const ChinaAdminLayer: React.FC<ChinaAdminLayerProps> = (props) => {
  const {
    visible,
    source: {
      data: sourceData,
      countryAdConfig: { countryGranularity, countryAdType, countryAdField },
    },
    zIndex = 0,
    showAdminLabel,
    adminLabelColor,
    adminLabelFontSize,
    adminLabelStroke,
    adminLabelStrokeWidth,
    showNationalBorders,
  } = props;
  const [labelData, setLabelData] = useState<Record<string, any>[]>([]);
  const [source, setSource] = useState<ChoroplethLayerProps['source']>();

  useEffect(() => {
    let didCancel = false;
    getAdminBoundaryData(sourceData, { countryGranularity, countryAdType, countryAdField })
      .then((adminBoundaryData) => {
        if (!didCancel) {
          const { data, joinBy, labelData: _labelData } = adminBoundaryData;
          setLabelData(_labelData);
          setSource({ data, parser: { type: 'json', geometry: '_geometry' }, transforms: [joinBy] });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      didCancel = true;
    };
  }, [sourceData, countryGranularity, countryAdType, countryAdField]);

  const textLayerOptions = {
    field: 'name',
    zIndex: zIndex + 0.1,
    style: {
      fontSize: adminLabelFontSize,
      fill: adminLabelColor,
      stroke: adminLabelStroke,
      strokeWidth: adminLabelStrokeWidth,
      // strokeOpacity: 1.0,
    },
    source: {
      data: labelData,
      parser: { type: 'json', coordinates: 'centroid' },
    },
  };

  return (
    <>
      {showNationalBorders && <ChinaCountryBoundary visible={visible} />}
      {source && (
        <ChoroplethLayer
          {...props}
          // label={{ ...props.label, position: { coordinates: 'centroid' } }}
          source={source}
        />
      )}
      {labelData.length !== 0 && showAdminLabel && <TextLayer visible={visible} {...textLayerOptions} />}
    </>
  );
};

export default ChinaAdminLayer;

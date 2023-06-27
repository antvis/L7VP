import type { BaseMode } from '@antv/l7-draw';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import type { Feature } from '@turf/turf';
import type { Properties } from '../registerForm';

export interface MeasureControlProps extends ImplementWidgetProps, Properties {}

export interface DrawCustomType {
  icon: () => React.ReactElement;
  draw: BaseMode;
  title: string;
  isActive: boolean;
  drawType: string;
}

interface MarkerType {
  lngLat: { lng: number; lat: number };
  text: string;
  editFeature: Feature;
}

export interface LineMarkerType extends MarkerType {
  nodeId: string | undefined;
  lineId: string | undefined;
  nodeIndex: number;
  isLast: boolean;
}

export type PolygonMarkerType = MarkerType & { polygonId: string | undefined };

export interface PopoverContentProps {
  color: string;
}

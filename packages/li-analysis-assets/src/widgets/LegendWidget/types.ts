import type { StyleAttributeField } from '@antv/l7';
import type { LegendCategoriesProps, LegendIconProps, LegendRampProps } from '@antv/larkmap';
import type { Layer } from '@antv/larkmap/es/types';

export interface LegendRampData {
  type: 'LegendRamp';
  data: LegendRampProps;
  layer: Layer;
  field?: StyleAttributeField;
  name: string;
  visible: boolean;
}

export interface LegendCategoriesData {
  type: 'LegendCategories';
  data: LegendCategoriesProps;
  layer: Layer;
  field?: StyleAttributeField;
  name: string;
  visible: boolean;
}

export interface LegendIconData {
  type: 'LegendIcon';
  data: LegendIconProps;
  layer: Layer;
  field?: StyleAttributeField;
  name: string;
  visible: boolean;
}

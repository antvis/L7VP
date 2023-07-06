import type { FieldSelectOptionType } from '@antv/li-p2';
import getStyleSchema from '@antv/li-p2/dist/esm/LayerAttribute/ChoroplethLayerStyle/schema';
import getAdminLabelSchema from './admin-label-schema';
import getCoordinateSchema from './coordinate-schema';
import getNationalStyleSchema from './national-style-schema';

export default (fieldList: FieldSelectOptionType[]) => {
  const styleSchema = getStyleSchema({ fieldList }).properties;
  const { collapseItem_fillColor, collapseItem_stroke, collapseItem_other } = styleSchema;

  return {
    ...getCoordinateSchema(fieldList),
    collapseItem_fillColor,
    collapseItem_stroke,
    ...getAdminLabelSchema(),
    ...getNationalStyleSchema(),
    collapseItem_other,
  };
};

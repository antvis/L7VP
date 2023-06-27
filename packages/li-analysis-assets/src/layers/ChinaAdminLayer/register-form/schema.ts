import type { FieldSelectOptionType } from '@antv/li-p2';
import getStyleSchema from '@antv/li-p2/dist/esm/LayerAttribute/ChoroplethLayerStyle/schema';
import getAdminLabelSchema from './admin-label-schema';
import getCoordinateSchema from './coordinate-schema';

export default (fieldList: FieldSelectOptionType[]) => {
  const styleSchema = getStyleSchema({ fieldList }).properties;
  // @ts-ignore
  styleSchema.collapseItem_labelstyle = getAdminLabelSchema().collapseItem_adminLabel;

  return {
    ...getCoordinateSchema(fieldList),
    ...styleSchema,
  };
};

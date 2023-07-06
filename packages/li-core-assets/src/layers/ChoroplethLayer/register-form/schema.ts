import type { FieldSelectOptionType } from '@antv/li-p2';
import getStyleSchema from '@antv/li-p2/dist/esm/LayerAttribute/ChoroplethLayerStyle/schema';
import getCoordinateSchema from './coordinate-schema';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    ...getCoordinateSchema(fieldList),
    ...getStyleSchema({ fieldList }).properties,
  };
};

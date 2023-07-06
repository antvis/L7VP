import type { FieldSelectOptionType } from '@antv/li-p2';
import getStyleSchema from '@antv/li-p2/dist/esm/LayerAttribute/LineLayerStyle/schema';
import { omit } from 'lodash-es';
import getCoordinateSchema from './coordinate-schema';

export default (fieldList: FieldSelectOptionType[]) => {
  const styleSchema = omit(getStyleSchema({ fieldList }).properties, 'collapseItem_animate');

  return {
    ...getCoordinateSchema(fieldList),
    ...styleSchema,
  };
};

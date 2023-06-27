import type { FieldSelectOptionType } from '@antv/li-p2';
import fillColorCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/fill-color-collapse';
import otherAttributesCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/other-attributes-collapse';
import getCoordinateSchema from './hex-id-schema';

export default (fieldList: FieldSelectOptionType[], colorRanges: [] = []) => {
  return {
    ...getCoordinateSchema(fieldList),
    collapseItem_fillColor: fillColorCollapse({ fieldList, colorRanges }),
    collapseItem_other: otherAttributesCollapse({}),
  };
};

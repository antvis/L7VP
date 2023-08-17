import type { FieldSelectOptionType } from '@antv/li-p2';
import fillColorCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/fill-color-collapse';
import otherAttributesCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/other-attributes-collapse';
import pointRadiusCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/point-radius-collapse';
import strokeCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/stroke-collapse';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    collapseItem_fillColor: fillColorCollapse({ fieldList }),
    collapseItem_stroke: strokeCollapse(),
    collapseItem_fillradius: pointRadiusCollapse({ fieldList, collapseTitle: '半径' }),
    collapseItem_other: otherAttributesCollapse(),
  };
};

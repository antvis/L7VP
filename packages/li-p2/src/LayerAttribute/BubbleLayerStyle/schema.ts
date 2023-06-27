import fillColorCollapse from '../common-schema/fill-color-collapse';
import labelCollapse from '../common-schema/label-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import pointRadius from '../common-schema/point-radius-collapse';
import strokeCollapse from '../common-schema/stroke-collapse';
import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions = {}) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(options),
      collapseItem_stroke: strokeCollapse(),
      collapseItem_fillradius: pointRadius(options),
      collapseItem_labelstyle: labelCollapse(options),
      // collapseItem_animate: animateCollapse(),
      collapseItem_other: otherAttributesCollapse(options),
    },
  };
};

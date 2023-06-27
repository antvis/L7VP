import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import type { AttributeSchemaOptions } from '../types';
import {
  getWidgetColorFormSchema,
  getWidgetNumberFormSchema,
  getWidgetRangeSliderFormSchema,
  getWidgetSliderFormSchema,
  getWidgetSwitchFormSchema,
  xReactions,
} from './helper';

export default (options: AttributeSchemaOptions = {}) => {
  return {
    type: 'object',
    properties: {
      collapseItem_lineStyle: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          lineStyle: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '线样式',
            },

            properties: {
              ...getWidgetSwitchFormSchema('fillColorField', '颜色权重映射', {
                default: true,
              }),

              ...getWidgetColorFormSchema('lineColor', '颜色', {
                default: 'orange',
                ...xReactions(['fillColorField'], false),
              }),

              ...getWidgetColorFormSchema('lineColorStart', '颜色1', {
                default: '#2a5674',
                ...xReactions(['fillColorField']),
              }),

              ...getWidgetColorFormSchema('lineColorEnd', '颜色2', {
                default: '#d1eeea',
                ...xReactions(['fillColorField']),
              }),

              ...getWidgetSwitchFormSchema('sizeFieldLine', '宽度权重映射', {
                default: true,
              }),

              ...getWidgetSliderFormSchema('lineSize', '宽度', {
                ...xReactions(['sizeFieldLine'], false),
                default: 1,
              }),

              ...getWidgetRangeSliderFormSchema('sizeRangeLine', '宽度', {
                default: [1, 16],
                ...xReactions(['sizeFieldLine']),
              }),

              ...getWidgetSliderFormSchema('lineOpacity', '透明度', {
                'x-component-props': { max: 1, min: 0, step: 0.1 },
                default: 1,
              }),
            },
          },
        },
      },

      collapseItem_pointStyle: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          pointStyle: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '点样式',
            },
            properties: {
              ...getWidgetSwitchFormSchema('fillColorFieldPoint', '颜色权重映射', {
                default: false,
              }),

              ...getWidgetColorFormSchema('circleColor', '填充色', {
                default: '#fff',
                ...xReactions(['fillColorFieldPoint'], false),
              }),

              ...getWidgetColorFormSchema('pointColorStart', '颜色1', {
                default: '#2a5674',
                ...xReactions(['fillColorFieldPoint'], true),
              }),

              ...getWidgetColorFormSchema('pointColorEnd', '颜色2', {
                default: '#d1eeea',
                ...xReactions(['fillColorFieldPoint'], true),
              }),

              ...getWidgetSwitchFormSchema('sizeFieldPoint', '尺寸权重映射', {
                default: true,
              }),

              ...getWidgetSliderFormSchema('pointSize', '尺寸', {
                default: 16,
                ...xReactions(['sizeFieldPoint'], false),
              }),

              ...getWidgetRangeSliderFormSchema('sizeRangePoint', '尺寸', {
                default: [1, 16],
                ...xReactions(['sizeFieldPoint']),
              }),

              ...getWidgetColorFormSchema('circleStrokeColor', '边框色', {
                default: '#000',
              }),

              ...getWidgetNumberFormSchema('circleStrokeWidth', '边框宽度', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 1,
              }),

              ...getWidgetSliderFormSchema('circleOpacity', '透明度', {
                'x-component-props': { max: 1, min: 0, step: 0.1 },
                default: 1,
              }),
            },
          },
        },
      },

      collapseItem_cluster: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          cluster: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '聚合',
            },
            properties: {
              ...getWidgetNumberFormSchema('clusterZoomStep', '层级步长', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 1,
              }),

              ...getWidgetNumberFormSchema('clusterNodeSize', '点像素值', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 64,
              }),

              ...getWidgetNumberFormSchema('clusterRadius', '聚合半径', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 40,
              }),

              ...getWidgetNumberFormSchema('clusterExtent', '聚合力度', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 512,
              }),

              ...getWidgetNumberFormSchema('maxTopFlowNum', '线最大条数', {
                'x-component-props': { placeholder: '请填写字段' },
                default: 5000,
              }),

              ...getWidgetSwitchFormSchema('fadeOpacityEnabled', '自动透明值', {
                default: true,
              }),

              ...getWidgetSliderFormSchema('fadeOpacityAmount', '透明权重', {
                default: 0,
              }),
            },
          },
        },
      },

      collapseItem_other: otherAttributesCollapse(options),
    },
  };
};

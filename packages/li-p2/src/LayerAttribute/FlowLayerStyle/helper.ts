import type { SchemaProperties } from '@formily/react';
import { merge } from 'lodash-es';
import type { FlowLayerStyleAttributeValue, ISize } from './types';
/**
 * 平铺数据转图层样式数据
 * 将表单的平铺数据转为图层样式的数据结构
 * */
export const flowLayerStyleFlatToConfig = (style: Record<string, any>) => {
  const styleConfig: FlowLayerStyleAttributeValue = {
    clusterZoomStep: style.clusterZoomStep,
    clusterNodeSize: style.clusterNodeSize,
    clusterRadius: style.clusterRadius,
    clusterExtent: style.clusterExtent,
    maxTopFlowNum: style.maxTopFlowNum,
    circleOpacity: style.circleOpacity,
    circleStrokeColor: style.circleStrokeColor,
    circleStrokeWidth: style.circleStrokeWidth,
    fadeOpacityEnabled: style.fadeOpacityEnabled,
    fadeOpacityAmount: style.fadeOpacityAmount,
    lineOpacity: style.lineOpacity,
    circleColor: style?.fillColorFieldPoint
      ? {
          field: 'weight',
          value: [style?.pointColorStart, style?.pointColorEnd],
        }
      : style?.circleColor,
    circleRadius: style?.sizeFieldPoint ? { field: 'weight', value: style.sizeRangePoint } : style?.pointSize,
    lineColor: style?.fillColorField
      ? {
          field: 'weight',
          value: [style?.lineColorStart, style?.lineColorEnd],
        }
      : style?.lineColor,
    lineWidth: style?.sizeFieldLine
      ? {
          field: 'weight',
          value: style.sizeRangeLine,
        }
      : style?.lineSize,
    minZoom: style.zoom?.[0],
    maxZoom: style.zoom?.[1],
    blend: style.blend,
  };

  return styleConfig;
};

/**
 * 图层样式数据转平铺数据
 * 将图层样式的数据结构转为表单的平铺数据
 * */
export const flowLayerStyleConfigToFlat = (styleCfg: FlowLayerStyleAttributeValue) => {
  const { circleRadius, lineColor, lineWidth, circleColor } = styleCfg;
  const config = {
    clusterZoomStep: styleCfg.clusterZoomStep,
    clusterNodeSize: styleCfg.clusterNodeSize,
    clusterRadius: styleCfg.clusterRadius,
    clusterExtent: styleCfg.clusterExtent,
    maxTopFlowNum: styleCfg.maxTopFlowNum,
    fadeOpacityEnabled: styleCfg.fadeOpacityEnabled,
    fadeOpacityAmount: styleCfg.fadeOpacityAmount,
    circleOpacity: styleCfg.circleOpacity,
    circleStrokeColor: styleCfg.circleStrokeColor,
    circleStrokeWidth: styleCfg.circleStrokeWidth,
    lineOpacity: styleCfg.lineOpacity,
    zoom: [styleCfg.minZoom, styleCfg.maxZoom],
    blend: styleCfg.blend,
    ...(typeof circleColor === 'object'
      ? {
          fillColorFieldPoint: true,
          pointColorStart: (circleColor?.value as string[])?.[0],
          pointColorEnd: (circleColor?.value as string[])?.[1],
        }
      : { circleColor: circleColor }),

    ...(typeof circleRadius === 'object'
      ? {
          sizeFieldPoint: true,
          sizeRangePoint: (circleRadius as ISize)?.value,
        }
      : { pointSize: circleRadius }),

    ...(typeof lineColor === 'object'
      ? {
          fillColorField: true,
          lineColorStart: (lineColor?.value as string[])?.[0],
          lineColorEnd: (lineColor?.value as string[])?.[1],
        }
      : { lineColor: lineColor }),

    ...(typeof lineWidth === 'object'
      ? {
          sizeFieldLine: true,
          sizeRangeLine: (lineWidth as ISize).value,
        }
      : { lineWidth: lineWidth }),
  };

  return config;
};

type FormilySchema = SchemaProperties<any, any, any, any, any, any, any, any>;

export function getWidgetSliderFormSchema(
  fieldName: string,
  fieldTitle: string,
  schema?: Partial<FormilySchema[string]>,
): FormilySchema {
  return {
    [fieldName]: merge(
      {
        title: fieldTitle,
        'x-decorator': 'FormItem',
        'x-component': 'Slider',
      },
      schema,
    ),
  };
}

export function getWidgetRangeSliderFormSchema(
  fieldName: string,
  fieldTitle: string,
  schema?: Partial<FormilySchema[string]>,
): FormilySchema {
  return {
    [fieldName]: merge(
      {
        title: fieldTitle,
        'x-decorator': 'FormItem',
        'x-component': 'SliderRange',
      },
      schema,
    ),
  };
}

export function getWidgetNumberFormSchema(
  fieldName: string,
  fieldTitle: string,
  schema?: Partial<FormilySchema[string]>,
): FormilySchema {
  return {
    [fieldName]: merge(
      {
        title: fieldTitle,
        'x-decorator': 'FormItem',
        'x-component': 'NumberPicker',
      },
      schema,
    ),
  };
}

export function getWidgetColorFormSchema(
  fieldName: string,
  fieldTitle: string,
  schema?: Partial<FormilySchema[string]>,
): FormilySchema {
  return {
    [fieldName]: merge(
      {
        title: fieldTitle,
        'x-decorator': 'FormItem',
        'x-component': 'ColorPicker',
      },
      schema,
    ),
  };
}

export function getWidgetSwitchFormSchema(
  fieldName: string,
  fieldTitle: string,
  schema?: Partial<FormilySchema[string]>,
): FormilySchema {
  return {
    [fieldName]: merge(
      {
        title: fieldTitle,
        'x-decorator': 'FormItem',
        'x-component': 'Switch',
      },
      schema,
    ),
  };
}

export function xReactions(dependencies: string[], which: boolean = true) {
  const visible = which ? '{{ $deps[0] }}' : '{{ !$deps[0] }}';
  return {
    'x-reactions': [
      {
        dependencies,
        fulfill: {
          state: { visible },
        },
      },
    ],
  };
}

import type { ILegend } from '@antv/l7';
import type { Layer } from '@antv/larkmap/es/types';
import type { LegendCategoriesData, LegendIconData, LegendRampData } from './types';

const getFormatLabel = (value: string | number) => {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('zh-CN', {
      notation: 'compact',
    }).format(value);
  }
  return value;
};

export const parserLegendData = (layer: Layer) => {
  const { name } = layer;
  const labels: string[] = [];
  const colors: string[] = [];

  // 如果是热力图图层
  if (layer.type === 'heatmapLayer' && layer.options?.style?.rampColors) {
    const data: LegendRampData = {
      type: 'LegendRamp',
      field: layer.options?.size?.field,
      data: {
        labels: layer.options?.style?.rampColors.positions,
        colors: layer.options?.style?.rampColors.colors,
        isContinuous: true,
      },
      layer,
      name,
      visible: true,
    };
    return data;
  }

  // 如果是图标图层
  if (layer.type === 'iconImageLayer') {
    if (layer.options?.icon?.field && layer.options?.iconAtlas && layer.options?.icon?.value) {
      const iconAtlas = layer.options.iconAtlas;

      const icons = layer.options.icon.value.map((item: string) => iconAtlas[item]);

      const data: LegendIconData = {
        type: 'LegendIcon',
        name,
        layer,
        visible: true,
        data: {
          labels: layer.options.icon.scale.domain,
          icons,
        },
      };

      return data;
    } else {
      const iconAtlas = layer.options.iconAtlas;

      const icons = [iconAtlas[layer.options.icon]];

      const data: LegendIconData = {
        type: 'LegendIcon',
        name,
        layer,
        visible: true,
        data: {
          labels: [''],
          icons,
        },
      };

      return data;
    }
  }

  let legendData: ILegend;

  try {
    legendData = layer.getLegend('color');
  } catch (error) {
    // 获取数据错误返回空数据图例
    const data: LegendCategoriesData = {
      type: 'LegendCategories',
      name,
      layer,
      visible: false,
      data: {
        geometryType: 'square',
        labels: [],
        colors,
      },
    };
    return data;
  }

  const { items, type, field } = legendData;

  items.forEach((item, index) => {
    if (Array.isArray(item.value)) {
      if (index === items.length - 1) {
        labels.push(...item.value.map((l) => getFormatLabel(l)));
      } else {
        labels.push(getFormatLabel(item.value[0]));
      }
    } else {
      labels.push(getFormatLabel(item.value));
    }
    colors.push(item.color);
  });

  if (type === 'threshold') {
    if (labels[0] === undefined) {
      labels.splice(0, 1, '<');
    }
    if (labels[labels.length - 1] === undefined) {
      labels.splice(labels.length - 1, 1, '<');
    }
  }

  if (type === 'cat') {
    // 分类图例
    // 对标签进行排序
    const catData = labels
      .map((label, index) => ({ label, color: colors[index] }))
      .sort((a, b) => a.label.localeCompare(b.label, 'zh-CN'));
    const data: LegendCategoriesData = {
      type: 'LegendCategories',
      field: field,
      name,
      layer,
      visible: true,
      data: {
        geometryType: 'square',
        labels: catData.map((item) => item.label),
        colors: catData.map((item) => item.color).filter(Boolean),
      },
    };

    return data;
  } else if (['linear', 'quantile', 'quantize', 'threshold'].includes(type as string)) {
    const data: LegendRampData = {
      type: 'LegendRamp',
      field: field,
      name,
      layer,
      visible: true,
      data: {
        labels,
        colors,
        labelUnit: '',
        isContinuous: false,
      },
    };
    return data;
  } else {
    const data: LegendCategoriesData = {
      type: 'LegendCategories',
      name,
      layer,
      visible: true,
      data: {
        geometryType: 'square',
        labels: [],
        colors,
      },
    };
    return data;
  }
};

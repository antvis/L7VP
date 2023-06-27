import type { ImplementWidget, WidgetCategory } from '@antv/li-sdk';
import { Widget_Category_Map } from '../constants';
import type { ContainerSlotMap, ImplementEditorWidget, ImplementEditorWidgetOptions } from '../types';
import type { NavMenuItem } from '../types/menu';

/**
 * 实现一个编辑器控件
 */
export function implementEditorWidget(options: ImplementEditorWidgetOptions): ImplementEditorWidget {
  return options;
}

/**
 * 解析侧边导航栏 menuPanel 插槽
 */
export function getMenuList(widgets: ImplementEditorWidget[]) {
  const menuList: NavMenuItem[] = widgets.map((widget) => {
    const menu = widget.menu!;
    return {
      component: widget.component,
      ...menu,
    };
  });

  return menuList;
}

/**
 * 通过插槽解析所有容器的控件
 */
export function resolveContainerSlotMap(widgets: ImplementEditorWidget[]) {
  const containerSlotMap: ContainerSlotMap = {};
  for (const w of widgets) {
    const slotContainer = w.container;
    const { type, slot } = slotContainer;

    if (!containerSlotMap[type]) {
      containerSlotMap[type] = {};
    }

    const children = containerSlotMap[type];
    if (!children[slot]) {
      children[slot] = [];
    }

    children[slot].push(w);
  }

  return containerSlotMap;
}

/**
 * 获取组件资产类别
 */
export const getWidgetCategory = (widget: ImplementWidget) => {
  const category = widget.metadata.category as WidgetCategory;
  const uncategorized = '未分类';

  const _category: string = category || 'Unclassified';
  const categoryName = category ? Widget_Category_Map.get(category) || category : uncategorized;

  return {
    category: _category,
    categoryName,
  };
};

/**
 * 获取市场组件资产类目
 */
export const getMarketWidgetCategory = (widgets: ImplementWidget[]) => {
  const categoryList = widgets
    .reduce((map, item) => {
      const category = getWidgetCategory(item);
      if (!map.has(category.category)) {
        map.set(category.category, { ...category, widgets: [item] });
      } else {
        map.get(category.category)?.widgets.push(item);
      }
      return map;
    }, new Map<string, { category: string; categoryName: string; widgets: ImplementWidget[] }>())
    .values();

  const newCategoryList = new Array(...categoryList);

  const sortKeys = new Array<string>(...Widget_Category_Map.keys());

  return newCategoryList.sort((item, next) => {
    const itemKey = sortKeys.findIndex((key) => key === item.category);
    const nextKey = sortKeys.findIndex((key) => key === next.category);
    if (itemKey < 0 || nextKey < 0) return nextKey - itemKey;
    return itemKey - nextKey;
  });
};

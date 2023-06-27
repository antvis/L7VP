import type { WidgetSchema } from '@antv/li-sdk';
import { isEqual, omit } from 'lodash-es';
import { useMemo, useRef } from 'react';

// 判断依赖组件配置是否发改变，避免 WidgetSchemaField schema 重复生成渲染
export const useWidgets = (widgets: WidgetSchema[], widgetSchemaId: string) => {
  const latestWidgets = useRef<WidgetSchema[]>();

  const _widgets = useMemo(() => {
    // 忽略组件本身修改，过滤本身
    const widgetsFilted = widgets.filter((widget) => widget.id !== widgetSchemaId);
    if (latestWidgets.current) {
      if (widgetsFilted.length === latestWidgets.current.length) {
        const isEqualWidgets = isEqual(
          widgetsFilted.map((item) => omit(item, 'properties')),
          latestWidgets.current.map((item) => omit(item, 'properties')),
        );
        if (!isEqualWidgets) latestWidgets.current = widgetsFilted;
      } else {
        latestWidgets.current = widgetsFilted;
      }
    } else {
      latestWidgets.current = widgetsFilted;
    }
    return latestWidgets.current;
  }, [widgetSchemaId, widgets]);

  return _widgets;
};

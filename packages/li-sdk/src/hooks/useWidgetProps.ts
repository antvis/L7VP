import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import { WidgetsStoreEvent } from '../state/constants';
import { useStateManager } from './internal';

export function useWidgetProps<O extends Record<string, unknown>>(widgetId: string) {
  const { widgetsStore } = useStateManager();
  const [widgetProps, setProperties] = useState(widgetsStore.getWidgetProperties<O>(widgetId));

  useUpdateEffect(() => {
    setProperties(widgetsStore.getWidgetProperties<O>(widgetId));
  }, [widgetsStore.getWidgets()]);

  useEffect(() => {
    const onWidgetPropertiesChange = (id: string, properties: O) => {
      if (widgetId === id) {
        setProperties(properties);
      }
    };

    widgetsStore.on(WidgetsStoreEvent.UPDATE_WIDGETSPROPS, onWidgetPropertiesChange);
    return () => {
      widgetsStore.off(WidgetsStoreEvent.UPDATE_WIDGETSPROPS, onWidgetPropertiesChange);
    };
  }, [widgetsStore]);

  const updataWidgetProps = useCallback((properties: Partial<O>) => {
    widgetsStore.setWidgetProperties(widgetId, properties);
  }, []);

  return [widgetProps, updataWidgetProps] as const;
}

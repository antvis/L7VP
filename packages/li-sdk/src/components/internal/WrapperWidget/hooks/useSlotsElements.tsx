import React, { useMemo } from 'react';
import WrapperWidget from '..';
import type { ChildrenMap, SlotsElements } from '../../../../types';

export function useSlotsElements(widgetId: string, childrenMap: ChildrenMap): SlotsElements {
  const slotsElements = useMemo<SlotsElements>(() => {
    const slots: SlotsElements = {};
    if (!childrenMap[widgetId]) return slots;

    for (const slot in childrenMap[widgetId]) {
      const slotChildren = childrenMap[widgetId][slot].map((child) => {
        return <WrapperWidget key={child.id} widget={child} childrenMap={childrenMap} />;
      });
      slots[slot] = function getSlot(slotProps: Record<string, any> = {}) {
        const children = slotChildren.map((child) => React.cloneElement(child, slotProps));
        return children;
      };
    }

    return slots;
  }, [childrenMap, widgetId]);

  return slotsElements;
}

import type { ImplementWidget, WidgetSchema } from '@antv/li-sdk';
import { getUniqueId, uniqueName } from '@antv/li-sdk';
import { AtomWidgetEmptyContainer, WidgetTypeMap } from '../../../constants';

export const getWidgetDefaultSchema = (widget: ImplementWidget, layoutWidgetSchema?: WidgetSchema): WidgetSchema => {
  const defaultProperties = widget.defaultProperties ?? {};

  switch (widget.metadata.type) {
    case WidgetTypeMap.Atom:
      return {
        id: getUniqueId(widget.metadata.name),
        type: widget.metadata.name,
        metadata: { name: uniqueName(widget.metadata.displayName) },
        properties: defaultProperties,
        container: AtomWidgetEmptyContainer,
      };
    case WidgetTypeMap.Auto:
      return {
        id: getUniqueId(widget.metadata.name),
        type: widget.metadata.name,
        metadata: { name: uniqueName(widget.metadata.displayName) },
        properties: defaultProperties,
        container: {
          id: layoutWidgetSchema?.id || '',
          slot: 'controls',
        },
      };
    case WidgetTypeMap.Layout:
      return {
        id: getUniqueId(widget.metadata.name),
        type: widget.metadata.name,
        metadata: { name: uniqueName(widget.metadata.displayName) },
        properties: defaultProperties,
      };
    // Container
    default:
      return {
        id: getUniqueId(widget.metadata.name),
        type: widget.metadata.name,
        metadata: { name: uniqueName(widget.metadata.displayName) },
        properties: defaultProperties,
        container: AtomWidgetEmptyContainer,
      };
  }
};

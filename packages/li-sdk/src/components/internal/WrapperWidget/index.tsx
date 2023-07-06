import { isEqual } from 'lodash-es';
import React, { memo } from 'react';
import { useRegistryManager } from '../../../hooks/internal';
import { useWidgetProps } from '../../../hooks/useWidgetProps';
import type { WidgetSchema } from '../../../specs';
import type { ChildrenMap } from '../../../types';
import { useSlotsElements } from './hooks/useSlotsElements';

export type WrapperWidgetProps = {
  widget: WidgetSchema;
  childrenMap: ChildrenMap;
};

const WrapperWidget: React.FC<WrapperWidgetProps> = (props) => {
  const { widget, childrenMap } = props;
  const metadata = widget.metadata;
  const widgetId = widget.id;
  const registryManager = useRegistryManager();
  const ImplWidget = registryManager.getWidget(widget.type).component;

  const [properties] = useWidgetProps(widgetId);
  const slotsElements = useSlotsElements(widgetId, childrenMap);

  // 性能优化，给 Widget memo 一下，避免没有必要的渲染
  // const Widget = useMemo(
  //   () => <ImplWidget key={widgetId} {...properties} slotsElements={slotsElements} />,
  //   [widgetId, properties, slotsElements],
  // );

  return (
    <React.Fragment key={widgetId}>
      <ImplWidget
        data-widget-id={widgetId}
        data-widget-name={metadata.name}
        key={widgetId}
        {...properties}
        slotsElements={slotsElements}
      />
    </React.Fragment>
  );
};

const MemoWrapperWidget = memo<WrapperWidgetProps>(WrapperWidget, (prevProps, nextProps) => {
  const prevChildren = prevProps.childrenMap[prevProps.widget.id]?._grandChildren;
  const nextChildren = nextProps.childrenMap[nextProps.widget.id]?._grandChildren;
  const prevComponent = prevProps.widget;
  const nextComponent = nextProps.widget;
  const isComponentEqual = isEqual(prevChildren, nextChildren);

  return isComponentEqual && prevComponent === nextComponent;
});

export default MemoWrapperWidget;

import type { WidgetSchema } from '../specs';
import BaseStore from './base-store';
import { WidgetsStoreEvent } from './constants';

export type WidgetsState = {
  widgets: Map<string, WidgetSchema>;
};
export type WidgetsStoreInterface = InstanceType<typeof WidgetsStore>;

/**
 * 组件状态管理
 */
class WidgetsStore extends BaseStore<WidgetsState> {
  public state: WidgetsState;

  constructor() {
    super();
    this.state = { widgets: new Map() };
  }

  public initState(initialState: { widgets: WidgetSchema[] }) {
    this.state = {
      widgets: new Map(initialState.widgets.map((item) => [item.id, item])),
    };
  }

  public setWidgetProperties<O extends Record<string, unknown>>(id: string, properties: Partial<O>) {
    const widget = this.getWidgetById(id);
    if (widget) {
      const newProperties = { ...widget.properties, properties };
      this.state.widgets.set(id, { ...widget, properties: newProperties });
      this.emit(WidgetsStoreEvent.UPDATE_WIDGETSPROPS, id, newProperties);
    }
  }

  public getWidgetById(id: string) {
    return this.state.widgets.get(id);
  }

  public getWidgetProperties<O extends Record<string, unknown>>(id: string) {
    return (this.state.widgets.get(id)?.properties || {}) as O;
  }

  public getWidgets() {
    return this.state.widgets;
  }

  public getWidgetList() {
    const widgets = Array.from(this.state.widgets.values());

    return widgets;
  }
}

export default WidgetsStore;

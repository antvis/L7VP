import { isUndefined } from 'lodash-es';
import type { EditorSideNavContainer, ImplementEditorWidget } from '../types';

class EditorWidgetManager {
  private widgets = new Map<string, ImplementEditorWidget>();

  constructor(widgets: ImplementEditorWidget[] = []) {
    this.installWidgets(widgets);
  }

  registerWidget(widget: ImplementEditorWidget): void {
    // 注册相同控件覆盖掉之前的
    this.widgets.set(widget.metadata.name, widget);
  }

  getWidget(name: string): ImplementEditorWidget | null {
    const c = this.widgets.get(name);
    if (!c) {
      const empty = { component: () => `组件 ${name} 未注册成功.`, metadata: {} };
      return (empty as any) as ImplementEditorWidget;
    }
    return c;
  }

  public getAllWidgets(): ImplementEditorWidget[] {
    const result: ImplementEditorWidget[] = [];
    for (const widget of this.widgets.values()) {
      result.push(widget);
    }
    return result;
  }

  public installWidgets(widgets: ImplementEditorWidget[] = []) {
    widgets.forEach((w) => this.registerWidget(w));
  }

  public getContainerWithinSideNavWidgets(slot?: EditorSideNavContainer['slot']) {
    const widgets: ImplementEditorWidget[] = [];
    this.widgets.forEach((widget) => {
      if (widget.container.type === 'SideNav' && (isUndefined(slot) || widget.container.slot === slot)) {
        widgets.push(widget);
      }
    });
    return widgets;
  }

  public getNavSlotMenuPanelWidgets() {
    const widgets = this.getContainerWithinSideNavWidgets('menuPanel');
    return widgets;
  }

  public getNavSlotBottomWidgets() {
    const widgets = this.getContainerWithinSideNavWidgets('bottom');
    console.log('widgets: ', widgets);
    return widgets;
  }
}

export default EditorWidgetManager;

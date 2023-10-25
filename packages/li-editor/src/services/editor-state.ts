import type { Application } from '@antv/li-sdk';
import { Subscribable } from '@antv/li-sdk';
import type { Draft } from 'immer';
import produce, { freeze } from 'immer';
import type { EditorContextState } from '../types';
import { validateApplicationSchema } from '../utils/application';

type DraftFunction<S> = (draft: Draft<S>) => void;
type EditorStateListener = (data: EditorContextState) => void;

export class EditorState extends Subscribable<EditorStateListener> {
  private state!: EditorContextState;

  constructor(defaultApplication: Application, activeNavMenuKey: string = 'datasets') {
    super();
    this.initState(defaultApplication, activeNavMenuKey);
  }

  public initState(defaultApplication: Application, activeNavMenuKey: string) {
    // 校验 Application Schema 是否规范
    const _defaultApplication = validateApplicationSchema(defaultApplication);
    const { metadata, datasets, spec } = _defaultApplication;
    const { map, layers, widgets } = spec;
    const state = freeze({
      activeNavMenuKey,
      collapsed: false,
      metadata,
      map,
      // dataset 不进行 deep freeze，避免 freeze data 数据性能损耗
      datasets: datasets.map((dataset) => freeze(dataset, false)),
      layers,
      widgets,
    });

    this.state = state;

    this.notify();
  }

  public setState(updater: EditorContextState | DraftFunction<EditorContextState>) {
    if (updater === this.state) return;

    if (typeof updater === 'function') {
      this.state = produce(this.state, updater);
    } else {
      this.state = freeze({ ...updater, datasets: updater.datasets.map((dataset) => freeze(dataset, false)) });
    }

    this.notify();
  }

  private notify() {
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }

  public getSnapshot() {
    return this.state;
  }

  destroy() {
    this.listeners = new Set();
  }
}

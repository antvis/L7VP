import BaseStore from './base-store';
import { GlobalStoreEvent } from './constants';

export type GlobalModel = Record<string, any>;

export type GlobalState = {
  global: GlobalModel;
};

/**
 * 全局扩展状态管理
 */
class GlobalStore extends BaseStore<GlobalState> {
  public state: GlobalState = {
    global: {},
  };

  constructor(initialState?: GlobalState) {
    super();
    if (initialState) {
      this.state = initialState;
    }
  }

  public restState(state: GlobalState) {
    this.state = state;
  }

  public setGlobal(global: GlobalModel) {
    this.state.global = { ...this.state.global, ...global };
    this.emit(GlobalStoreEvent.UPDATE_GLOBAL, this.getGlobal());
  }

  public getGlobal() {
    return this.state.global;
  }
}

export default GlobalStore;

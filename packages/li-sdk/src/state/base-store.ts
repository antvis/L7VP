import EventEmitter from '@antv/event-emitter';

/**
 * 状态管理基础类
 */
abstract class BaseStore<S> extends EventEmitter {
  public abstract state: S;
}

export default BaseStore;

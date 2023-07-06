/**
 * 数据集状态管理事件
 */
export enum DatasetsStoreEvent {
  'ADD_DATASET' = 'add:dataset',
  'REMOVE_DATASET' = 'remove:dataset',
  'UPDATE_DATASET' = 'update:dataset',
  'ADD_FILTER' = 'add:filter',
  'UPDATE_FILTER' = 'update:filter',
  'REMOVE_FILTER' = 'remove:filter',
  'CLEAR_FILTER' = 'clear:filter',
}

/**
 * 地图状态管理事件
 */
export enum MapStoreEvent {
  'SET_SCENE' = 'set-scene',
  'UPDATE_VIEWSTATE' = 'update:view-state',
}

/**
 * 图层状态管理事件
 */
export enum LayersStoreEvent {
  'ADD_LAYER' = 'add:layer',
  'REMOVE_LAYER' = 'remove:layer',
  'UPDATE_LAYER' = 'update:layer',
  'SET_LAYERMANAGER' = 'set:layer-manager',
}

/**
 * 组件状态管理事件
 */
export enum WidgetsStoreEvent {
  'UPDATE_WIDGETSPROPS' = 'update:widgets-props',
}

/**
 * 全局扩展状态管理
 */
export enum GlobalStoreEvent {
  'UPDATE_GLOBAL' = 'update:global',
}

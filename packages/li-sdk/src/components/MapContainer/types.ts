import type { Scene } from '@antv/l7';
import type React from 'react';
import type { CSSProperties } from 'react';
import type { ImplementWidgetProps, SlotsElements } from '../../types';

export interface MapContainerProps extends Omit<ImplementWidgetProps, 'data-widget-id' | 'data-widget-name'> {
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
  /** 场景加载成功回调 */
  onSceneLoaded?: (scene: Scene) => void;
  /** 插槽 */
  slotsElements: SlotsElements<'content' | 'controls'>;
  /** 子组件 */
  children?: React.ReactNode;
}

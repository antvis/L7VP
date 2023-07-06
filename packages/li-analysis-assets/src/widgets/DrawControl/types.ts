import type { DrawPolygon, DrawLine, DrawPoint, DrawRect, DrawCircle } from '@antv/l7-draw';
import type { CSSProperties, ReactNode } from 'react';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import type { Feature } from '@turf/turf';
import type { Properties } from './registerForm';

/**
 * 绘制类型
 */
export type DrawType = 'point' | 'rect' | 'line' | 'circle' | 'polygon' | 'undefined';

/**
 * 绘制的额外操作，清空 显示或者隐藏
 */
export type DrawTools = 'clear' | 'on' | 'off';

export interface DrawWidgetProps extends ImplementWidgetProps, Properties {}

export type DrawStyle = {
  color: string;
  stroke: string;
  size: number;
  pointSize: number;
  shape: string;
};

export interface ContextMenuItemProps {
  text: string;
  icon?: ReactNode;
  onClick?: (e: Feature) => void;
}
export interface ContextMenuProps {
  /** 子组件 */
  children?: (e: Feature) => React.ReactNode;
  structure: Partial<Record<DrawType, DrawPolygon | DrawLine | DrawPoint | DrawRect | DrawCircle>>;
}

export interface ToolItem<T = any> {
  value: string;
  label: string;
  icon: ReactNode;
  style?: CSSProperties;
  onClick?: (e: T) => void;
}

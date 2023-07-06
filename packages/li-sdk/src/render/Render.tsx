import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React, { useMemo } from 'react';
import WrapperWidget from '../components/internal/WrapperWidget';
import type { Application } from '../specs';
import { resolveChildrenMap } from '../utils';

export type LIRenderProps = {
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
  /** 应用配置 */
  config: Application;
  /** 子组件 */
  children?: React.ReactNode;
};

const LIRender: React.FC<LIRenderProps> = (props) => {
  const { className, style, config, children } = props;
  const { widgets } = config.spec;
  const { topLevelWidgets, childrenMap } = useMemo(() => resolveChildrenMap(widgets), [widgets]);

  return (
    <div className={classNames('location-insight', className)} style={style}>
      {topLevelWidgets.map((widget) => {
        return <WrapperWidget key={widget.id} widget={widget} childrenMap={childrenMap} />;
      })}
      {children}
    </div>
  );
};

export default LIRender;

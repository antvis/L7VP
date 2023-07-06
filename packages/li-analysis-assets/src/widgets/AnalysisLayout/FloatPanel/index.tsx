import { RightOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import type { CSSProperties } from 'react';
import React from 'react';
import useStyle from './style';
import { CLS_PREFIX } from './constant';

type FloatPanelProps = {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};

const FloatPanel: React.FC<FloatPanelProps> = (props) => {
  const { collapsed, onCollapse, children, className, style } = props;
  const styles = useStyle();

  return (
    <div className={classNames(styles.floatPanel, className, { [styles.floatPanelHidden]: collapsed })} style={style}>
      <div
        className={classNames(styles.toggleBtn, `${CLS_PREFIX}__float-panel__toggle-btn`)}
        onClick={() => {
          onCollapse(!collapsed);
        }}
      >
        <RightOutlined rotate={collapsed ? 180 : 0} />
      </div>
      <div className={classNames(styles.panelContent, `${CLS_PREFIX}__float-panel__content`)}>
        {collapsed ? null : children}
      </div>
    </div>
  );
};

export default FloatPanel;

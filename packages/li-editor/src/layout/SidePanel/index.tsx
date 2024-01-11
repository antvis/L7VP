import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useEditorState, usePrefixCls } from '../../hooks';
import { useEditorContext } from '../../hooks/internal';
import useStyle from './style';

type SidePanelProps = {
  className?: string;
};

const SidePanel: React.FC<SidePanelProps> = (props) => {
  const { className } = props;
  const prefixCls = usePrefixCls('side-panel');
  const styles = useStyle();
  const { editorService } = useEditorContext();
  const { state } = useEditorState();
  const navMenuList = useMemo(() => editorService.getNavMenuList(), []);
  const matchItem = navMenuList.find((item) => item.key === state.activeNavMenuKey);
  const { component: Component } = matchItem!;

  return (
    <div className={classNames(`${prefixCls}`, styles.sidePanel, className)}>
      <div className={classNames(`${prefixCls}__header`, styles.panelHeader)} />
      <Component className={classNames(`${prefixCls}__content`, styles.panelContent)} />
    </div>
  );
};

export default SidePanel;

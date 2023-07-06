import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useEditorState } from '../../hooks';
import { useEditorContext } from '../../hooks/internal';
import './index.less';

type SidePanelProps = {
  className?: string;
};

const SidePanel: React.FC<SidePanelProps> = (props) => {
  const { className } = props;
  const { editorService } = useEditorContext();
  const { state } = useEditorState();
  const navMenuList = useMemo(() => editorService.getNavMenuList(), []);
  const matchItem = navMenuList.find((item) => item.key === state.activeNavMenuKey);
  const { component: Component } = matchItem!;

  return (
    <div className={classNames('li-side-panel', className)}>
      <div className="li-side-bar__header" />
      <Component className="li-side-panel__content" />
    </div>
  );
};

export default SidePanel;

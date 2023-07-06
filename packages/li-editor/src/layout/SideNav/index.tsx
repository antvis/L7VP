import { Space } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useEditorState } from '../../hooks';
import { useEditorContext } from '../../hooks/internal';
import './index.less';
import NavMenu from './NavMenu';

type SideNavProps = {
  className?: string;
};

const SideNav: React.FC<SideNavProps> = (props) => {
  const { containerSlotMap, editorService } = useEditorContext();
  const { state, updateState } = useEditorState();
  const topWidgets = containerSlotMap.SideNav?.top || [];
  const navMenuList = useMemo(() => editorService.getNavMenuList(), []);
  const actionsWidgets = containerSlotMap.SideNav?.bottom || [];

  const onChange = (key: string) => {
    updateState((draft) => {
      draft.activeNavMenuKey = key;
      if (draft.collapsed) {
        draft.collapsed = false;
      }
      editorService.publishEvent('select-nav-menu', key);
    });
  };

  return (
    <div className={classNames('li-side-nav', props.className)}>
      <div className="li-side-nav__top">
        {topWidgets.map((widget) => (
          <widget.component key={widget.metadata.name} />
        ))}
      </div>
      <NavMenu
        className="li-side-nav__menu"
        selectedKey={state.activeNavMenuKey}
        items={navMenuList}
        onChange={onChange}
      />
      <div className={'li-side-nav__bottom'}>
        <Space direction="vertical" size="middle">
          {actionsWidgets.map((widget) => (
            <widget.component key={widget.metadata.name} />
          ))}
        </Space>
      </div>
    </div>
  );
};

export default SideNav;

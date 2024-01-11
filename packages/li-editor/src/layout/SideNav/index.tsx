import { Space } from 'antd';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import { useEditorState, usePrefixCls } from '../../hooks';
import { useEditorContext } from '../../hooks/internal';
import NavMenu from './NavMenu';
import useStyle from './style';

type SideNavProps = {
  className?: string;
};

const SideNav: React.FC<SideNavProps> = (props) => {
  const prefixCls = usePrefixCls('side-nav');
  const styles = useStyle();
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
    <div className={classNames(`${prefixCls}`, styles.sideNav, props.className)}>
      <div className="li-side-nav__top">
        {topWidgets.map((widget) => (
          <widget.component key={widget.metadata.name} />
        ))}
      </div>
      <NavMenu
        className={classNames(`${prefixCls}__nemu`, styles.sideNavMenu)}
        selectedKey={state.activeNavMenuKey}
        items={navMenuList}
        onChange={onChange}
      />
      <div className={classNames(`${prefixCls}__bottom`, styles.sideNavBottom)}>
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

import { Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { usePrefixCls } from '../../../hooks';
import type { NavMenuItem } from '../../../types/menu';
import useStyle from './style';

export type NavMenuProps = {
  className?: string;
  items: NavMenuItem[];
  selectedKey: NavMenuItem['key'];
  onChange: (key: NavMenuItem['key']) => void;
};

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { className, selectedKey, items, onChange } = props;
  const prefixCls = usePrefixCls('nav-menu');
  const styles = useStyle();

  return (
    <ul className={classNames(prefixCls, styles.navMenu, className)}>
      {items.map((item) => {
        const { icon, key, name } = item;
        const isActive = key === selectedKey;

        return (
          <Tooltip key={key} placement="right" title={name}>
            <li
              onClick={() => {
                onChange(item.key);
              }}
              className={classNames(`${prefixCls}__item`, styles.menuItem, {
                [styles.menuItemActive]: isActive,
                [`${prefixCls}__item-active`]: isActive,
              })}
            >
              <span className={classNames(`${prefixCls}__item-icon`, styles.menuItemIcon, className)}>{icon}</span>
              {/* <span className='li-nav-menu__item-icon'>{name}</span> */}
            </li>
          </Tooltip>
        );
      })}
    </ul>
  );
};

export default NavMenu;

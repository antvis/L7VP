import { Tooltip } from 'antd';
import classNames from 'classnames';
import React from 'react';
import type { NavMenuItem } from '../../../types/menu';
import './index.less';

export type NavMenuProps = {
  className?: string;
  items: NavMenuItem[];
  selectedKey: NavMenuItem['key'];
  onChange: (key: NavMenuItem['key']) => void;
};

const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { className, selectedKey, items, onChange } = props;

  return (
    <ul className={classNames('li-nav-menu', className)}>
      {items.map((item) => {
        const { icon, key, name } = item;
        const isActive = key === selectedKey;

        return (
          <Tooltip key={key} placement="right" title={name}>
            <li
              onClick={() => {
                onChange(item.key);
              }}
              className={classNames('li-nav-menu__item', {
                ['li-nav-menu__item_active']: isActive,
              })}
            >
              <span className="li-nav-menu__item-icon">{icon}</span>
              {/* <span className='li-nav-menu__item-icon'>{name}</span> */}
            </li>
          </Tooltip>
        );
      })}
    </ul>
  );
};

export default NavMenu;

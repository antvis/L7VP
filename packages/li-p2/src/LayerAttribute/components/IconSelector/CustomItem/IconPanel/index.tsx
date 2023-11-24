import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Tooltip } from 'antd';
import cls from 'classnames';
import React from 'react';
import type { IconItem, IconOptionsType } from '../../type';
import useStyle from './style';

type IconPanelProps = {
  iconList: IconOptionsType;
  onChange: (val: IconItem) => void;
};

const IconPanel = (props: IconPanelProps) => {
  const prefixCls = usePrefixCls('formily-icon-custom-selector-icon-panel');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { iconList = [], onChange } = props;

  const onIconChange = (icon: IconItem) => {
    onChange(icon);
  };

  return wrapSSR(
    <div className={cls(prefixCls, hashId)}>
      {iconList.map((item) => {
        if (item.icons.length === 0) {
          return;
        }

        return (
          <div className={cls(`${prefixCls}__icon-content`, hashId)} key={item.type}>
            <div className={cls(`${prefixCls}__icon-content__header`, hashId)}>{item.type}</div>
            <div className={cls(`${prefixCls}__icon-content__img`, hashId)}>
              {item.icons.map((icon) => (
                <Tooltip title={icon.name} key={icon.id}>
                  <img key={icon.id} src={icon.image} onClick={() => onIconChange(icon)} />
                </Tooltip>
              ))}
            </div>
          </div>
        );
      })}
    </div>,
  );
};

export default IconPanel;

import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Popover, Select } from 'antd';
import cls from 'classnames';
import React from 'react';
import type { IconListItem } from '../type';
import useStyle from './style';

type IconSelector = {
  value: IconListItem;
  size?: 'small' | 'middle' | 'large';
  iconList: { type: string; icons: string[] }[];
  fieldList: { label: string; value: string }[];
  onChange: (val: IconListItem) => void;
  onDelete: () => void;
};

const CustomItem = (props: IconSelector) => {
  const prefixCls = usePrefixCls('formily-icon-custom-selector-icon-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, iconList = [], fieldList = [], size = 'middle', onChange, onDelete } = props;

  const onIconChange = (icon: string) => {
    const _itemValue = { ...defaultValue, icon };
    onChange(_itemValue);
  };

  const onFieldChange = (field: string) => {
    const _itemValue = { ...defaultValue, value: field };
    onChange(_itemValue);
  };

  const content = () => {
    return (
      <div
        className={cls(`${prefixCls}__icon-popover`, hashId)}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {iconList.map((item) => {
          return (
            <div className={cls(`${prefixCls}__icon-popover__icon-content`, hashId)}>
              <div className={cls(`${prefixCls}__icon-popover__icon-content__header`, hashId)}>{item.type}</div>
              <div className={cls(`${prefixCls}__icon-popover__icon-content__img`, hashId)}>
                {item.icons.map((icon) => (
                  <img key={icon} src={icon} onClick={() => onIconChange(icon)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return wrapSSR(
    <div className={cls(prefixCls, hashId)}>
      <div className={cls(`${prefixCls}__icon`, hashId)}>
        <Popover arrow={false} content={content} trigger="click" overlayClassName={cls(`${prefixCls}__icon`, hashId)}>
          <img className={cls(`${prefixCls}__icon__img`, hashId)} src={defaultValue.icon} />
        </Popover>
      </div>
      <div className={cls(`${prefixCls}__value`, hashId)}>
        <Select
          className={cls(`${prefixCls}__select`, hashId)}
          size={size}
          value={defaultValue.value}
          popupMatchSelectWidth={false}
          options={fieldList}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onChange={(field: string) => onFieldChange(field)}
        />
      </div>
      <div className={cls(`${prefixCls}__delete`, hashId)}>
        <DeleteOutlined onClick={onDelete} />
      </div>
    </div>,
  );
};

export default CustomItem;

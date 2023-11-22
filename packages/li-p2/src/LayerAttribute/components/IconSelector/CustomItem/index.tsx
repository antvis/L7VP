import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Button, Popover, Select } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import type { IconListItem } from '../type';
import IconListContent from './IconListContent';
import useStyle from './style';

type CustomItemProps = {
  value: IconListItem;
  size?: 'small' | 'middle' | 'large';
  disabled: boolean;
  iconList: { type: string; icons: { title: string; img: string }[] }[];
  fieldList: { label: string; value: string }[];
  onChange: (val: IconListItem) => void;
  onDelete: () => void;
};

const CustomItem = (props: CustomItemProps) => {
  const prefixCls = usePrefixCls('formily-icon-custom-selector-icon-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const {
    value: defaultValue,
    disabled = false,
    iconList = [],
    fieldList = [],
    size = 'middle',
    onChange,
    onDelete,
  } = props;
  const [open, setOpen] = useState(false);

  const onIconChange = (icon: { title: string; img: string }) => {
    const _itemValue = { ...defaultValue, icon: icon.img, title: icon.title };
    onChange(_itemValue);
    setOpen(false);
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
        <IconListContent iconList={iconList} onChange={onIconChange} />
      </div>
    );
  };

  return wrapSSR(
    <div className={cls(prefixCls, hashId)}>
      <div className={cls(`${prefixCls}__icon`, hashId)}>
        <Popover
          open={open}
          arrow={false}
          content={content}
          trigger="click"
          overlayClassName={cls(`${prefixCls}__icon`, hashId)}
          onOpenChange={(_open) => {
            setOpen(_open);
          }}
        >
          <img
            className={cls(`${prefixCls}__icon__img`, hashId)}
            src={defaultValue.icon}
            onClick={() => setOpen(true)}
          />
        </Popover>
      </div>
      <div className={cls(`${prefixCls}__value`, hashId)}>
        <Select
          className={cls(`${prefixCls}__select`, hashId)}
          placeholder="请选择类型"
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

      <Button type="link" disabled={disabled} className={cls(`${prefixCls}__delete`, hashId)}>
        <DeleteOutlined onClick={onDelete} />
      </Button>
    </div>,
  );
};

export default CustomItem;

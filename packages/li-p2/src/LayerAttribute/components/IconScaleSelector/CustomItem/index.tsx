import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Button, Popover, Select } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import IconPanel from '../IconPanel';
import type { CustomMappingDataItem, IconItem, IconList } from '../type';
import useStyle from './style';

type CustomItemProps = {
  value: CustomMappingDataItem;
  size?: 'small' | 'middle' | 'large';
  disabled: boolean;
  iconList: IconList;
  fieldList: { label: string; value: string }[];
  onChange: (val: CustomMappingDataItem) => void;
  onDelete: () => void;
};

const CustomItem = (props: CustomItemProps) => {
  const prefixCls = usePrefixCls('formily-icon-scale-selector-icon-item');
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

  const onIconChange = (icon: IconItem) => {
    const _itemValue = { ...defaultValue, ...icon };
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
        <IconPanel iconList={iconList} onChange={onIconChange} />
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
          <img className={cls(`${prefixCls}__icon__img`, hashId)} src={defaultValue.url} />
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

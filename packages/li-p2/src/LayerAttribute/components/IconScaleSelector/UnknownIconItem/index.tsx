import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Popover, Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import IconPanel from '../IconPanel';
import type { IconItem, IconList } from '../type';
import { BuiltInImageList } from '../constant';
import useStyle from './style';

type UnknownIconProps = {
  size?: 'small' | 'middle' | 'large';
  value: string;
  iconList: IconList;
  onChange: (val: string) => void;
};

const UnknownIcon = (props: UnknownIconProps) => {
  const prefixCls = usePrefixCls('formily-icon-scale-selector-unknown-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, size = 'middle', iconList = [], onChange } = props;
  const [open, setOpen] = useState(false);

  const defaultUrl = useMemo(() => {
    if (defaultValue) {
      return BuiltInImageList.find((item) => item.id === defaultValue)?.url;
    }
  }, [defaultValue]);

  const onIconChange = (icon: IconItem) => {
    onChange(icon.id);
    setOpen(false);
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
          {defaultUrl ? (
            <img className={cls(`${prefixCls}__icon__img`, hashId)} src={defaultUrl} onClick={() => setOpen(true)} />
          ) : (
            <div className={cls(`${prefixCls}__icon__img`, hashId)} />
          )}
        </Popover>
      </div>

      <div className={cls(`${prefixCls}__value`, hashId)}>
        <Select className={cls(`${prefixCls}__select`, hashId)} placeholder="其他" size={size} disabled={true} />
      </div>

      <div className={cls(`${prefixCls}__delete`, hashId)} />
    </div>,
  );
};

export default UnknownIcon;

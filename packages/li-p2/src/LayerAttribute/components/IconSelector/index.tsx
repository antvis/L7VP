import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { DEFAULT_ICON_CATEGORY } from '../IconScaleSelector/constant';
import IconPanel from '../IconScaleSelector/CustomItem/IconPanel';
import type { IconItem } from '../IconScaleSelector/type';
import useStyle from './style';

export type IconListProps = {
  onChange: (icon: string) => void;
  value?: string;
};

const Internal: React.FC<IconListProps> = (props) => {
  const { value: defaultValue, onChange } = props;
  const prefixCls = usePrefixCls('formily-icon-list');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);

  const selectOptions = useMemo(() => {
    if (!defaultValue) {
      return [];
    }
    const img = (DEFAULT_ICON_CATEGORY.map((item) => item.icons).flat() || []).find(
      (_item) => _item?.id === defaultValue,
    )?.url;
    return [{ value: defaultValue, label: img }];
  }, [defaultValue]);

  const onIconChange = (icon: IconItem) => {
    onChange(icon.id);
    setOpen(false);
  };

  return wrapSSR(
    <Select
      placeholder="请选择图标"
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return <IconPanel iconList={DEFAULT_ICON_CATEGORY} onChange={onIconChange} />;
      }}
      value={selectOptions[0]?.value}
    >
      {selectOptions.length &&
        selectOptions.map((item) => {
          return (
            <Select.Option key={item.toString()} value={item.value}>
              <img src={item.label} />
            </Select.Option>
          );
        })}
    </Select>,
  );
};

const IconSelector = connect(Internal);
export default IconSelector;

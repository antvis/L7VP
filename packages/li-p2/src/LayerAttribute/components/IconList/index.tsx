import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { DEFAULTICONOPTIONS } from '../IconSelector/constant';
import IconListContent from '../IconSelector/CustomItem/IconListContent';
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
    const img = (DEFAULTICONOPTIONS.map((item) => item.icons).flat() || []).find(
      (_item) => _item?.title === defaultValue,
    )?.img;
    return [{ value: defaultValue, label: img }];
  }, [defaultValue]);

  const onIconChange = (icon: { title: string; img: string }) => {
    onChange(icon.title);
    setOpen(false);
  };

  return wrapSSR(
    <Select
      placeholder="请选择图标"
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div>
            <IconListContent iconList={DEFAULTICONOPTIONS} onChange={onIconChange} />
          </div>
        );
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

const IconList = connect(Internal);
export default IconList;

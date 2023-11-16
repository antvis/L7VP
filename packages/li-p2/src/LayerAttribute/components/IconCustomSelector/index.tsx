import { PlusCircleOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { getUId } from '../../../utils';
import { DEFAULTICONOPTIONS } from './constant';
import CustomItem from './CustomItem';
import { getIconSelectorData, getLayerByIconSelectorData } from './helper';
import useStyle from './style';
import type { IconListItem } from './type';

type IconSelector = {
  // options
  options: string[];
  // value
  value: Record<string, string>;
  onChange: (val: Record<string, string>) => void;
};

const Internal = (props: IconSelector) => {
  const prefixCls = usePrefixCls('formily-icon-custom-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value, onChange } = props;
  const [open, setOpen] = useState(false);
  const [iconList, setIconList] = useState<IconListItem[]>([]);

  const fieldList = useMemo(() => {
    if (options.length) {
      return options.map((item) => ({ label: item, value: item }));
    }
    return [];
  }, [options]);

  useEffect(() => {
    if (value) {
      const _iconList = getLayerByIconSelectorData(value);
      setIconList(_iconList);
    }
  }, [value]);

  const onAddItem = () => {
    setIconList([...iconList, { id: getUId(), icon: '', value: '' }]);
  };

  const onItemChange = (val: IconListItem) => {
    const _iconList = iconList.map((item) => (item.id === val.id ? val : item));
    setIconList(_iconList);
    onChange(getIconSelectorData(_iconList));
  };

  const onItemDelete = (id: string) => {
    const _iconList = iconList.filter((item: IconListItem) => item.id !== id);
    setIconList(_iconList);
    onChange(getIconSelectorData(_iconList));
  };

  const selectOptions = useMemo(() => {
    if (!iconList) {
      return [];
    }
    return [{ value: 'selectedIcon', label: iconList.map((item) => item.icon) }];
  }, [iconList]);

  return wrapSSR(
    <Select
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div>
            {iconList?.map((item) => {
              return (
                <CustomItem
                  key={item.id}
                  size="small"
                  value={item}
                  iconList={DEFAULTICONOPTIONS}
                  fieldList={fieldList}
                  onChange={(val: IconListItem) => onItemChange(val)}
                  onDelete={() => onItemDelete(item.id)}
                />
              );
            })}
            <div className={cls(`${prefixCls}__add-item`, hashId)}>
              <PlusCircleOutlined onClick={onAddItem} />
            </div>
          </div>
        );
      }}
      value={selectOptions[0].value}
    >
      {selectOptions.map((item) => {
        return (
          <Select.Option key={item.toString()} value={item.value}>
            {item.label.map((icon) => (
              <img src={icon} />
            ))}
          </Select.Option>
        );
      })}
    </Select>,
  );
};

const IconCustomSelector = connect(Internal);

export default IconCustomSelector;

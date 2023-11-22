import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button, Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { getUId } from '../../../utils';
import { BuiltInImageList } from '../../IconImageLayerStyle/constant';
import { DEFAULTICONOPTIONS } from './constant';
import CustomItem from './CustomItem';
import useStyle from './style';
import type { IconItem, IconListItem } from './type';
import UnknownIcon from './UnknownIcon';

type IconSelectorValue = {
  iconList: IconListItem[];
  unknownIcon: IconItem;
};

type IconSelectorProps = {
  // 可选择字段
  options: string[];
  value: IconSelectorValue;
  onChange: (val: IconSelectorValue) => void;
};

const Internal = (props: IconSelectorProps) => {
  const prefixCls = usePrefixCls('formily-icon-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options = [], value: defaultValue, onChange } = props;
  const [open, setOpen] = useState(false);
  const [unknownIcon, setUnknownIcon] = useState<IconItem>(defaultValue.unknownIcon);

  const DefaultIconList = useMemo(() => {
    if (defaultValue?.iconList && defaultValue.iconList.length) {
      return defaultValue.iconList;
    } else {
      const _options = options.length > 2 ? options.slice(0, 2) : options;
      const _list = _options.map((item, index) => {
        return {
          id: getUId(),
          icon: BuiltInImageList[index].icon,
          value: item,
          title: BuiltInImageList[index].title,
        };
      });
      onChange({ iconList: _list, unknownIcon });
      return _list;
    }
  }, [options]);

  const [iconList, setIconList] = useState<IconListItem[]>(DefaultIconList);

  useEffect(() => {
    setIconList(DefaultIconList);
  }, [DefaultIconList]);

  const onAddItem = () => {
    setIconList([
      ...iconList,
      { id: getUId(), icon: BuiltInImageList[0].icon, value: undefined, title: BuiltInImageList[0].title },
    ]);
  };

  const onItemChange = (val: IconListItem) => {
    const _iconList = iconList.map((item) => (item.id === val.id ? val : item));
    setIconList(_iconList);
  };

  const onItemDelete = (id: string) => {
    const _iconList = iconList.filter((item: IconListItem) => item.id !== id);
    setIconList(_iconList);
  };

  const onSubmit = () => {
    onChange({ iconList, unknownIcon });
    setOpen(false);
  };

  const fieldList = useMemo(() => {
    if (!options.length) {
      return [];
    }

    return options.map((item) => ({ label: item, value: item }));
  }, [options]);

  const selectOptions = useMemo(() => {
    if (!defaultValue.iconList) {
      return [];
    }

    return [{ value: 'selectedIcon', label: defaultValue.iconList.map((item) => item.icon) }];
  }, [defaultValue]);

  return wrapSSR(
    <Select
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <>
            {iconList?.map((item) => {
              const selected = iconList.map((icon) => {
                if (icon.value !== item.value) {
                  return icon.value;
                }
              });
              const _options = fieldList.filter((_item) => !selected.includes(_item.value));

              return (
                <div className={cls(`${prefixCls}__customItem`, hashId)} key={item.id}>
                  <CustomItem
                    key={item.id}
                    size="small"
                    value={item}
                    disabled={iconList.length <= 1}
                    iconList={DEFAULTICONOPTIONS}
                    fieldList={_options}
                    onChange={(val: IconListItem) => onItemChange(val)}
                    onDelete={() => onItemDelete(item.id)}
                  />
                </div>
              );
            })}

            <UnknownIcon
              size="small"
              value={unknownIcon}
              iconList={DEFAULTICONOPTIONS}
              onChange={({ title, icon }) => setUnknownIcon({ title, icon })}
            />

            <Button
              className={cls(`${prefixCls}__add-item`, hashId)}
              size="small"
              type="link"
              disabled={fieldList.length === iconList.length}
              onClick={onAddItem}
            >
              <PlusOutlined /> 添加
            </Button>

            <div className={cls(`${prefixCls}__btn`, hashId)}>
              <span onClick={onSubmit}>应用</span>
            </div>
          </>
        );
      }}
      value={selectOptions[0]?.value}
    >
      {selectOptions.map((item) => {
        return (
          <Select.Option key={item.value} value={item.value}>
            {item.label.map((icon) => (
              <img src={icon} />
            ))}
          </Select.Option>
        );
      })}
    </Select>,
  );
};

const IconSelector = connect(Internal);

export default IconSelector;

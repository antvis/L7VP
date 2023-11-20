import { PlusCircleOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button, Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { getUId } from '../../../utils';
import { DEFAULTICONOPTIONS } from './constant';
import CustomItem from './CustomItem';
import useStyle from './style';
import type { IconListItem } from './type';

type IconSelectorProps = {
  // 可选择字段
  options: string[];
  value: { id: string; icon: string; value: string }[];
  onChange: (val: { id: string; icon: string; value: string }[]) => void;
};

const Internal = (props: IconSelectorProps) => {
  const prefixCls = usePrefixCls('formily-icon-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options = [], value: defaultValue, onChange } = props;
  const [open, setOpen] = useState(false);
  const DefaultIconList = defaultValue.length ? defaultValue : [{ id: getUId(), icon: '', value: '' }];
  const [iconList, setIconList] = useState<IconListItem[]>(DefaultIconList);

  const fieldList = useMemo(() => {
    if (options.length) {
      return options.map((item) => ({ label: item, value: item }));
    }
    return [];
  }, [options]);

  const onAddItem = () => {
    setIconList([...iconList, { id: getUId(), icon: '', value: '' }]);
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
    onChange(iconList);
    setOpen(false);
  };

  const selectOptions = useMemo(() => {
    if (!defaultValue) {
      return [];
    }
    return [{ value: 'selectedIcon', label: defaultValue.map((item) => item.icon) }];
  }, [defaultValue]);

  return wrapSSR(
    <Select
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <>
            <div className={cls(`${prefixCls}__header`, hashId)}>
              <div className={cls(`${prefixCls}__header-icon`, hashId)}>符号</div>
              <div className={cls(`${prefixCls}__header-field`, hashId)}>类型</div>
            </div>
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
                    iconList={DEFAULTICONOPTIONS}
                    fieldList={_options}
                    onChange={(val: IconListItem) => onItemChange(val)}
                    onDelete={() => onItemDelete(item.id)}
                  />
                </div>
              );
            })}
            <Button
              className={cls(`${prefixCls}__add-item`, hashId)}
              size="small"
              onClick={onAddItem}
              type="link"
              disabled={fieldList.length === iconList.length}
            >
              <PlusCircleOutlined /> 添加
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

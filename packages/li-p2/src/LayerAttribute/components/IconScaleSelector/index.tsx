import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button, Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { BuiltInImageList, DEFAULT_ICON_CATEGORY } from './constant';
import CustomItem from './CustomItem';
import { getCustomMappingData, getDefaultValue, getScaleByCustomMappingData } from './helper';
import useStyle from './style';
import type { CustomMappingDataItem, IconScaleSelectorValue } from './type';

type IconScaleSelectorProps = {
  /**
   * 自定义参数值
   */
  domain: string[];
  value: IconScaleSelectorValue;
  onChange: (val: IconScaleSelectorValue) => void;
};

const DEfAULT_UNKONW_ICON = 'unknown_icon';

const Internal = (props: IconScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-icon-scale-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { domain = [], value: defaultValue, onChange } = props;
  const [open, setOpen] = useState(false);
  const [unknownIcon, setUnknownIcon] = useState<string>(DEfAULT_UNKONW_ICON);

  const defaultCustomMappingData = useMemo(() => {
    if (defaultValue && defaultValue.range) {
      return getCustomMappingData(defaultValue);
    }
    return [];
  }, [defaultValue]);

  const [customMappingIcons, setCustomMappingIcons] = useState(defaultCustomMappingData);

  // 是否存在初始值，如果没有进行默认赋值
  useEffect(() => {
    if (!defaultValue || !defaultValue.range) {
      const _defaultVal = getDefaultValue(domain);
      setCustomMappingIcons(_defaultVal);
      const scaleValue: IconScaleSelectorValue = getScaleByCustomMappingData(_defaultVal, unknownIcon);
      onChange(scaleValue);
    }
  }, [defaultCustomMappingData, defaultValue]);

  const onAddItem = () => {
    const selectedIcon = customMappingIcons.map((item) => item.id);
    const unselectedIcon = BuiltInImageList.filter((item) => !selectedIcon.includes(item.id));
    const defaultIcon = unselectedIcon[0] || BuiltInImageList[0];

    setCustomMappingIcons((pre) =>
      pre.concat({
        id: defaultIcon.id,
        url: defaultIcon.url,
        value: '',
        name: defaultIcon.id,
      }),
    );
  };

  const onItemChange = (val: CustomMappingDataItem, index: number) => {
    const _scaleList = customMappingIcons.map((item, _index) => (_index === index ? val : item));
    setCustomMappingIcons(_scaleList);
  };

  const onItemDelete = (index: number) => {
    const _scaleList = customMappingIcons.filter((_, _index) => _index !== index);
    setCustomMappingIcons(_scaleList);
  };

  const onSubmit = () => {
    const scaleValue = getScaleByCustomMappingData(customMappingIcons, unknownIcon);
    onChange(scaleValue);
    setOpen(false);
  };

  const fieldList = useMemo(() => {
    if (!domain.length) {
      return [];
    }

    return domain.map((item) => ({ label: item, value: item }));
  }, [domain]);

  const selectedIconList = useMemo(() => {
    if (!customMappingIcons) {
      return [];
    }
    return [{ value: 'selectedIcon', label: customMappingIcons.map((item) => item.url) }];
  }, [customMappingIcons]);

  return wrapSSR(
    <Select
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <>
            {customMappingIcons?.map((item: CustomMappingDataItem, index: number) => {
              const selected = customMappingIcons.map((icon) => {
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
                    disabled={customMappingIcons.length <= 1}
                    iconList={DEFAULT_ICON_CATEGORY}
                    fieldList={_options}
                    onChange={(val: CustomMappingDataItem) => onItemChange(val, index)}
                    onDelete={() => onItemDelete(index)}
                  />
                </div>
              );
            })}

            {/* 由于 unknow 变化更新不及时，其他暂时隐藏 */}
            {/* <UnknownIconItem
              size="small"
              value={unknownIcon}
              iconList={DEFAULTICONOPTIONS}
              onChange={({ title, icon }) => setUnknownIcon({ title, icon })}
            /> */}

            <Button className={cls(`${prefixCls}__add-item`, hashId)} size="small" type="link" onClick={onAddItem}>
              <PlusOutlined /> 添加
            </Button>

            <div className={cls(`${prefixCls}__btn`, hashId)}>
              <span onClick={onSubmit}>应用</span>
            </div>
          </>
        );
      }}
      value={selectedIconList[0]?.value}
    >
      {selectedIconList.map((item) => {
        return (
          <Select.Option key={item.value} value={item.value}>
            {item.label.map((icon, index) => (
              <img src={icon} key={index} />
            ))}
          </Select.Option>
        );
      })}
    </Select>,
  );
};

const IconScaleSelector = connect(Internal);

export default IconScaleSelector;

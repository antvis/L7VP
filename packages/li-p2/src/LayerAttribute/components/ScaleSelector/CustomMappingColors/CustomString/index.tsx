import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useMemo } from 'react';
import type { CustomMappingColorItem } from '../../type';
import CustomItem from './CustomItem';
import useStyle from './style';
import UnknownItem from './UnknownItem';

type CustomStringProps = {
  domain: string[];
  unknown: string;
  value: CustomMappingColorItem[];
  onChange: (value: CustomMappingColorItem[]) => void;
  onUnknownColorChange: (color: string) => void;
  className?: string;
};

const CustomString = (props: CustomStringProps) => {
  const { value: defaultValue = [], unknown = '#f000', domain, onChange, onUnknownColorChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-string');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const selectedOption = useMemo(() => {
    if (defaultValue.length) {
      const values = defaultValue.map((item) => item.value).flat();
      return values;
    }

    return [];
  }, [defaultValue]);

  const selectOptions = useMemo(() => {
    return (domain as string[]).map((value: string) => ({ label: value, value }));
  }, [domain]);

  const addPaletteRangeItem = () => {
    const addItem: CustomMappingColorItem = {
      id: uniqueId(),
      value: [],
      color: defaultValue[defaultValue.length - 1]?.color ?? '#5B8FF9',
    };

    const list: CustomMappingColorItem[] = [...defaultValue, addItem];
    onChange(list);
  };

  const deletePaletteRangeItem = (index: number) => {
    const _ranges = defaultValue.filter((_, _index) => _index !== index);
    onChange(_ranges);
  };

  const onChangePaletteRangeItem = (value: (string | number)[], color: string, index: number) => {
    const list: CustomMappingColorItem[] = defaultValue.map((item, _index) => {
      if (index === _index) {
        return {
          ...item,
          value,
          color,
        };
      }

      return item;
    });

    onChange(list);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      {defaultValue.map((customItem: CustomMappingColorItem, index: number) => {
        return (
          <CustomItem
            key={`custom-input-string${index}`}
            color={customItem.color}
            value={customItem.value}
            selectedOption={selectedOption}
            selectOptions={selectOptions}
            onDelete={() => deletePaletteRangeItem(index)}
            onChange={(value: (string | number)[], color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <UnknownItem color={unknown} onChange={onUnknownColorChange} />

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>
    </div>,
  );
};

export default CustomString;

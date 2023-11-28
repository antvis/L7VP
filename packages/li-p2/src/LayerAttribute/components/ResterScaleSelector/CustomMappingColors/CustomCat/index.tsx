import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React from 'react';
import type { CustomMappingColorItem } from '../../type';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomStringProps = {
  value: CustomMappingColorItem[];
  onChange: (value: CustomMappingColorItem[]) => void;
  className?: string;
};

const CustomString = (props: CustomStringProps) => {
  const { value: defaultValue = [], onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-string');
  const [wrapSSR, hashId] = useStyle(prefixCls);

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

  const onChangePaletteRangeItem = (value: number[], color: string, index: number) => {
    const list = defaultValue.map((item, _index) => {
      if (index === _index) {
        const _item: CustomMappingColorItem = {
          ...item,
          value,
          color,
        };
        return _item;
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
            key={`custom-input-cat${index}`}
            color={customItem.color}
            value={customItem.value}
            onDelete={() => deletePaletteRangeItem(index)}
            onChange={(value: number[], color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>
    </div>,
  );
};

export default CustomString;

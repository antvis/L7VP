import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React from 'react';
import type { CustomMappingColorItem } from '../../type';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomNumberProps = {
  value: CustomMappingColorItem[];
  onChange: (value: CustomMappingColorItem[]) => void;
  className?: string;
};

const CustomNumber = (props: CustomNumberProps) => {
  const { value: defaultValue = [], onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-number');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const addPaletteRangeItem = () => {
    const _item = defaultValue[defaultValue.length - 2];
    const min = Number(_item.value[0]);
    const _interval = Number(((Number(_item.value[1]) - Number(_item.value[0])) / 2).toFixed(2));
    const _range = [min, Number((_interval + min).toFixed(2)), Number(_item.value[1])];

    const addList: CustomMappingColorItem[] = [
      {
        id: _item.id,
        value: [_range[0], _range[1]],
        color: _item.color ?? '#5B8FF9',
      },
      {
        id: defaultValue[defaultValue.length - 1].id,
        value: [_range[1], _range[2]],
        color: defaultValue[defaultValue.length - 1].color ?? '#5B8FF9',
      },
      {
        id: uniqueId(),
        value: [_range[2], Infinity],
        color: defaultValue[defaultValue.length - 1].color ?? '#5B8FF9',
      },
    ];
    const list = [...defaultValue.slice(0, -2), ...addList];
    onChange(list);
  };

  const deletePaletteRangeItem = (index: number, position: string | null) => {
    const _value = defaultValue[index];

    const list: CustomMappingColorItem[] = defaultValue
      .map((item, _index) => {
        if (index === _index) {
          return item;
        }

        if (position !== 'last') {
          // 下一个
          if (index + 1 === _index) {
            return {
              ...item,
              value: [_value.value[0], item.value[1]],
            };
          }

          return item;
        } else {
          //上一个
          if (index - 1 === _index) {
            return {
              ...item,
              value: [item.value[0], Infinity],
            };
          }

          return item;
        }
      })
      .filter((_, _index) => _index !== index);

    onChange(list);
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

      if (index - 1 === _index) {
        return {
          ...item,
          value: [item.value[0], value[0]],
        };
      }

      if (index + 1 === _index) {
        return {
          ...item,
          value: [value[1], item.value[1]],
        };
      }

      return item;
    });

    onChange(list);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      {defaultValue.map((customItem: CustomMappingColorItem, index: number) => {
        const position = index === 0 ? 'first' : index === defaultValue.length - 1 ? 'last' : null;

        return (
          <CustomItem
            key={`custom-input-number${index}`}
            color={customItem.color}
            value={customItem.value}
            position={position}
            delDisable={defaultValue.length <= 3}
            onDelete={() => deletePaletteRangeItem(index, position)}
            onChange={(value: (string | number)[], color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>
    </div>,
  );
};

export default CustomNumber;

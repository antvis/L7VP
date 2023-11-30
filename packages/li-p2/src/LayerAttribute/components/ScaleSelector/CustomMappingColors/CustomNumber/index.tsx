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
  domain: [number, number];
  onChange: (value: CustomMappingColorItem[]) => void;
  className?: string;
};

const CustomNumber = (props: CustomNumberProps) => {
  const { value: defaultValue = [], domain, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-number');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const addPaletteRangeItem = () => {
    // 初始为0
    if (defaultValue.length === 0) {
      const _medianValue = Number(((Number(domain[1]) - Number(domain[0])) / 2).toFixed(2));
      const addList: CustomMappingColorItem[] = [
        {
          id: uniqueId(),
          value: [-Infinity, _medianValue],
          color: '#5B8FF9',
        },
        {
          id: uniqueId(),
          value: [_medianValue, Infinity],
          color: '#5B8FF9',
        },
      ];
      return onChange(addList);
    }

    const _domain: [number, number] =
      defaultValue.length === 1 ? domain : [Number(defaultValue[defaultValue.length - 1].value[0]), domain[1]];
    const _medianValue: number = Number(((Number(_domain[1]) - Number(_domain[0])) / 2).toFixed(2));
    const ranges = [Number(_domain[0]), Number((_medianValue + _domain[0]).toFixed(2))];

    const addList: CustomMappingColorItem[] = [
      {
        id: defaultValue[defaultValue.length - 1].id,
        value: [_domain[0], ranges[1]],
        color: defaultValue[defaultValue.length - 1].color ?? '#5B8FF9',
      },
      {
        id: uniqueId(),
        value: [ranges[1], Infinity],
        color: defaultValue[defaultValue.length - 1].color ?? '#5B8FF9',
      },
    ];

    const list = [...defaultValue.slice(0, -1), ...addList];

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
        const _min = position === 'first' ? -Infinity : (defaultValue[index - 1].value[0] as number);
        const _max = position === 'last' ? Infinity : defaultValue[index + 1]?.value?.[1];

        return (
          <CustomItem
            key={`custom-input-number${index}`}
            color={customItem.color}
            value={customItem.value}
            min={_min as number}
            max={_max as number}
            position={position}
            delDisable={defaultValue.length <= 2}
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

import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React from 'react';
import type { CustomMappingColorItem } from '../../type';
import CustomInput from './CustomInput';
import useStyle from './style';

type CustomNumberProps = {
  domain: string[] | [number, number];
  value?: CustomMappingColorItem[];
  customRanges: CustomMappingColorItem[];
  onChange: (value: CustomMappingColorItem[]) => void;
  className?: string;
};

const CustomNumber = (props: CustomNumberProps) => {
  const { customRanges = [], domain, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-number');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const addPaletteRangeItem = () => {
    const _item = customRanges[customRanges.length - 2];
    const min = Number(_item.value[0]);
    const _interval = Number(((Number(_item.value[1]) - Number(_item.value[0])) / 2).toFixed(2));

    const addList: CustomMappingColorItem[] = [
      {
        id: _item.id,
        value: [min, _interval + min],
        color: _item.color ?? '#5B8FF9',
      },
      {
        id: customRanges[customRanges.length - 1].id,
        value: [_interval + min, Number(_interval * 2) + min],
        color: customRanges[customRanges.length - 1].color ?? '#5B8FF9',
      },
      {
        id: uniqueId(),
        value: [Number(_interval * 2) + min, Infinity],
        color: customRanges[customRanges.length - 1].color ?? '#5B8FF9',
      },
    ];
    const list = [...customRanges.slice(0, -2), ...addList];
    onChange(list);
  };

  const deletePaletteRangeItem = (index: number, position: string | null) => {
    const _value = customRanges[index];

    const list: CustomMappingColorItem[] = customRanges
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
    const list: CustomMappingColorItem[] = customRanges.map((item, _index) => {
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
      {customRanges.map((customItem: CustomMappingColorItem, index: number) => {
        const [min, max] = domain as [number, number];
        const position = index === 0 ? 'first' : index === customRanges.length - 1 ? 'last' : null;
        const _min = index === 0 ? min : (customRanges[index - 1].value[1] as number);

        return (
          <CustomInput
            key={`custom-input-number${index}`}
            color={customItem.color}
            value={customItem.value}
            min={_min}
            max={max}
            position={position}
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

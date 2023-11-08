import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import type { CustomMappingColorItem, CustomMappingData } from '../type';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomMappingColorProps = {
  type: 'cat' | 'custom';
  domain: string[] | [number, number];
  value?: CustomMappingData;
  onChange: (value: CustomMappingData) => void;
  className?: string;
};

const CustomMappingColor = (props: CustomMappingColorProps) => {
  const { type = 'cat', domain, value, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-rester-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomMappingColorItem[]>([]);

  useEffect(() => {
    if (value?.list?.length) {
      const list = value.list.map((item: CustomMappingColorItem) => {
        return {
          id: uniqueId(),
          ...item,
        };
      });
      setCustomRanges(list);
    }
  }, [value]);

  const addPaletteRangeItem = () => {
    if (type === 'custom') {
      const _item = customRanges[customRanges.length - 1];
      const min = Number(_item.value[0]);
      const _interval = Number(((Number(domain[1]) - min) / 2).toFixed(2)) + min;

      const addList: CustomMappingColorItem[] = [
        {
          id: _item.id,
          value: [min, _interval],
          color: _item.color ?? '#5B8FF9',
        },
        {
          id: uniqueId(),
          value: [_interval, Infinity],
          color: _item.color ?? '#5B8FF9',
        },
      ];
      const list = [...customRanges.slice(0, -1), ...addList];
      setCustomRanges(list);
    } else {
      const addItem: CustomMappingColorItem = {
        id: uniqueId(),
        value: [],
        color: customRanges[customRanges.length - 1]?.color ?? '#5B8FF9',
      };

      const list: CustomMappingColorItem[] = [...customRanges, addItem];
      setCustomRanges(list);
    }
  };

  const deletePaletteRangeItem = (index: number, position: string | null) => {
    if (type === 'custom') {
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

      setCustomRanges(list);
    } else {
      setCustomRanges((pre) => pre.filter((_, _index) => _index !== index));
    }
  };

  const onChangePaletteRangeItem = (value: number[], color: string, index: number) => {
    if (type === 'custom') {
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

      setCustomRanges(list);
    } else {
      const list: CustomMappingColorItem[] = customRanges.map((item, _index) => {
        if (index === _index) {
          return {
            ...item,
            value,
            color,
          };
        }

        return item;
      });

      setCustomRanges(list);
    }
  };

  const onSubmit = () => {
    const list = customRanges.map((item) => {
      return { value: item.value, color: item.color };
    });
    onChange({ type, list });
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      {customRanges.map((customItem: CustomMappingColorItem, index: number) => {
        const [min, max] = domain as [number, number];
        const position = index === 0 ? 'first' : index === customRanges.length - 1 ? 'last' : null;

        return (
          <CustomItem
            customType={type}
            key={`drag_card${index}`}
            color={customItem.color}
            value={customItem.value}
            min={min}
            max={max}
            position={position}
            onDelete={() => deletePaletteRangeItem(index, position)}
            onChange={(value: number[], color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>

      <div className={`${prefixCls}__btn`}>
        <span onClick={onSubmit}>应用</span>
      </div>
    </div>,
  );
};

export default CustomMappingColor;
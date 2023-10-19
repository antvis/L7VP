import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { isEmpty, uniqueId } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import type { CustomItems, CustomItemType } from '../type';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomContentProps = {
  fieldType: 'string' | 'number';
  domain: string[] | [number, number];
  customRanges?: CustomItemType;
  onChange: (value: CustomItemType) => void;
  className?: string;
};

const CustomContent = (props: CustomContentProps) => {
  const { fieldType = 'string', domain, customRanges: defaultCustomRanges, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomItems[]>([]);

  const selectedOption = useMemo(() => {
    if (fieldType === 'string' && customRanges.length) {
      const values = customRanges.map((item) => item.value).flat();
      return values;
    }

    return [];
  }, [customRanges]);

  const selectOptions = useMemo(() => {
    if (fieldType === 'string') {
      return (domain as string[]).map((value: string) => ({ label: value, value }));
    }

    return [];
  }, [domain]);

  useEffect(() => {
    if (defaultCustomRanges?.list?.length) {
      const list = defaultCustomRanges.list.map((item: CustomItems) => {
        return {
          id: uniqueId(),
          ...item,
        };
      });
      setCustomRanges(list);
    }
  }, [defaultCustomRanges]);

  const addPaletteRangeItem = () => {
    if (fieldType === 'number') {
      const _item = customRanges[customRanges.length - 1];
      const min = Number(_item.value[0]);
      const _interval = Number(((Number(domain[1]) - min) / 2).toFixed(2)) + min;

      const addList = [
        {
          id: _item.id,
          value: [min, _interval],
          color: _item.color ?? '#5B8FF9',
        },
        {
          id: uniqueId(),
          value: [_interval, null],
          color: _item.color ?? '#5B8FF9',
        },
      ];
      const list: CustomItems[] = [...customRanges.slice(0, -1), ...addList];
      setCustomRanges(list);
    } else {
      const addItem: CustomItems = {
        id: uniqueId(),
        value: [],
        color: customRanges[customRanges.length - 1]?.color ?? '#5B8FF9',
      };

      const list: CustomItems[] = [...customRanges, addItem];
      setCustomRanges(list);
    }
  };

  console.log(customRanges);

  const deletePaletteRangeItem = (index: number, position: string | null) => {
    if (fieldType === 'number') {
      const _value = customRanges[index];

      const list = customRanges
        .map((item, _index) => {
          if (index === _index) {
            return undefined;
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
                value: [item.value[0], null],
              };
            }

            return item;
          }
        })
        .filter((item) => !isEmpty(item)) as CustomItems[];

      setCustomRanges(list);
    } else {
      setCustomRanges((pre) => pre.filter((_, _index) => _index !== index));
    }
  };

  const onChangePaletteRangeItem = (value: (string | number | null)[], color: string, index: number) => {
    if (fieldType === 'number') {
      const list = customRanges.map((item, _index) => {
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
      const list = customRanges.map((item, _index) => {
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
    onChange({ type: fieldType, list });
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      {customRanges.map((customItem: CustomItems, index: number) => {
        const [min, max] = domain as [number, number];
        const position = index === 0 ? 'first' : index === customRanges.length - 1 ? 'last' : null;

        return (
          <CustomItem
            customType={fieldType}
            key={`drag_card${index}`}
            color={customItem.color}
            value={customItem.value}
            selectedOption={selectedOption}
            selectOptions={selectOptions}
            min={min}
            max={max}
            position={position}
            onDelete={() => deletePaletteRangeItem(index, position)}
            onChange={(value: (string | number | null)[], color: string) =>
              onChangePaletteRangeItem(value, color, index)
            }
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

export default CustomContent;

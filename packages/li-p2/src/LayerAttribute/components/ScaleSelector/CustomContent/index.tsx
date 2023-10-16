import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { isEmpty, uniqueId } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import type { CustomItems, CustomItemType, CustomItemValueType, DatasetType } from '../type';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomContentProps = {
  fieldType: 'string' | 'number';
  dataset: DatasetType | any;
  customRanges: CustomItemType;
  onChange: (value: CustomItemType) => void;
  className?: string;
};

const CustomContent = (props: CustomContentProps) => {
  const { fieldType = 'string', dataset, customRanges: defaultCustomRanges, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomItems[]>([]);

  const selectedOption = useMemo(() => {
    if (!customRanges.length) {
      return [];
    }

    const values = customRanges.map((item) => item.value).flat();
    return values;
  }, [customRanges]);

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
    const addItem: CustomItems = {
      id: uniqueId(),
      value: [],
      color: customRanges[customRanges.length - 1]?.color ?? '#5B8FF9',
    };

    const list: CustomItems[] = [...customRanges, addItem];
    setCustomRanges(list);
  };

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

  const onChangePaletteRangeItem = (value: CustomItemValueType, color: string, index: number) => {
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
        const min = index === 0 ? dataset?.min : customRanges[index - 1].value[1];
        const max = dataset?.max;
        const position = index === 0 ? 'first' : index === customRanges.length - 1 ? 'last' : null;

        return (
          <CustomItem
            customType={fieldType}
            key={`drag_card${index}`}
            color={customItem.color}
            value={customItem.value}
            selectedOption={selectedOption}
            selectOptions={dataset.list}
            min={min}
            max={max}
            position={position}
            onDelete={() => deletePaletteRangeItem(index, position)}
            onChange={(value: CustomItemValueType, color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>

      <div className={`${prefixCls}__btn`}>
        <span onClick={onSubmit}>确定</span>
      </div>
    </div>,
  );
};

export default CustomContent;

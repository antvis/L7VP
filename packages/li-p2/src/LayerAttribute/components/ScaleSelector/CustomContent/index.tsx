import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio } from 'antd';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { CustomItems, CustomItemType, CustomItemValueType, CustomType, DatasetType } from '../type';
import { customTypeList } from './contants';
import CustomItem from './CustomItem';
import useStyle from './style';

type CustomContentProps = {
  fieldType: string;
  // 数据集展示信息
  dataset: DatasetType | any;
  customRanges: CustomItemType;
  onChange: (value: CustomItemType) => void;
  onCancel: () => void;
  className?: string;
};

const CustomContent = (props: CustomContentProps) => {
  const { fieldType, dataset, customRanges: defaultCustomRanges, onChange, onCancel, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomItems[]>([]);
  const [customType, setCustomType] = useState<CustomType>(dataset.type || 'string');

  const selectedOption = useMemo(() => {
    if (!customRanges.length) {
      return [];
    }

    const values = customRanges.map((item) => item.value).flat();
    return values;
  }, [customRanges]);

  useEffect(() => {
    if (defaultCustomRanges.list?.length) {
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

  const onChangeSort = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = customRanges.slice();
    const temp = data[Number(dragIndex)];
    data[Number(dragIndex)] = data[Number(hoverIndex)];
    data[Number(hoverIndex)] = temp;
    setCustomRanges(data);
  };

  const deletePaletteRangeItem = (id: string) => {
    setCustomRanges((pre) => pre.filter((item) => item.id !== id));
  };

  const onChangePaletteRangeItem = (id: string, value: CustomItemValueType, color: string) => {
    const list = customRanges.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          value,
          color,
        };
      }
      return item;
    });

    setCustomRanges(list);
  };

  const onSubmit = () => {
    const list = customRanges.map((item) => {
      return { value: item.value, color: item.color };
    });
    onChange({ type: customType, list });
    onCancel();
  };

  const onCustomTypeChange = (type: CustomType) => {
    setCustomType(type);
    const addItem: CustomItems[] = [
      {
        id: uniqueId(),
        value: [],
        color: '#5B8FF9',
      },
    ];
    setCustomRanges(addItem);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      <Radio.Group value={customType} onChange={(e) => onCustomTypeChange(e.target.value)}>
        {customTypeList.map((item) => {
          return (
            <Radio.Button
              value={item.value}
              key={item.value}
              disabled={fieldType === 'string' && item.value === 'number'}
            >
              {item.label}
            </Radio.Button>
          );
        })}
      </Radio.Group>

      <DndProvider backend={HTML5Backend}>
        {customRanges.map((customItem: CustomItems, index: number) => {
          const min = index === 0 ? dataset.min : customRanges[index - 1].value[1];
          const max = dataset.max;
          return (
            <CustomItem
              customType={customType}
              index={index}
              id={customItem?.id ?? ''}
              key={`drag_card${index}`}
              color={customItem.color}
              value={customItem.value}
              selectedOption={selectedOption}
              selectOptions={dataset.list}
              min={min}
              max={max}
              onChangeSort={onChangeSort}
              onDelete={() => deletePaletteRangeItem(customItem?.id ?? '')}
              onChange={(value: CustomItemValueType, color: string) =>
                onChangePaletteRangeItem(customItem?.id ?? '', value, color)
              }
            />
          );
        })}
      </DndProvider>

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>

      <div className={`${prefixCls}__btn`}>
        <span onClick={onCancel}>取消</span>
        <span onClick={onSubmit}>确定</span>
      </div>
    </div>,
  );
};

export default CustomContent;

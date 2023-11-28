import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import RangeItem from './RangeItem';
import useStyle from './style';

export type CustomRangeProps = {
  ranges: string[];
  onChange: (value: string[]) => void;
  onCancel: () => void;
  className?: string;
};

type RangeItemType = {
  id: string;
  value: string;
};

const CustomRange = (props: CustomRangeProps) => {
  const { ranges: defaultRanges, onChange, onCancel, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [ranges, setRanges] = useState<RangeItemType[]>([]);

  useEffect(() => {
    if (defaultRanges.length) {
      const list = defaultRanges.map((item) => {
        return {
          id: uniqueId(),
          value: item,
        };
      });
      setRanges(list);
    }
  }, [defaultRanges]);

  const addPaletteRangeItem = () => {
    const addItem: RangeItemType = { id: uniqueId(), value: ranges[ranges.length - 1].value };
    const list: RangeItemType[] = [...ranges, addItem];
    setRanges(list);
  };

  const deletePaletteRangeItem = (id: string) => {
    setRanges((pre) => pre.filter((item) => item.id !== id));
  };

  const onChangePaletteRangeItem = (color: RangeItemType) => {
    const list = ranges.map((item) => {
      if (item.id === color.id) {
        return color;
      }
      return item;
    });
    setRanges(list);
  };

  const onChangeSort = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = ranges.slice();
    const temp = data[Number(dragIndex)];
    data[Number(dragIndex)] = data[Number(hoverIndex)];
    data[Number(hoverIndex)] = temp;
    setRanges(data);
  };

  const onSubmit = () => {
    const list = ranges.map((item) => item.value);
    onChange(list);
    onCancel();
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      <div className={`${prefixCls}__selection-item`}>
        {ranges.map((color) => (
          <span
            key={color.id}
            className={`${prefixCls}__selection-item-color`}
            style={{
              backgroundColor: color.value,
              height: '10px',
              width: `${100 / ranges.length}%`,
            }}
          />
        ))}
      </div>

      <div className={`${prefixCls}__custon-item`}>
        <DndProvider backend={HTML5Backend}>
          {ranges.map((rangeItem: RangeItemType, index: string | number) => (
            <RangeItem
              onChangeSort={onChangeSort}
              index={index}
              id={rangeItem.id}
              key={`drag_card${index}`}
              color={rangeItem.value}
              onDelete={() => deletePaletteRangeItem(rangeItem.id)}
              onChange={(color: string) => onChangePaletteRangeItem({ id: rangeItem.id, value: color })}
            />
          ))}
        </DndProvider>
      </div>

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

export default CustomRange;

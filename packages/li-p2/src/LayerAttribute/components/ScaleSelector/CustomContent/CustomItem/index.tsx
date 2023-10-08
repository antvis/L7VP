import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React, { useMemo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { CustomItemValueType, CustomType } from '../../type';
import Item from './Item';
import useStyle from './style';

type RangeItemProps = {
  customType: CustomType;
  index: number;
  position: string | null;
  selectedOption: (string | number)[];
  selectOptions: { label: string; value: string; count: number }[];
  min?: number;
  max?: number;
  id: string;
  color: string;
  value: CustomItemValueType;
  onDelete: () => void;
  onChange: (value: CustomItemValueType, color: string) => void;
  onChangeSort: (dragIndex: string | number, hoverIndex: string | number) => void;
};

const RangeItem = ({
  customType,
  index,
  position,
  selectedOption,
  selectOptions,
  id,
  color: defaultColor,
  value: defaultValue,
  min = 0,
  max = 100,
  onDelete,
  onChange,
  onChangeSort,
}: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const ref = useRef<HTMLDivElement>(null);

  const options = useMemo(() => {
    if (!selectedOption.length && !defaultValue.length) {
      return selectOptions;
    }

    const selected = selectedOption.filter((item) => !defaultValue.includes(item));
    return selectOptions.filter((item) => !selected.includes(item.value));
  }, [selectedOption, selectOptions, defaultValue]);

  const [, drop] = useDrop({
    accept: 'DragDropBox',
    hover: (item: Record<string | number, string | number>) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return; // 如果回到自己的坑，那就什么都不做
      onChangeSort(dragIndex, hoverIndex); // 调用传入的方法完成交换
      item.index = hoverIndex; // 将当前当前移动到Box的index赋值给当前拖动的box，不然会出现两个盒子疯狂抖动！
    },
  });

  const [, drag] = useDrag({
    type: 'DragDropBox',
    item: { id, index },
    isDragging: (monitor) => {
      return index === monitor.getItem().index;
    },
  });

  const colorChange = (color: Color) => {
    onChange?.(defaultValue, color.toHexString());
  };

  const onValueChange = (_value: (string | number)[]) => {
    onChange?.(_value, defaultColor);
  };

  drag(drop(ref));

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)} ref={ref}>
      <div className={`${prefixCls}__drag-icon`}>
        <HolderOutlined />
      </div>

      <div className={`${prefixCls}__infor`}>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ColorPicker value={defaultColor ? defaultColor : '#5B8FF9'} onChange={colorChange}>
            <div className={`${prefixCls}__infor__color`} style={{ background: defaultColor }} />
          </ColorPicker>
        </div>

        <Item
          customType={customType}
          value={defaultValue}
          options={options}
          onChange={(e) => onValueChange(e)}
          min={min}
          max={max}
          position={position}
        />

        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>,
  );
};

export default RangeItem;

import { DeleteOutlined, HolderOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker, Input } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import useStyle from './style';

type RangeItemProps = {
  index: string | number;
  id: string;
  color: string;
  onDelete: () => void;
  onChange: (color: string) => void;
  onChangeSort: (dragIndex: string | number, hoverIndex: string | number) => void;
};

const Preset_Colors = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
  '#A9ABB1',
];

const RangeItem = ({ index, id, color: defaultValue, onDelete, onChange, onChangeSort }: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range__range-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const ref = useRef(null);

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
    onChange?.(color.toHexString());
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)} ref={drag(drop(ref))}>
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
          <ColorPicker
            value={defaultValue ? defaultValue : Preset_Colors[0]}
            onChange={colorChange}
            presets={[{ label: '推荐', colors: Preset_Colors }]}
          >
            <div className={`${prefixCls}__infor__color`} style={{ background: defaultValue }} />
          </ColorPicker>
        </div>

        <div className={`${prefixCls}__infor__input`}>
          <Input bordered={false} value={defaultValue} size="small" onChange={(e) => onChange(e.target.value)} />
        </div>
        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>,
  );
};

export default RangeItem;

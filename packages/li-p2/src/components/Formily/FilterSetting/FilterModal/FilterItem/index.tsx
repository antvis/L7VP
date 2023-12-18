import { DeleteOutlined, EditOutlined, HolderOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Tooltip } from 'antd';
import { FilterSettingItem } from '../../type';
import useStyle from './style';
import EditName from './EditName';

type FilterItemProps = {
  index: string | number;
  id: string;
  field: string;
  /**
   * 选择发生改变时
   */
  onChange: (title: string) => void;
  onDelete: () => void;
  onClickItem: () => void;
  onChangeSort: (dragIndex: string | number, hoverIndex: string | number) => void;
};

const FilterItem = ({ index, id, field, onChange, onDelete, onClickItem, onChangeSort }: FilterItemProps) => {
  const prefixCls = usePrefixCls('formily-filter-setting-filter-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const ref = useRef<HTMLDivElement>(null);
  const [isEditName, setIsEditName] = useState(false);

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

  const onChangeName = (title: string) => {
    onChange(title);
    setIsEditName(false);
  };

  drag(drop(ref));

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)} ref={ref}>
      <div className={`${prefixCls}__drag-icon`}>
        <HolderOutlined />
      </div>
      <div className={`${prefixCls}__infor`}>
        <div className={`${prefixCls}__infor__field`} onClick={onClickItem}>
          <EditName name={field} onChange={onChangeName} onCancel={() => setIsEditName(false)} isEdit={isEditName} />
        </div>

        <Tooltip title="点击修改名称">
          <div className={`${prefixCls}__infor__delete-icon`} onClick={() => setIsEditName(true)}>
            <EditOutlined />
          </div>
        </Tooltip>
        <Tooltip title="点击删除">
          <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
            <DeleteOutlined />
          </div>
        </Tooltip>
      </div>
    </div>,
  );
};

export default FilterItem;

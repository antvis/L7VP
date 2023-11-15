import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Modal } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { FilterNodeItem, OptionType } from '../type';
import EditContent from './EditContent';
import EditItem from './EditItem';
import useStyle from './style';

export interface EditModalProps {
  /**
   * 是否打开
   */
  open?: boolean;
  value: FilterNodeItem[];
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * 取消
   */
  onCancel: () => void;
  /**
   * 选择发生改变时
   */
  onChange?: (value: any) => void;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-edit-modal');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { open = false, value = [], options = [], onCancel, onChange } = props;
  const [edits, setEdits] = useState<FilterNodeItem[]>(value);
  const [selectedFilter, setSelectedFilter] = useState<FilterNodeItem>(value[0]);

  const deletePaletteRangeItem = (id: string) => {
    setEdits((pre) => pre.filter((item) => item.id !== id));
  };

  const onChangePaletteRangeItem = (color: any) => {
    const list = edits.map((item) => {
      if (item.id === color.id) {
        return color;
      }
      return item;
    });
    setEdits(list);
  };

  const onChangeSort = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = edits.slice();
    const temp = data[Number(dragIndex)];
    data[Number(dragIndex)] = data[Number(hoverIndex)];
    data[Number(hoverIndex)] = temp;
    setEdits(data);
  };

  const handleOk = (val: any) => {
    console.log(val);
    // onChange(val)
  };

  const onEditChange = (val: any) => {
    console.log(val);
  };

  return wrapSSR(
    <Modal
      title="筛选器设置"
      cancelText="取消"
      okText="确定"
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <div className={cls(`${prefixCls}__content`, hashId)}>
        <div className={cls(`${prefixCls}__content__left`, hashId)}>
          <div className={cls(`${prefixCls}__content__left__add-filter`, hashId)}>
            <div>筛选和参数项</div>
            <div>
              <PlusOutlined />
            </div>
          </div>
          <div>
            <DndProvider backend={HTML5Backend}>
              {edits.map((item: FilterNodeItem, index: string | number) => (
                <div
                  onClick={() => {
                    setSelectedFilter(item);
                  }}
                  className={cls(
                    {
                      [`${prefixCls}__content__left-selected`]: selectedFilter?.id === item.id,
                    },
                    hashId,
                  )}
                >
                  <EditItem
                    index={index}
                    id={item.id}
                    field={item.field}
                    key={`filter_drag_card${index}`}
                    onChangeSort={onChangeSort}
                    onDelete={() => deletePaletteRangeItem(item.id)}
                    onChange={(field: string) => onChangePaletteRangeItem({ id: item.id, field })}
                  />
                </div>
              ))}
            </DndProvider>
          </div>
        </div>
        <div className={cls(`${prefixCls}__content__right`, hashId)}>
          <div className={cls(`${prefixCls}__content__left__add-filter`, hashId)}>
            <div>筛选配置</div>
          </div>
          <EditContent value={selectedFilter} onChange={onEditChange} options={options} />
        </div>
      </div>
    </Modal>,
  );
};

export default EditModal;

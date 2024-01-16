import classNames from 'classnames';
import React, { useCallback } from 'react';
import type { DropResult } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { usePrefixCls } from '../../../../hooks';
import useStyle from './style';

interface DragListProps<P extends Record<string, any>> {
  itemStyle?: React.CSSProperties | ((dataset: P) => React.CSSProperties);
  itemClassName?: string | ((item: P) => string);
  dragIcon?: JSX.Element;
  items: P[];
  onItemClick?: (item: P) => void;
  onDrag: (newItems: P[]) => void;
  children: (item: P, icon: JSX.Element) => JSX.Element;
  keyField?: string;
}

function DragList<P extends Record<string, any>>({ children, itemStyle, items, onDrag, dragIcon }: DragListProps<P>) {
  const prefixCls = usePrefixCls('drag-list');
  const styles = useStyle();
  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (result.destination) {
        const newItems = [...items];
        const sourceIndex = result.source.index;
        const targetIndex = result.destination.index;
        const [item] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, item);
        onDrag(newItems);
      }
    },
    [items, onDrag],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="dropable" direction="vertical">
        {(provided) => (
          <div className={prefixCls} ref={provided.innerRef} {...provided.droppableProps}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(itemProvided, itemSnapshot) => {
                  return (
                    <div
                      {...itemProvided.draggableProps}
                      ref={itemProvided.innerRef}
                      className={classNames(`${prefixCls}__item`, styles.dragItem, {
                        [`${prefixCls}__item`]: itemSnapshot.isDragging,
                        [styles.dragItem]: itemSnapshot.isDragging,
                      })}
                      style={{
                        ...(itemStyle instanceof Function ? itemStyle(item) : itemStyle),
                        ...(itemProvided.draggableProps.style ?? {}),
                      }}
                      key={item.id}
                    >
                      {children(
                        item,
                        <i
                          data-comp="drag-item-icon"
                          className={classNames(`${prefixCls}__item-icon`, styles.itemIcon)}
                          {...itemProvided.dragHandleProps}
                        >
                          {dragIcon}
                        </i>,
                      )}
                    </div>
                  );
                }}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragList;

import Icon, { CheckOutlined, GroupOutlined } from '@ant-design/icons';
import type { ImplementWidget } from '@antv/li-sdk';
import { Card, Empty, Tooltip } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '../../../hooks';
import { WidgetTypeMap } from '../../../constants';
import useStyle from './style';

type WidgetListProps = {
  className?: string;
  widgets: ImplementWidget[];
  onChange: (value: string[]) => void;
};

const WidgetList: React.FC<WidgetListProps> = (props) => {
  const { widgets, onChange } = props || {};
  const prefixCls = usePrefixCls('add-widgets-panel');
  const styles = useStyle();
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  const handleClickItem = (item: ImplementWidget) => {
    const findIndex = selectedItem.findIndex((items) => items === item.metadata.name);
    if (findIndex === -1) {
      if (item.metadata.type === WidgetTypeMap.Layout) {
        setSelectedItem([item.metadata.name]);
      } else {
        setSelectedItem((pre) => pre.concat(item.metadata.name));
      }
    } else {
      const nweSelectItem = selectedItem.filter((key) => key !== item.metadata.name);
      setSelectedItem(nweSelectItem);
    }
  };

  useEffect(() => {
    onChange(selectedItem);
  }, [selectedItem]);

  if (isEmpty(widgets)) {
    return <Empty description="暂无可选组件" className={classNames(`${prefixCls}__impty`, styles.panelImpty)} />;
  }

  return (
    <div className={classNames(`${prefixCls}__content`, styles.panelContent)}>
      {widgets.map((item) => {
        const Description = isEmpty(item.metadata.description) ? (
          '暂无描述'
        ) : item.metadata.description && item.metadata.description?.length > 20 ? (
          <Tooltip title={item.metadata.description}>{item.metadata.description}</Tooltip>
        ) : (
          item.metadata.description
        );

        const Image = item.metadata.icon ? <Icon component={item.metadata.icon} /> : <GroupOutlined />;

        return (
          <Card
            bodyStyle={{ overflow: 'hidden', padding: 0 }}
            key={item.metadata.name}
            className={classNames(`${prefixCls}__content-item`, styles.contentItem, {
              [styles.contentItemSelected]: selectedItem.includes(item.metadata.name),
              [`${prefixCls}__content-item_selected`]: selectedItem.includes(item.metadata.name),
            })}
          >
            <div
              onClick={() => handleClickItem(item)}
              className={classNames(`${prefixCls}__content-item-content`, styles.itemContent)}
            >
              <div className={classNames(`${prefixCls}__content-item-content__img`, styles.itemContentImg)}>
                {Image}
              </div>

              <div className={classNames(`${prefixCls}__content-item-content__info`, styles.itemContentInfo)}>
                <div
                  className={classNames(`${prefixCls}__content-item-content__info-title`, styles.itemContentInfoTitle)}
                >
                  {item.metadata.displayName}
                </div>

                <div
                  className={classNames(
                    `${prefixCls}__content-item-content__info-description`,
                    styles.itemContentInfoDescription,
                  )}
                >
                  {Description}
                </div>
              </div>

              {selectedItem.includes(item.metadata.name) && (
                <div className={classNames(`${prefixCls}__content-item-selected`, styles.itemContentSelected)}>
                  <CheckOutlined />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WidgetList;

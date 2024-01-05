import Icon, { CheckOutlined, GroupOutlined } from '@ant-design/icons';
import type { ImplementWidget } from '@antv/li-sdk';
import { Card, Empty, Tooltip } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { WidgetTypeMap } from '../../../constants';
import './index.less';

type WidgetListProps = {
  className?: string;
  widgets: ImplementWidget[];
  onChange: (value: string[]) => void;
};

const WidgetList: React.FC<WidgetListProps> = (props) => {
  const { widgets, onChange } = props || {};
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
    return <Empty description="暂无可选组件" className="li-add-widgets-panel__impty" />;
  }

  return (
    <div className="li-add-widgets-panel__content">
      {widgets.map((item) => {
        const Description = isEmpty(item.metadata.description) ? (
          '暂无描述'
        ) : item.metadata.description && item.metadata.description?.length > 20 ? (
          <Tooltip title={item.metadata.description}>{item.metadata.description}</Tooltip>
        ) : (
          item.metadata.description
        );

        const Image = item.metadata?.icon ? <Icon component={item.metadata?.icon} /> : <GroupOutlined />;

        return (
          <Card
            bodyStyle={{ overflow: 'hidden', padding: 0 }}
            key={item.metadata.name}
            className={classNames('li-add-widgets-panel__content-item', {
              ['li-add-widgets-panel__content-item_selected']: selectedItem.includes(item.metadata.name),
            })}
          >
            <div onClick={() => handleClickItem(item)} className="li-add-widgets-panel__content-item-content">
              <div className="li-add-widgets-panel__content-item-content__img">{Image}</div>

              <div className="li-add-widgets-panel__content-item-content__info">
                <div className="li-add-widgets-panel__content-item-content__info-title">
                  {item.metadata.displayName}
                </div>

                <div className="li-add-widgets-panel__content-item-content__info-description">{Description}</div>
              </div>

              {selectedItem.includes(item.metadata.name) && (
                <div className="li-add-widgets-panel__content-item-selected">
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

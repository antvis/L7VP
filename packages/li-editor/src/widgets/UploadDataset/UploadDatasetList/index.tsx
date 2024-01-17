import { CheckOutlined } from '@ant-design/icons';
import type { DatasetSchema } from '@antv/li-sdk';
import { theme } from 'antd';
import Tooltip from 'antd/es/tooltip';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '../../../hooks';
import useStyle from './style';

const { useToken } = theme;
type DatasetListProps = {
  className?: string;
  dataset: DatasetSchema[];
  onChange: (value: string[]) => void;
};

const DatasetList: React.FC<DatasetListProps> = (props) => {
  const { dataset, onChange } = props || {};
  const prefixCls = usePrefixCls('upload-list');
  const styles = useStyle();
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const { token } = useToken();

  const handleClickItem = (item: string) => {
    const findIndex = selectedItem.findIndex((items) => items === item);
    if (findIndex === -1) {
      setSelectedItem([...selectedItem, item]);
    } else {
      const nweSelectItem = selectedItem.filter((key) => key !== item);
      setSelectedItem(nweSelectItem);
    }
  };

  useEffect(() => {
    if (onChange) {
      onChange(selectedItem);
    }
  }, [selectedItem, onChange]);

  useEffect(() => {
    setSelectedItem(dataset.map((item) => item.id));
  }, [dataset]);

  return (
    <div className={classNames(`${prefixCls}__content`, styles.uploadListContent)}>
      {dataset.map((item) => {
        const fileNames = item.metadata.name;
        return (
          <div
            key={item.id}
            className={classNames(`${prefixCls}__content-item`, styles.uploadListContentItem, {
              [styles.contentItemSelecteds]: selectedItem.includes(item.id),
              [`${prefixCls}__content-item_selected`]: selectedItem.includes(item.id),
            })}
            onClick={() => handleClickItem(item.id)}
          >
            {selectedItem.includes(item.id) && (
              <div className={classNames(`${prefixCls}__content-item-selected`, styles.uploadListContentItemSelected)}>
                <CheckOutlined />
              </div>
            )}
            <div className={classNames(`${prefixCls}__content-item__title`, styles.uploadListContentItemTitle)}>
              <Tooltip title={fileNames} zIndex={token.zIndexPopupBase + 70}>
                {fileNames}
              </Tooltip>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DatasetList;

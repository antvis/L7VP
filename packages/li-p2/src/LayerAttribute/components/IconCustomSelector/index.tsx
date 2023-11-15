import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { getLayerByIconSelectorData } from './helper';
import useStyle from './style';
import type { IconListItem } from './type';

type IconSelector = {
  // options
  options: string[];
  // value
  value: Record<string, string>;
  onChange: (val: Record<string, string>) => void;
};

const Internal = (props: IconSelector) => {
  const prefixCls = usePrefixCls('formily-icon-custom-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value, onChange } = props;
  const [open, setOpen] = useState(true);
  const [iconList, setIconList] = useState<IconListItem[]>();

  useEffect(() => {
    if (value) {
      const _iconList = getLayerByIconSelectorData(value);
      setIconList(_iconList);
    }
  }, [value]);

  return wrapSSR(
    <Select
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            <div className={cls(`${prefixCls}-icon-item`, hashId)}>
              <div className={cls(`${prefixCls}-icon-item-icon`, hashId)}>
                <Select size="small" options={[{ value: 'lucy', label: 'Lucy' }]} />
              </div>
              <div className={cls(`${prefixCls}-icon-item-value`, hashId)}>
                <img />
              </div>
              <div className={cls(`${prefixCls}-icon-item-delete`, hashId)}>
                <DeleteOutlined />
              </div>
            </div>
          </div>
        );
      }}
    />,
  );
};

const IconCustomSelector = connect(Internal);

export default IconCustomSelector;

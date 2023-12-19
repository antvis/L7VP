import { EnterOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import useStyle from './style';

type EditNameProps = {
  name: string;
  isEdit?: boolean;
  onChange: (newName: string) => void;
  onCancel: () => void;
};

export default ({ name, isEdit, onCancel, onChange }: EditNameProps) => {
  const [cacheName, setCacheName] = useState('');
  const prefixCls = usePrefixCls('formily-filter-setting-filter-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const onSubmit = useCallback(() => {
    if (!cacheName) {
      return;
    }
    if (cacheName === name) {
      onCancel();
    } else {
      onChange(cacheName);
    }
  }, [cacheName, name, onChange]);

  useEffect(() => {
    if (isEdit) {
      setCacheName(name);
    }
  }, [isEdit, name]);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {isEdit ? (
        <Input
          autoFocus
          allowClear
          value={cacheName}
          size="small"
          placeholder="请输入名称"
          suffix={<EnterOutlined />}
          onPressEnter={onSubmit}
          onChange={(e) => setCacheName(e.target.value)}
          onBlur={onCancel}
        />
      ) : (
        <Tooltip title={name}>{name}</Tooltip>
      )}
    </div>,
  );
};

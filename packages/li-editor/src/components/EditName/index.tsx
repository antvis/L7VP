import { EnterOutlined } from '@ant-design/icons';
import { Input, message, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import './index.less';

type EditNameProps = {
  className?: string;
  name: string;
  isEdit?: boolean;
  onChange: (newName: string) => void;
  onCancel: () => void;
  onClick?: () => void;
};

export default ({ className, name, isEdit, onClick, onCancel, onChange }: EditNameProps) => {
  const [cacheName, setCacheName] = useState('');
  const [messageApi, messageContextHolder] = message.useMessage();

  const onSubmit = useCallback(() => {
    if (!cacheName) {
      messageApi.warning('请输入名称');
      return;
    }
    if (cacheName === name) {
      onCancel();
    } else {
      onChange(cacheName);
      messageApi.success('名称修改成功');
    }
  }, [cacheName, name, onChange]);

  useEffect(() => {
    if (isEdit) {
      setCacheName(name);
    }
  }, [isEdit, name]);

  return (
    <div className={classnames('li-title-name', className)}>
      {messageContextHolder}
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
        <span className="li-title-name__text">
          <span className="li-title-name__title" onClick={onClick}>
            <Tooltip title={name}>{name}</Tooltip>
          </span>
        </span>
      )}
    </div>
  );
};

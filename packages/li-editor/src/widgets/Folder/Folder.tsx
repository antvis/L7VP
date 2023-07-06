import { LeftOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useEditorState } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';

type FolderProps = ImplementEditorWidgetProps;

const Folder: React.FC<FolderProps> = (props) => {
  const { state, updateState } = useEditorState();
  const { collapsed } = state;

  const onCollapsed = () => {
    updateState((draft) => {
      draft.collapsed = !draft.collapsed;
    });
  };

  return (
    <Tooltip placement="right" title={collapsed ? '展开' : '折叠'}>
      <Button
        block
        type="text"
        size="middle"
        shape="circle"
        icon={<LeftOutlined size={18} rotate={collapsed ? 180 : 0} />}
        onClick={onCollapsed}
      />
    </Tooltip>
  );
};

export default Folder;

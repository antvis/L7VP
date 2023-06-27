import { ShareAltOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import { Button, Tooltip } from 'antd';
import React from 'react';

type ShareProps = ImplementEditorWidgetProps;

const Share: React.FC<ShareProps> = (props) => {
  return (
    <Tooltip placement="right" title="分享">
      <Button
        disabled
        type="text"
        size="middle"
        shape="circle"
        icon={<ShareAltOutlined size={18} />}
      />
    </Tooltip>
  );
};

export default Share;

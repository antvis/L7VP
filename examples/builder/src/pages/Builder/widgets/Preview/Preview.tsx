import { EyeOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link, useParams } from 'umi';

type PreviewProps = ImplementEditorWidgetProps;

const Preview: React.FC<PreviewProps> = (props) => {
  const { id: projectId = '' } = useParams();
  return (
    <Tooltip placement="right" title="预览">
      <Link to={`/app/${projectId}`} target="_blank">
        <Button
          type="text"
          size="middle"
          shape="circle"
          icon={<EyeOutlined size={18} />}
        />
      </Link>
    </Tooltip>
  );
};

export default Preview;

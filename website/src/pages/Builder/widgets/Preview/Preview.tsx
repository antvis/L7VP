import { DesktopOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { Link, useParams } from 'umi';
import { logYuyanMonitor } from '@/utils';

type PreviewProps = ImplementEditorWidgetProps;

const Preview: React.FC<PreviewProps> = (props) => {
  const { id: projectId = '' } = useParams();
  return (
    <Tooltip placement="right" title="预览">
      <Link to={`/app/${projectId}?type=project`} target="_blank">
        <Button
          type="text"
          size="middle"
          shape="circle"
          id="LITourPreviewApp"
          icon={<DesktopOutlined size={18} />}
          onClick={() => {
            logYuyanMonitor(11);
          }}
        />
      </Link>
    </Tooltip>
  );
};

export default Preview;

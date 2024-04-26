import { ReadOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { history } from 'umi';

type DocsProps = ImplementEditorWidgetProps;

const Docs: React.FC<DocsProps> = (props) => {
  return (
    <Tooltip placement="right" title="文档">
      <Button
        id="LITourDocs"
        type="text"
        size="middle"
        shape="circle"
        icon={<ReadOutlined size={18} />}
        onClick={() => {
          window.open(history.createHref(`/docs`));
        }}
      />
    </Tooltip>
  );
};

export default Docs;

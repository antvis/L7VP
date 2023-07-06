import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import React from 'react';

type CustomPanelProps = ImplementEditorWidgetProps;

const CustomPanel: React.FC<CustomPanelProps> = (props) => {
  return <div>自定义内容</div>;
};

export default CustomPanel;

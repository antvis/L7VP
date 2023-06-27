import { CodeOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Popover, Tooltip } from 'antd';
import React, { useState } from 'react';
import type { ImplementEditorWidgetProps } from '../../types';
import './Export.less';
import ExportApp from './ExportApp';
import ExportData from './ExportData';

type ExportProps = ImplementEditorWidgetProps;

const Export: React.FC<ExportProps> = (props) => {
  const [exportDataVisible, setExportDataVisible] = useState(false);
  const [exportAppVisible, setExportAppVisible] = useState(false);
  const [toolTipOpen, setToolTipOpen] = useState(false);

  const onExportData = () => {
    setExportDataVisible(true);
  };

  const onExportApp = () => {
    setExportAppVisible(true);
  };

  const exportPopoverContent = (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Button type="text" size="middle" icon={<TableOutlined size={18} />} onClick={onExportData}>
        导出数据
      </Button>
      <Button type="text" size="middle" icon={<CodeOutlined size={18} />} onClick={onExportApp}>
        导出应用
      </Button>
    </div>
  );

  return (
    <>
      <Popover
        overlayClassName="li-export-popover"
        placement="rightBottom"
        trigger="click"
        content={exportPopoverContent}
        onOpenChange={(open) => {
          if (open) {
            setToolTipOpen(false);
          }
        }}
      >
        <Tooltip
          placement="right"
          title="导出"
          open={toolTipOpen}
          onOpenChange={(open) => {
            setToolTipOpen(open);
          }}
        >
          <Button type="text" size="middle" shape="circle" icon={<DownloadOutlined size={18} />} />
        </Tooltip>
      </Popover>

      {exportAppVisible && <ExportApp visible={exportAppVisible} onVisbleChange={setExportAppVisible} />}
      {exportDataVisible && <ExportData visible={exportDataVisible} onVisbleChange={setExportDataVisible} />}
    </>
  );
};

export default Export;

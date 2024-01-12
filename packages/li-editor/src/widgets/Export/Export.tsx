import { CodeOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import { Button, Popover, Tooltip } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames';
import type { ImplementEditorWidgetProps } from '../../types';
import { usePrefixCls } from '../../hooks';
import ExportApp from './ExportApp';
import ExportData from './ExportData';
import useStyle from './style';

type ExportProps = ImplementEditorWidgetProps;

const Export: React.FC<ExportProps> = () => {
  const prefixCls = usePrefixCls('export-popover');
  const styles = useStyle();
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
        导出配置
      </Button>
    </div>
  );

  return (
    <>
      <Popover
        overlayClassName={classNames(prefixCls, styles.exportPopover)}
        placement="rightBottom"
        trigger="click"
        arrow={false}
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

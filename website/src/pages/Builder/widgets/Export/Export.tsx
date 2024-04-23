import { CodeOutlined, DownloadOutlined, TableOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import ExportData from '@antv/li-editor/dist/esm/widgets/Export/ExportData';
import { Button, Popover, Tooltip } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '../../hooks';
import useStyle from './ExportStyle';
import ExportApp from './ExportApp';

type ExportProps = ImplementEditorWidgetProps;

const Export: React.FC<ExportProps> = (props) => {
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
        导出应用
      </Button>
    </div>
  );

  return (
    <>
      <Popover
        overlayClassName={classNames(prefixCls, styles.exportPopover)}
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
          <Button id="LITourExportApp" type="text" size="middle" shape="circle" icon={<DownloadOutlined size={18} />} />
        </Tooltip>
      </Popover>

      {exportAppVisible && <ExportApp visible={exportAppVisible} onVisbleChange={setExportAppVisible} />}
      {exportDataVisible && <ExportData visible={exportDataVisible} onVisbleChange={setExportDataVisible} />}
    </>
  );
};

export default Export;

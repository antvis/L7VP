import { Button, Modal } from 'antd';
import React from 'react';
import { useEditorService } from '../../../hooks';
import './index.less';

type ExportAppProps = {
  visible: boolean;
  onVisbleChange: (value: boolean) => void;
};

const ExportApp: React.FC<ExportAppProps> = (props) => {
  const { visible, onVisbleChange } = props;
  const { editorService } = useEditorService();
  const config = editorService.getApplicationConfig();

  const handleOk = () => {
    onVisbleChange(false);
  };

  const handleCancel = () => {
    onVisbleChange(false);
  };

  return (
    <Modal
      className="li-export-app"
      width={960}
      title="导出配置"
      open={visible}
      onCancel={handleCancel}
      destroyOnClose
      footer={
        <>
          <Button onClick={handleCancel}>返回</Button>
          <Button type="primary" onClick={handleOk}>
            <a
              download="li-app.json"
              href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(config, null, 2))}`}
              target="_blank"
              rel="noreferrer"
            >
              导出
            </a>
          </Button>
        </>
      }
    >
      <div className="li-export-app__content-item">
        <div className="li-export-app__title">
          <div>应用配置</div>
          <div className="li-export-app__subtitle">应用的配置文件，导出后可以通过项目方式再次导入。</div>
        </div>
        <pre className="li-export-app__code-pre">{JSON.stringify(config, null, '  ')}</pre>
      </div>
    </Modal>
  );
};

export default ExportApp;

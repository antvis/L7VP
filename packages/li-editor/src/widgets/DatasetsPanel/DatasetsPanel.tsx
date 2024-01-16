import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useEditorState, usePrefixCls } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';
import AddDataset from './AddDataset';
import DatasetList from './DatasetList';
import PreviewDataset from './PreviewDataset';
import ReplaceDataset from './ReplaceDataset';
import useStyle from './DatasetsPanelStyle';

interface DatasetsPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const DatasetsPanel: React.FC<DatasetsPanelProps> = (props: DatasetsPanelProps) => {
  const { className } = props;
  const prefixCls = usePrefixCls('datasets-panel');
  const styles = useStyle();
  const { state } = useEditorState();
  const [addDatasetVisible, setAddDatasetVisible] = useState(false);
  const [replaceDatasetId, setReplaceDatasetId] = useState<string>('');
  const [replaceDatasetVisible, setReplaceDatasetVisible] = useState(false);
  const [previewDatasetId, setPreviewDatasetId] = useState<string>('');
  const [previewDatasetVisible, setPreviewDatasetVisible] = useState(false);

  return (
    <div className={classNames(prefixCls, styles.datasetPanel, className)}>
      <div className={classNames(`${prefixCls}__header`, styles.panelHeader)}>数据</div>
      <div className={classNames(`${prefixCls}__add-dataset`, styles.addDataset)}>
        <span>数据集({state.datasets.length})</span>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setAddDatasetVisible(true);
          }}
          id="LITourAddDataset"
        >
          新增数据集
        </Button>
      </div>

      <DatasetList
        className={classNames(`${prefixCls}__dataset-list`, styles.datasetList)}
        onReplaceDataset={(datasetId) => {
          setReplaceDatasetId(datasetId);
          setReplaceDatasetVisible(true);
        }}
        onPreviewDataset={(datasetId) => {
          setPreviewDatasetId(datasetId);
          setPreviewDatasetVisible(true);
        }}
      />

      <AddDataset visible={addDatasetVisible} onClose={() => setAddDatasetVisible(false)} />
      <ReplaceDataset
        datasetId={replaceDatasetId}
        visible={replaceDatasetVisible}
        onClose={() => setReplaceDatasetVisible(false)}
      />
      {previewDatasetVisible && (
        <PreviewDataset
          datasetId={previewDatasetId}
          visible={previewDatasetVisible}
          onClose={() => setPreviewDatasetVisible(false)}
        />
      )}
    </div>
  );
};

export default DatasetsPanel;

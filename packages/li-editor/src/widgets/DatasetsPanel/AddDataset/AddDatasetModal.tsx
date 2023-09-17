import type { LayerSchema } from '@antv/li-sdk';
import { Modal, Segmented } from 'antd';
import React, { useState } from 'react';
import { useEditorContext } from '../../../hooks/internal';
import type { AddDataset as AddDatasetType } from '../../../types';

type AddDatasetModalProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onSubmit: (datasets: AddDatasetType[], layers?: LayerSchema[]) => void;
};

const AddDatasetModal = ({ title, visible, onClose, onSubmit }: AddDatasetModalProps) => {
  const { containerSlotMap } = useEditorContext();
  const addWidgets = containerSlotMap.Datasets?.addDataset || [];
  const defaultSegmentedValue = addWidgets[0].metadata.name;

  const [segmentedValue, setSegmentedValue] = useState(defaultSegmentedValue);

  const segmentedOptions = addWidgets.map((widget) => ({
    label: widget.metadata.displayName,
    value: widget.metadata.name,
  }));
  const AddWidget = addWidgets.find((widget) => widget.metadata.name === segmentedValue)!.component;

  return (
    <Modal
      title={title}
      width="min-content"
      style={{ minWidth: 1000 }}
      destroyOnClose
      open={visible}
      footer={null}
      bodyStyle={{ paddingBottom: 0 }}
      onCancel={onClose}
    >
      {segmentedOptions.length > 1 && (
        <Segmented
          options={segmentedOptions}
          onChange={(val) => {
            setSegmentedValue(val as string);
          }}
          defaultValue={segmentedValue}
          style={{ marginBottom: 20 }}
        />
      )}
      <AddWidget onCancel={onClose} onSubmit={onSubmit} />
    </Modal>
  );
};

export default AddDatasetModal;

import { validateDataset } from '@antv/li-editor';
import type { DatasetSchema, LayerSchema } from '@antv/li-sdk';
import { getDatasetColumns, getUniqueId } from '@antv/li-sdk';
import { Modal, Segmented } from 'antd';
import type { WritableDraft } from 'immer/dist/internal';
import React, { useState } from 'react';
import { useEditorService, useEditorState } from '../../../hooks';
import { useEditorContext } from '../../../hooks/internal';
import type { AddDataset as AddDatasetType } from '../../../types';

type AddDatasetProps = {
  visible: boolean;
  onClose: () => void;
};

const AddDataset = ({ visible, onClose }: AddDatasetProps) => {
  const { appService } = useEditorService();
  const { containerSlotMap } = useEditorContext();
  const addWidgets = containerSlotMap.Datasets?.addDataset || [];
  const defaultSegmentedValue = addWidgets[0].metadata.name;

  const [segmentedValue, setSegmentedValue] = useState(defaultSegmentedValue);
  const { updateState } = useEditorState();

  const segmentedOptions = addWidgets.map((widget) => ({
    label: widget.metadata.displayName,
    value: widget.metadata.name,
  }));
  const AddWidget = addWidgets.find((widget) => widget.metadata.name === segmentedValue)!.component;

  // 新增 datasets
  const onAddDatasets = (datasets: AddDatasetType[]) => {
    updateState((draft) => {
      datasets.forEach((dataSource) => {
        const id = dataSource.id ?? getUniqueId(dataSource.metadata.name);

        let newDataset: DatasetSchema = (() => {
          if (dataSource.type === 'remote' || dataSource.type === 'vector-tile' || dataSource.type === 'raster-tile') {
            return {
              ...dataSource,
              id,
            };
          } else {
            return {
              ...dataSource,
              id,
              columns: dataSource.data?.length ? getDatasetColumns(dataSource.data[0]) : [],
              type: 'local', // 兼容 type: 'json'
            };
          }
        })();

        newDataset = validateDataset(newDataset);
        if (!draft.datasets.find((item) => item.id === dataSource.id)) {
          draft.datasets.push(newDataset as WritableDraft<DatasetSchema>);
        }
      });
    });
  };

  // 新增 layers
  const onAddLayers = (layers: LayerSchema[]) => {
    layers.forEach((layer) => {
      updateState((draft) => {
        if (!draft.layers.find((item) => item.id === layer.id)) {
          const implementLayer = appService.getImplementLayer(layer.type);
          const visConfig = { ...implementLayer?.defaultVisConfig, ...layer.visConfig };
          draft.layers.push({ ...layer, visConfig });
        }
      });
    });
  };

  const onSubmit = (datasets: AddDatasetType[], layers?: LayerSchema[]) => {
    onAddDatasets(datasets);
    if (layers) {
      onAddLayers(layers);
    }
    onClose();
  };

  return (
    <Modal
      title="添加数据集"
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

export default AddDataset;

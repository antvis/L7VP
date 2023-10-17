import type { LayerSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import React from 'react';
import { useEditorService, useEditorState } from '../../../hooks';
import type { AddDataset as AddDatasetType } from '../../../types';
import AddDatasetModal from './AddDatasetModal';
import { getAddDatasetSchema } from './helper';

type AddDatasetProps = {
  visible: boolean;
  onClose: () => void;
};

const AddDataset = ({ visible, onClose }: AddDatasetProps) => {
  const { appService } = useEditorService();
  const { updateState } = useEditorState();

  // 新增 datasets
  const onAddDatasets = (datasets: AddDatasetType[]) => {
    updateState((draft) => {
      datasets.forEach((dataset) => {
        const id = dataset.id ?? getUniqueId();
        const newDataset = getAddDatasetSchema(dataset, id);
        if (!draft.datasets.find((item) => item.id === dataset.id)) {
          draft.datasets.push(newDataset);
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

  return <AddDatasetModal title="新增数据集" visible={visible} onSubmit={onSubmit} onClose={onClose} />;
};

export default AddDataset;

import type { DatasetSchema, LayerSchema } from '@antv/li-sdk';
import React from 'react';
import { useEditorService, useEditorState } from '../../../hooks';
import type { AddDataset as AddDatasetType } from '../../../types';
import AddDatasetModal from './AddDatasetModal';
import { getAddDatasetsSchema, getAddLayersSchema } from './helper';

type AddDatasetProps = {
  visible: boolean;
  onClose: () => void;
};

const AddDataset = ({ visible, onClose }: AddDatasetProps) => {
  const { appService } = useEditorService();
  const { updateState } = useEditorState();

  // 新增 datasets
  const onAddDatasets = (datasets: DatasetSchema[]) => {
    updateState((draft) => {
      datasets.forEach((dataset) => {
        if (!draft.datasets.find((item) => item.id === dataset.id)) {
          draft.datasets.push(dataset);
        }
      });
    });
  };

  // 新增 layers
  const onAddLayers = (layers: LayerSchema[]) => {
    updateState((draft) => {
      layers.forEach((layer) => {
        if (!draft.layers.find((item) => item.id === layer.id)) {
          // 新增图层放在最上面
          draft.layers.unshift(layer);
        }
      });
    });
  };

  const onSubmit = (datasets: AddDatasetType[], layers?: LayerSchema[]) => {
    if (layers) {
      const datasetsSchema = getAddDatasetsSchema(datasets);
      const layersSchema = getAddLayersSchema(layers, appService);
      onAddDatasets(datasetsSchema);
      onAddLayers(layersSchema);
      // 自动计算图层范围，并地图定位到数据范围
      // 方案一：新增数据上打标，标识数据加载完成后需要，需要查找图层，计算边界范围，getLayersBounds(layersSchema, datasets)
      // 方案二：图层上打标识，监听数据加载完成后，计算图层边界范围
    } else {
      // 开启自动生成可视化图层
      const datasetsSchema = getAddDatasetsSchema(datasets, true);
      onAddDatasets(datasetsSchema);
    }
    onClose();
  };

  return <AddDatasetModal title="新增数据集" visible={visible} onSubmit={onSubmit} onClose={onClose} />;
};

export default AddDataset;

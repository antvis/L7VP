import type { DatasetSchema, LayerSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import type AppService from '../../../services/app-service';
import type { AddDataset } from '../../../types';
import { isValidLayer, validateDataset } from '../../../utils';

export const getAddDatasetsSchema = (datasets: AddDataset[], autoCreateLayers?: boolean): DatasetSchema[] => {
  return datasets.map((dataset) => {
    let datasetSchema: DatasetSchema;
    const id = dataset.id ?? getUniqueId();
    const metadata = autoCreateLayers ? { ...dataset.metadata, _autoCreateLayers: autoCreateLayers } : dataset.metadata;

    if (dataset.type === 'local') {
      datasetSchema = {
        ...dataset,
        id,
        metadata,
        columns: [],
      };
    } else {
      datasetSchema = {
        ...dataset,
        id,
        metadata,
      };
    }

    return validateDataset(datasetSchema);
  });
};

export const getAddLayersSchema = (layers: LayerSchema[], appService: AppService): LayerSchema[] => {
  return layers.filter(isValidLayer).map((layer) => {
    const implementLayer = appService.getImplementLayer(layer.type);
    const visConfig = { ...implementLayer?.defaultVisConfig, ...layer.visConfig };
    return { ...layer, visConfig };
  });
};

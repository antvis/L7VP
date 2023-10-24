import type { DatasetSchema } from '@antv/li-sdk';
import { getDatasetColumns } from '@antv/li-sdk';
import type { AddDataset } from '../../../types';
import { validateDataset } from '../../../utils';

export const getAddDatasetSchema = (ddataset: AddDataset, id: string, autoCreateLayers?: boolean): DatasetSchema => {
  let datasetSchema: DatasetSchema;
  const metadata = autoCreateLayers ? { ...ddataset.metadata, _autoCreateLayers: autoCreateLayers } : ddataset.metadata;

  if (ddataset.type === 'local') {
    datasetSchema = {
      ...ddataset,
      id,
      metadata,
      columns: ddataset.data?.length ? getDatasetColumns(ddataset.data[0]) : [],
    };
  } else {
    datasetSchema = {
      ...ddataset,
      id,
      metadata,
    };
  }

  return validateDataset(datasetSchema);
};

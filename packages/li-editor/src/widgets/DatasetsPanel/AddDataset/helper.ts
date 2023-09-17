import type { DatasetSchema } from '@antv/li-sdk';
import { getDatasetColumns } from '@antv/li-sdk';
import type { AddDataset } from '../../../types';
import { validateDataset } from '../../../utils';

export const getAddDatasetSchema = (ddataset: AddDataset, id: string): DatasetSchema => {
  let datasetSchema: DatasetSchema;
  if (ddataset.type === 'local') {
    datasetSchema = {
      ...ddataset,
      id,
      columns: ddataset.data?.length ? getDatasetColumns(ddataset.data[0]) : [],
    };
  } else {
    datasetSchema = {
      ...ddataset,
      id,
    };
  }

  return validateDataset(datasetSchema);
};

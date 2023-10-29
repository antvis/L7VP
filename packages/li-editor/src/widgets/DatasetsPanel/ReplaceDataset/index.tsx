import type { DatasetSchema } from '@antv/li-sdk';
import React from 'react';
import { useEditorState } from '../../../hooks';
import type { AddDataset as AddDatasetType } from '../../../types';
import AddDatasetModal from '../AddDataset/AddDatasetModal';
import { getAddDatasetsSchema } from '../AddDataset/helper';

type ReplaceDatasetProps = {
  datasetId: string;
  visible: boolean;
  onClose: () => void;
};

const ReplaceDataset = ({ datasetId, visible, onClose }: ReplaceDatasetProps) => {
  const { updateState } = useEditorState();

  //  替换 dataset
  const onReplaceDataset = (dataset: DatasetSchema) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) {
        // 复写 filter 情况
        draft.datasets[index] = { ...draft.datasets[index], ...dataset };
      }
    });
  };

  const onSubmit = (datasets: AddDatasetType[]) => {
    const dataset = datasets[0];
    if (dataset) {
      const [replaceDataset] = getAddDatasetsSchema([dataset]);
      replaceDataset.id = datasetId;
      onReplaceDataset(replaceDataset);
    }
    onClose();
  };

  return <AddDatasetModal title="替换数据集" visible={visible} onSubmit={onSubmit} onClose={onClose} />;
};

export default ReplaceDataset;

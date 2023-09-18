import React from 'react';
import { useEditorState } from '../../../hooks';
import type { AddDataset as AddDatasetType } from '../../../types';
import AddDatasetModal from '../AddDataset/AddDatasetModal';
import { getAddDatasetSchema } from '../AddDataset/helper';

type ReplaceDatasetProps = {
  datasetId: string;
  visible: boolean;
  onClose: () => void;
};

const ReplaceDataset = ({ datasetId, visible, onClose }: ReplaceDatasetProps) => {
  const { updateState } = useEditorState();

  //  替换 dataset
  const onReplaceDataset = (dataset: AddDatasetType) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) {
        const replaceDataset = getAddDatasetSchema(dataset, datasetId);
        // 复写 filter 情况
        draft.datasets[index] = { ...draft.datasets[index], ...replaceDataset };
      }
    });
  };

  const onSubmit = (datasets: AddDatasetType[]) => {
    const dataset = datasets[0];
    if (dataset) {
      onReplaceDataset(dataset);
    }
    onClose();
  };

  return <AddDatasetModal title="替换数据集" visible={visible} onSubmit={onSubmit} onClose={onClose} />;
};

export default ReplaceDataset;

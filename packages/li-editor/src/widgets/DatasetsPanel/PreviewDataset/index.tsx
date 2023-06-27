import React from 'react';
import { useEditorContext } from '../../../hooks/internal';

type PreviewDatasetProps = {
  datasetId: string;
  visible: boolean;
  onClose: () => void;
};

const PreviewDataset: React.FC<PreviewDatasetProps> = (props) => {
  const { datasetId, visible, onClose: onCancel } = props;
  const { containerSlotMap } = useEditorContext();
  const DatasetPreview = containerSlotMap.Datasets?.preview[0].component;

  return <DatasetPreview visible={visible} onCancel={onCancel} datasetId={datasetId} />;
};

export default PreviewDataset;

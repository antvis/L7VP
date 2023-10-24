import { useSyncExternalStore } from 'react';
import { useEditorService } from './useEditor';

export const useEditorDataset = (datasetId: string) => {
  const { editorService } = useEditorService();
  const { editorDatasetManager } = editorService;

  const editorDatasets = useSyncExternalStore(
    (onStoreChange) => editorDatasetManager.subscribe(onStoreChange),
    () => editorDatasetManager.getSnapshot(),
  );

  const editorDataset = editorDatasets.find((item) => item.id === datasetId);

  return editorDataset;
};

export const useEditorDatasets = () => {
  const { editorService } = useEditorService();
  const { editorDatasetManager } = editorService;

  const editorDatasets = useSyncExternalStore(
    (onStoreChange) => editorDatasetManager.subscribe(onStoreChange),
    () => editorDatasetManager.getSnapshot(),
  );

  const isLoading = editorDatasetManager.isLoading;

  // useEffect(() => {
  //   console.log('editorDatasets: ', editorDatasets);
  // }, [editorDatasets]);

  return { editorDatasets, isLoading };
};

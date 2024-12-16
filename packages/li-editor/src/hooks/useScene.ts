import { useEditorContext } from './internal';

export const useScene = () => {
  const { appService, editorService } = useEditorContext();
  const sceneInstance = appService?.getSceneInstance();
  return [sceneInstance];
};

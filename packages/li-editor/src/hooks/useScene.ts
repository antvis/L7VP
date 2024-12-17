import { useEditorContext } from './internal';

export const useScene = () => {
  const { appService } = useEditorContext();
  const sceneInstance = appService?.getSceneInstance();
  return [sceneInstance];
};

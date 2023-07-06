import { useEditorContext } from './internal';

export const useEditorService = () => {
  const { appService, editorService } = useEditorContext();

  return { appService, editorService };
};

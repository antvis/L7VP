import { useMemo, useSyncExternalStore } from 'react';
import type { EditorContextState } from '../types';
import type { Updater } from './internal/use-immer';
import { useEditorService } from './useEditor';

export type EditorContextStateValue = {
  state: EditorContextState;
  updateState: Updater<EditorContextState>;
};

export const useEditorState = () => {
  const { editorService } = useEditorService();
  const { editorState } = editorService;

  const state = useSyncExternalStore(
    (onStoreChange) => editorState.subscribe(onStoreChange),
    () => editorState.getSnapshot(),
  );
  const updateState = useMemo(() => editorState.setState.bind(editorState), [editorState]);

  const context: EditorContextStateValue = {
    state,
    updateState,
  };

  return context;
};

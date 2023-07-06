import React from 'react';
import type { Updater } from 'use-immer';
import type { EditorContextState } from '../types';

export type EditorContextStateValue = {
  state: EditorContextState;
  updateState: Updater<EditorContextState>;
};

export const initialState: EditorContextState = {
  activeNavMenuKey: '',
  collapsed: false,
  //@ts-ignore
  metadata: null,
  //@ts-ignore
  map: null,
  datasets: [],
  layers: [],
  widgets: [],
};

const defaultValue: EditorContextStateValue = {
  state: initialState,
  updateState: () => {},
};

export const LIEditorStateContext = React.createContext<EditorContextStateValue>(defaultValue);

export const useEditorState = () => {
  const context = React.useContext(LIEditorStateContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useEditorState must be used within a LIEditorStateContext.Provider`);
  }

  return context;
};

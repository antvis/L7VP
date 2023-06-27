import React from 'react';
import type { EditorContextServices } from '../../types';

//@ts-ignore
const defaultValue: EditorContextServices = {};

export const LIEditorContext = React.createContext<EditorContextServices>(defaultValue);

export const useEditorContext = () => {
  const context = React.useContext(LIEditorContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useEditorContext must be used within a LIEditorContext.Provider`);
  }

  return context;
};

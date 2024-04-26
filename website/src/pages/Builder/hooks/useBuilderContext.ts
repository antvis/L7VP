import React from 'react';
import type { BuilderContextState } from '../types';

const defaultValue: BuilderContextState = {};

export const BuilderContext = React.createContext<BuilderContextState>(defaultValue);

export const useBuilderContext = () => {
  const context = React.useContext(BuilderContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useEditorContext must be used within a LIBuilderContext.Provider`);
  }

  return context;
};

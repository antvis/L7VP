import type EventEmitter from '@antv/event-emitter';
import React from 'react';
import type RegistryManager from '../../registry';
import type StateManager from '../../state';

export type LIContextValue = {
  stateManager: StateManager;
  registryManager: RegistryManager;
  eventBus: EventEmitter;
};

export const LIContext = React.createContext<LIContextValue>(null as any);

export const useLIContext = () => {
  const context = React.useContext(LIContext);
  if (context === undefined || Object.keys(context).length === 0) {
    throw new Error(`useLIContext must be used within a LIContext.Provider`);
  }

  return context;
};

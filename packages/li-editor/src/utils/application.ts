import type { Application } from '@antv/li-sdk';
import { parseVersion } from '@antv/li-sdk';
import { Empty_App_Schema } from '../constants';
import type { EditorContextState } from '../types';
import { validateDatasets, validateLayers, validateMap, validateMetadata, validWidgets } from './validator';

export const creatEmptyApplication = (applicationName: string) => {
  const config: Application = {
    ...Empty_App_Schema,
    metadata: {
      name: applicationName,
      description: 'li empty application',
    },
  };

  return config;
};

/**
 * 校验 Application Schema
 */
export const validateApplicationSchema = (appSchema: Application) => {
  const version = parseVersion(appSchema.version);
  if (version) {
  }

  const config: Application = {
    ...appSchema,
    metadata: appSchema.metadata,
    datasets: validateDatasets(appSchema.datasets),
    spec: {
      map: validateMap(appSchema.spec.map),
      layers: validateLayers(appSchema.spec.layers),
      widgets: validWidgets(appSchema.spec.widgets),
    },
  };

  return config;
};

/**
 * 通过上下文状态生成 Application Schema
 */
export const getApplicationSchema = (state: EditorContextState) => {
  const _metadata = validateMetadata(state.metadata);
  const _datasets = validateDatasets(state.datasets);
  const _layers = validateLayers(state.layers);
  const _widgets = validWidgets(state.widgets);

  const config: Application = {
    version: 'v0.1',
    metadata: _metadata,
    datasets: _datasets,
    spec: {
      map: state.map,
      layers: _layers,
      widgets: _widgets,
    },
  };

  return config;
};

import type { Application } from '@antv/li-sdk';
import { parseVersion } from '@antv/li-sdk';
import { APP_SCHEMA_VERSION, Empty_App_Schema } from '../constants';
import type { EditorContextState } from '../types';
import {
  validateDatasets,
  validateLayers,
  validateMap,
  validateMetadata,
  validateRuntimeDatasets,
  validRuntimeLayers,
  validRuntimeWidgets,
  validWidgets,
} from './validator';

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
 * 校验外部传进来的 Application Schema 格式
 */
export const validateApplicationSchema = (appSchema: Application) => {
  const version = parseVersion(appSchema.version);
  if (version) {
  }

  const config: Application = {
    ...appSchema,
    metadata: validateMetadata(appSchema.metadata),
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
 * 编辑态 runtime 环境的 Schema 转换为规范的 Application Schema
 */
export const getApplicationSchemaFromRuntime = (runtimeSchema: Application) => {
  const _metadata = runtimeSchema.metadata;
  const _datasets = validateRuntimeDatasets(runtimeSchema.datasets);
  const _layers = validRuntimeLayers(runtimeSchema.spec.layers);
  const _widgets = validRuntimeWidgets(runtimeSchema.spec.widgets);

  const config: Application = {
    version: APP_SCHEMA_VERSION,
    metadata: _metadata,
    datasets: _datasets,
    spec: {
      map: runtimeSchema.spec.map,
      layers: _layers,
      widgets: _widgets,
    },
  };

  return config;
};

/**
 * 通过上下文状态生成 Application Schema
 */
export const getApplicationSchemaFromEditorState = (state: EditorContextState) => {
  const config: Application = getApplicationSchemaFromRuntime({
    version: APP_SCHEMA_VERSION,
    metadata: state.metadata,
    datasets: state.datasets,
    spec: {
      map: state.map,
      layers: state.layers,
      widgets: state.widgets,
    },
  });

  return config;
};

import type { Application, DatasetSchema } from '@antv/li-sdk';
import { parseVersion } from '@antv/li-sdk';
import { omit } from 'lodash-es';
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

const getDatasetSchemaFromRuntime = (dataset: DatasetSchema) => {
  const _dataset: DatasetSchema = {
    ...dataset,
    // 删除临时存储元数据信息
    metadata: omit(dataset.metadata, ['_autoCreateLayers']) as DatasetSchema['metadata'],
  };

  return _dataset;
};

const getDatasetsSchemaFromRuntime = (datasets: DatasetSchema[]) => {
  const _datasets: DatasetSchema[] = datasets.map((dataset) => getDatasetSchemaFromRuntime(dataset));

  return _datasets;
};

/**
 * 通过编辑态的 Schema 生成规范的 Application Schema
 */
export const getApplicationSchemaFromRuntime = (runtimeSchema: Application) => {
  const _metadata = validateMetadata(runtimeSchema.metadata);
  const _datasets = getDatasetsSchemaFromRuntime(runtimeSchema.datasets);
  const _layers = validateLayers(runtimeSchema.spec.layers);
  const _widgets = validWidgets(runtimeSchema.spec.widgets);

  const config: Application = {
    version: 'v0.1',
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
export const getApplicationSchemaFromContext = (state: EditorContextState) => {
  const config: Application = getApplicationSchemaFromRuntime({
    version: 'x',
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

import type {
  Application,
  DatasetSchema,
  LayerSchema,
  LocalDatasetSchema,
  MapSchema,
  WidgetSchema,
} from '@antv/li-sdk';
import { getDatasetColumns, isLocalDatasetSchema } from '@antv/li-sdk';
import { isEmpty, isUndefined, omit } from 'lodash-es';
import { AMAP_KEY, AtomWidgetEmptyContainer, MAPBOX_TOKEN } from '../constants';

/**
 * 校验 metadata schema 格式
 */
export const validateMetadata = (metadata: Application['metadata']) => {
  if (!metadata.creatTime) {
    const _metadata = { ...metadata };
    const d = new Date(),
      creatTime =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    _metadata.creatTime = creatTime;

    return _metadata;
  }

  return metadata;
};

/**
 * 校验 map schema 格式
 */
export const validateMap = (mapSchema: MapSchema) => {
  if (mapSchema.basemap !== 'Map' && isEmpty(mapSchema.config.token)) {
    const _mapSchema: MapSchema = { ...mapSchema };
    if (mapSchema.basemap === 'Mapbox') {
      _mapSchema.config = { ..._mapSchema.config, token: MAPBOX_TOKEN };
    } else {
      _mapSchema.config = { ..._mapSchema.config, token: AMAP_KEY };
    }

    return _mapSchema;
  }

  return mapSchema;
};

/**
 * 校验 dataset schema 格式
 */
export const validateDataset = (dataset: DatasetSchema) => {
  // 校验是否有列元数据信息，没有则添加
  // defaultApplication 情况下 columns 可能为空数组
  if (isLocalDatasetSchema(dataset) && dataset.data.length && !dataset.columns.length) {
    const _dataset: LocalDatasetSchema = { ...dataset };
    _dataset.columns = getDatasetColumns(_dataset.data[0]);
    return _dataset;
  }

  return dataset;
};

/**
 * 校验 datasets schema 格式
 */
export const validateDatasets = (datasets: DatasetSchema[]) => {
  const _datasets: DatasetSchema[] = datasets.map((dataset) => validateDataset(dataset));

  return _datasets;
};

/**
 * 校验 layer schema 格式
 */
export const isValidLayer = (layer: LayerSchema) => {
  if (isUndefined(layer.type) || layer.type === '') {
    return false;
  }

  if (isUndefined(layer.sourceConfig) || isEmpty(layer.sourceConfig)) {
    return false;
  }

  const resetSourceConfig = omit(layer.sourceConfig, 'datasetId');
  if (isEmpty(resetSourceConfig)) {
    return false;
  }

  return true;
};

/**
 * 校验 layers schema 格式
 */
export const validateLayers = (layers: LayerSchema[]) => {
  const _layers = layers.filter((item) => isValidLayer(item));

  return _layers;
};

/**
 * 校验 widget schema 格式
 */
const validWidget = (widget: WidgetSchema) => {
  const isIllegalAtomWidget =
    widget.container &&
    widget.container.id === AtomWidgetEmptyContainer?.id &&
    widget.container.slot === AtomWidgetEmptyContainer.slot;
  if (isIllegalAtomWidget) {
    return false;
  }

  return true;
};

/**
 * 校验 widgets schema 格式
 */
export const validWidgets = (widgets: WidgetSchema[]) => {
  // TODO: 去除没有在资产中实现的组件
  const _widgets = widgets.filter((item) => validWidget(item));

  return _widgets;
};

/**
 * 校验 editor runtime 环境的 dataset
 */
const validateRuntimeDataset = (dataset: DatasetSchema) => {
  const _dataset: DatasetSchema = {
    ...dataset,
    // 删除临时存储元数据信息
    metadata: omit(dataset.metadata, ['_autoCreateLayers']) as DatasetSchema['metadata'],
  };

  return _dataset;
};

/**
 * 校验 editor runtime 环境的 datasets
 */
export const validateRuntimeDatasets = (datasets: DatasetSchema[]) => {
  const _datasets: DatasetSchema[] = datasets.map((dataset) => validateRuntimeDataset(dataset));

  return _datasets;
};

/**
 * 校验 editor runtime 环境的 layers
 */
export const validRuntimeLayers = (layers: LayerSchema[]) => validateLayers(layers);

/**
 * 校验 editor runtime 环境的 widgets
 */
export const validRuntimeWidgets = (widgets: WidgetSchema[]) => validWidgets(widgets);

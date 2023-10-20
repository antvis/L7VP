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

export const validateMetadata = (metadata: Application['metadata']) => {
  const _metadata = { ...metadata };
  if (!_metadata.creatTime) {
    const d = new Date(),
      creatTime =
        [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
        ' ' +
        [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    _metadata.creatTime = creatTime;
  }

  return _metadata;
};

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

export const validateDataset = (dataset: DatasetSchema) => {
  if (isLocalDatasetSchema(dataset) && dataset.data) {
    const _dataset: LocalDatasetSchema = { ...dataset, type: 'local' };
    // 校验是否有列元数据信息，没有则添加
    // defaultApplication 情况下 columns 可能为空数组
    if (_dataset.data.length && !_dataset.columns.length) {
      _dataset.columns = getDatasetColumns(_dataset.data[0]);
    }
    return _dataset;
  }

  return dataset;
};

export const validateDatasets = (datasets: DatasetSchema[]) => {
  const _datasets: DatasetSchema[] = datasets.map((dataset) => validateDataset(dataset));

  return _datasets;
};

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

export const validateLayers = (layers: LayerSchema[]) => {
  const _layers = layers.filter((item) => isValidLayer(item));

  return _layers;
};

export const validWidget = (widget: WidgetSchema) => {
  const isIllegalAtomWidget =
    widget.container &&
    widget.container.id === AtomWidgetEmptyContainer?.id &&
    widget.container.slot === AtomWidgetEmptyContainer.slot;
  if (isIllegalAtomWidget) {
    return false;
  }

  return true;
};

export const validWidgets = (widgets: WidgetSchema[]) => {
  // TODO: 去除没有在资产中实现的组件
  const _widgets = widgets.filter((item) => validWidget(item));

  return _widgets;
};

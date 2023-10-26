import type { DatasetField, DatasetSchema, DatasetServiceParams, RemoteDatasetSchema } from '@antv/li-sdk';
import {
  getDatasetColumns,
  isLocalDatasetSchema,
  isLocalOrRemoteDatasetSchema,
  isRemoteDatasetSchema,
  queryServiceClient,
  Subscribable,
} from '@antv/li-sdk';
import type { QueryObserverOptions, QueryObserverResult } from '@tanstack/query-core';
import { QueryObserver } from '@tanstack/query-core';
import type { AutoCreateSchema, FieldPair, GeoField } from '../types';
import { getGeoFields, getPointFieldPairs } from '../utils/dataset';
import { getAutoCreateLayersSchema, getAutoFindLayerPopup, getLayersBounds } from '../utils/spec';
import type AppService from './app-service';

/**
 * 单个数据集的数据状态
 */
export class EditorDataset {
  /** 数据集 Schema */
  public schema!: DatasetSchema;
  /** 数据 */
  public data: Record<string, any>[] = [];
  /** 列字段 */
  public columns: DatasetField[] = [];
  /** 经纬度成对列字段 */
  public fieldPairs: FieldPair[] = [];
  /** 地理数据字段 */
  public geoFields: GeoField[] = [];
  /** appService, 动态数据源类型情况 */
  private appService: AppService;
  /** queryObserver, 动态数据源类型情况 */
  private queryObserver?: QueryObserver;

  constructor(schema: DatasetSchema, appService: AppService) {
    this.appService = appService;
    this.setSchema(schema);
  }

  /** 数据集 ID */
  public get id() {
    return this.schema.id;
  }

  /** 数据集信息 */
  public get metadata() {
    return this.schema.metadata;
  }

  /** 数据集名称 */
  public get name() {
    return this.schema.metadata.name;
  }

  /** 数据集类型 */
  public get type() {
    return this.schema.type;
  }

  public get isLocalOrRemoteDataset() {
    return isLocalOrRemoteDatasetSchema(this.schema);
  }

  /** 筛选器 */
  public get filter() {
    if (isLocalOrRemoteDatasetSchema(this.schema)) {
      return this.schema.filter;
    }
    return undefined;
  }

  /** h3 数据字段 */
  public get h3Fields() {
    return this.columns.filter((item) => item.type === 'h3');
  }

  /** 数据集是否请求中，动态数据源类型情况 */
  public get isLoading() {
    // if (this.queryObserver) {
    //   console.log('getCurrentResult', this.queryObserver?.getCurrentResult());
    // }
    return this.queryObserver?.getCurrentResult().isLoading ?? false;
  }

  /** 数据集是否请求出错，动态数据源类型情况 */
  public get isLoadingError() {
    return this.queryObserver?.getCurrentResult().isLoadingError;
  }

  /** 数据集请求错误，动态数据源类型情况 */
  public get error() {
    return this.queryObserver?.getCurrentResult().error;
  }

  public setSchema(schema: DatasetSchema) {
    this.schema = this.savePropertiesFromSchema(schema);
    if (isLocalDatasetSchema(schema)) {
      this.data = schema.data;
      this.columns = schema.columns;
      this.fieldPairs = getPointFieldPairs(this.columns);
      this.geoFields = getGeoFields(this.columns, this.data);
    } else if (isRemoteDatasetSchema(schema)) {
      this.data = [];
      this.columns = [];
      this.fieldPairs = [];
      this.geoFields = [];

      if (this.queryObserver) {
        this.queryObserver.setOptions(this.getQueryOptions(schema), { listeners: false });
      } else {
        this.queryObserver = new QueryObserver(queryServiceClient, this.getQueryOptions(schema));
      }
    }

    return this;
  }

  public getColumnDomain(columnName: string) {
    const field = this.columns.find((c) => c.name === columnName);
    if (!this.data.length || !field) return [];

    switch (field.type) {
      case 'boolean':
        return [true, false];

      case 'date':
      case 'string':
        return [];

      case 'number':
        return [];

      default:
        return [];
    }
  }

  public getSampleData(sampleSize = 5000) {
    const numberOfRows = this.data.length;
    const sampleStep = Math.max(Math.floor(numberOfRows / sampleSize), 1);

    const output: Record<string, any>[] = [];
    for (let i = 0; i < numberOfRows; i += sampleStep) {
      output.push(this.data[i]);
    }

    return output;
  }

  public updateData(data: Record<string, any>[]) {
    this.data = data;
    this.columns = data.length ? getDatasetColumns(data) : [];
    this.fieldPairs = getPointFieldPairs(this.columns);
    this.geoFields = getGeoFields(this.columns, this.data);

    return this;
  }

  /**
   * 获取 QueryObserver 请求参数
   * 动态数据源类型，异步请求数据情况使用
   */
  private getQueryOptions(datasetSchema: RemoteDatasetSchema) {
    const { serviceType: serviceName, filter, properties } = datasetSchema;
    const datasetService = this.appService.getImplementDatasetService(serviceName);
    const service = datasetService.service;

    const options: QueryObserverOptions = {
      queryKey: [serviceName, filter, properties],
      queryFn: (context) => {
        const serviceParams: DatasetServiceParams = { filter, properties, signal: context.signal };
        return service(serviceParams);
      },
    };

    return options;
  }

  /**
   * 订阅 QueryObserver 状态
   * 动态数据源类型，异步请求数据情况使用
   */
  public subscribeQuery(listener: (result: QueryObserverResult) => void) {
    if (this.queryObserver) {
      return this.queryObserver.subscribe(listener);
    }
  }

  /**
   * 取消全部订阅 QueryObserver 状态
   * 动态数据源类型，异步请求数据情况使用
   */
  public unAllSubscribeQuery() {
    if (this.queryObserver) {
      return this.queryObserver.destroy();
    }
  }

  public savePropertiesFromSchema(datasetSchema: DatasetSchema) {
    return datasetSchema;
  }

  public loadSchemaFromPropertie(): DatasetSchema {
    if (isLocalDatasetSchema(this.schema)) {
      return { ...this.schema, data: this.data, columns: this.columns };
    }

    return this.schema;
  }
}

type EditorDatasetManagerListener = (data: EditorDataset[]) => void;

/**
 * 编辑器的数据集状态管理器
 */
class EditorDatasetManager extends Subscribable<EditorDatasetManagerListener> {
  private schemas: DatasetSchema[];
  private datasets: EditorDataset[];
  private appService: AppService;

  constructor(appService: AppService, datasets: DatasetSchema[] = []) {
    super();
    this.appService = appService;
    this.schemas = datasets;
    this.datasets = datasets.map((item) => new EditorDataset(item, this.appService));
  }

  /**
   * 数据集是否请求中，动态数据源类型情况
   */
  get isLoading() {
    return this.getDatasetList().some((item) => item.isLoading);
  }

  public getDatasetById(id: string) {
    return this.datasets.find((item) => item.id === id);
  }

  public getDatasetList() {
    return this.datasets;
  }

  private copyEditorDataset(editorDataset: EditorDataset): EditorDataset {
    return Object.assign(Object.create(Object.getPrototypeOf(editorDataset)), editorDataset);
  }

  private copyEditorDatasetAndUpdateSchema(original: EditorDataset, schema: DatasetSchema): EditorDataset {
    return this.copyEditorDataset(original).setSchema(schema);
  }

  /**
   * 当 schema 更新时，更新数据集的状态
   */
  public update(datasets: DatasetSchema[], autoCreateHandler?: (schema: AutoCreateSchema) => void) {
    const hasChange = this.schemas !== datasets;
    if (!hasChange) return;

    const prevDatasets = this.datasets;
    const prevDatasetsMap = new Map(prevDatasets.map((item) => [item.id, item]));
    const newDatasets = datasets.map((datasetSchema) => {
      const prevEditorDataset = prevDatasetsMap.get(datasetSchema.id);
      // 新增情况
      if (!prevEditorDataset) {
        return new EditorDataset(datasetSchema, this.appService);
      } else if (datasetSchema === prevEditorDataset.schema) {
        // 复用情况
        return prevEditorDataset;
      }
      // 更新情况，什么情况下 schema 会更新：
      // 1. 基本元数据信息发生变更；
      // 2. 属性发生变更(columns\properties)；
      // 3. 数据发生变更；
      // 4. 类型发生变更
      // 原则：只考虑会影响数据发生更新的情况；也就是替换数据集的情况
      return this.copyEditorDatasetAndUpdateSchema(prevEditorDataset, datasetSchema);
    });

    const hasIndexChange = newDatasets.some((dataset) => dataset !== prevDatasetsMap.get(dataset.id));

    if (prevDatasetsMap.size === newDatasets.length && !hasIndexChange) {
      return;
    }

    const newDatasetsMap = new Map(newDatasets.map((item) => [item.id, item]));

    this.datasets = newDatasets;

    const difference = (map1: Map<string, EditorDataset>, map2: Map<string, EditorDataset>) => {
      const array: EditorDataset[] = [];
      map1.forEach((value, key) => {
        if (!map2.has(key)) {
          array.push(value);
        }
      });
      return array;
    };

    const newAddDatasets: EditorDataset[] = difference(newDatasetsMap, prevDatasetsMap);

    if (this.hasListeners()) {
      newAddDatasets.forEach((editorDataset) => {
        editorDataset.subscribeQuery((result) => {
          this.onQueryStateChange(editorDataset.id, result);
        });
      });

      difference(prevDatasetsMap, newDatasetsMap).forEach((editorDataset) => {
        editorDataset.unAllSubscribeQuery();
      });

      this.notify();
    }

    // 从新增的数据集自动生成 schema
    if (newAddDatasets.length && autoCreateHandler) {
      autoCreateHandler(this.getAutoCreateSchema(newAddDatasets));
    }
  }

  /**
   * 从数据集生成 schema
   */
  private getAutoCreateSchema(datasets: EditorDataset[]) {
    const layers = getAutoCreateLayersSchema(datasets)
      // 过滤未实现的图层资产
      .filter((layer) => this.appService.getImplementLayer(layer.type) !== undefined)
      .map((layer) => ({
        ...layer,
        visConfig: { ...this.appService.getImplementLayerDefaultVis(layer.type), ...layer.visConfig },
      }));

    const layerPopup = getAutoFindLayerPopup(layers, datasets);
    const bounds = getLayersBounds(layers, datasets);

    const schema: AutoCreateSchema = {
      layers: layers,
      layerPopup,
      bounds,
    };

    return schema;
  }

  protected onSubscribe(): void {
    if (this.listeners.size === 1) {
      // 订阅时，才发起数据请求
      this.datasets.forEach((dataset) => {
        dataset.subscribeQuery((result) => {
          this.onQueryStateChange(dataset.id, result);
        });
      });
    }
  }

  protected onUnsubscribe(): void {
    if (!this.listeners.size) {
      this.listeners = new Set();
      this.datasets.forEach((dataset) => {
        dataset.unAllSubscribeQuery();
      });
    }
  }

  /**
   * 数据请求状态发生变更
   */
  private onQueryStateChange = (datasetId: string, result: QueryObserverResult) => {
    const index = this.datasets.findIndex((item) => item.id === datasetId);
    if (index !== -1) {
      const data = Array.isArray(result.data) ? result.data : [];
      const newDatasets = this.datasets.slice(0);
      newDatasets[index] = this.copyEditorDataset(newDatasets[index]).updateData(data);
      this.datasets = newDatasets;
      this.notify();
    }
  };

  private notify() {
    this.listeners.forEach((listener) => {
      listener(this.getDatasetList());
    });
  }

  public getSnapshot() {
    return this.datasets;
  }

  destroy() {
    this.listeners = new Set();
  }
}

export default EditorDatasetManager;

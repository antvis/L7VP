import type { DatasetField, DatasetSchema, DatasetServiceParams, RemoteDatasetSchema } from '@antv/li-sdk';
import {
  getDatasetColumns,
  isLocalDatasetSchema,
  isLocalOrRemoteDatasetSchema,
  isRemoteDatasetSchema,
} from '@antv/li-sdk';
import { queryServiceClient, Subscribable } from '@antv/li-sdk/dist/esm/utils';
import type { QueryObserverOptions } from '@tanstack/query-core';
import { QueriesObserver } from '@tanstack/query-core';
import type { FieldPair, GeoField } from '../types';
import { getGeoFields, getPointFieldPairs } from '../utils/dataset';
import type AppService from './app-service';

/**
 * 单个数据集的数据状态
 */
export class EditorDataset {
  /** 数据集 Schema */
  public schema: DatasetSchema;
  /** 数据 */
  public data: Record<string, any>[] = [];
  /** 列字段 */
  public columns: DatasetField[] = [];
  /** 经纬度成对列字段 */
  public fieldPairs: FieldPair[] = [];
  /** 地理数据字段 */
  public geoFields: GeoField[] = [];
  /** 数据集是否请求中，动态数据源类型情况 */
  public loading = false;

  constructor(schema: DatasetSchema) {
    this.schema = this.savePropertiesFromSchema(schema);
    if (isLocalDatasetSchema(schema)) {
      this.data = schema.data;
      this.columns = schema.columns;
      this.fieldPairs = getPointFieldPairs(this.columns);
      this.geoFields = getGeoFields(this.columns, this.data);
    }
  }

  /** 数据集 ID */
  public get id() {
    return this.schema.id;
  }

  /** 数据集信息 */
  public get metadata() {
    return this.schema.metadata;
  }

  /** 数据集类型 */
  public get type() {
    return this.schema.type;
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

  public updateData(data: Record<string, any>[]) {
    this.data = data;
    this.columns = data.length ? getDatasetColumns(data) : [];
    this.fieldPairs = getPointFieldPairs(this.columns);
    this.geoFields = getGeoFields(this.columns, this.data);
  }

  public savePropertiesFromSchema(datasetSchema: DatasetSchema) {
    return datasetSchema;
  }

  public loadSchemaFromPropertie() {
    return this.schema;
  }
}

type EditorDatasetManagerListener = (data: EditorDataset[]) => void;

/**
 * 编辑器的数据集状态管理器
 */
class EditorDatasetManager extends Subscribable<EditorDatasetManagerListener> {
  private datasets: Map<string, EditorDataset>;
  private appService: AppService;
  private queriesObserver: QueriesObserver;

  constructor(appService: AppService, datasets: DatasetSchema[] = []) {
    super();
    this.appService = appService;
    this.datasets = new Map(
      datasets.map((item) => {
        return [item.id, new EditorDataset(item)];
      }),
    );
    this.queriesObserver = new QueriesObserver(queryServiceClient, this.getQueriesOptions(datasets));
    this.queriesObserver.subscribe(this.onQueriesStoreChange);
  }

  /**
   * 数据集是否请求中，动态数据源类型情况
   */
  get loading() {
    return this.queriesObserver.getCurrentResult().some((item) => item.isLoading);
  }

  public getDatasetById(id: string) {
    return this.datasets.get(id);
  }

  public getDatasets() {
    return this.datasets;
  }

  public getDatasetList() {
    const datasets = Array.from(this.datasets.values());

    return datasets;
  }

  private copyEditorDataset(editorDataset: EditorDataset): EditorDataset {
    return Object.assign(Object.create(Object.getPrototypeOf(editorDataset)), editorDataset);
  }

  private copyEditorDatasetAndUpdate(original: EditorDataset, options: Partial<EditorDataset> = {}): EditorDataset {
    return Object.entries(options).reduce((acc, entry) => {
      const key = entry[0];
      const value = entry[1];
      // @ts-ignore
      acc[key] = value;
      return acc;
    }, this.copyEditorDataset(original));
  }

  /**
   * 当 schema 更新时，更新数据集的状态
   */
  public update(datasets: DatasetSchema[] = []) {
    for (let index = 0; index < datasets.length; index++) {
      const datasetSchema = datasets[index];
      const editorDataset = this.datasets.get(datasetSchema.id);

      // 更新情况
      if (editorDataset && datasetSchema !== editorDataset.schema) {
        // 什么情况下 schema 会更新：
        // 1. 基本元数据信息发生变更；
        // 2. 属性发生变更(columns\properties)；
        // 3. 数据发生变更；
        // 4. 类型发生变更
        // 原则：只考虑会影响数据发生更新的情况；也就是替换数据集的情况
        this.copyEditorDatasetAndUpdate(editorDataset, { schema: datasetSchema });
      } else {
        // 新增情况
        this.datasets.set(datasetSchema.id, new EditorDataset(datasetSchema));
        // TODO：新增数据集实现自动生成 layer
      }
    }

    const datasetsSchema = this.getDatasetList().map((item) => item.schema);
    this.queriesObserver.setQueries(this.getQueriesOptions(datasetsSchema));

    this.notify();
  }

  /**
   * 获取 QueriesObserver 请求参数
   * 动态数据源类型情况，异步请求数据
   */
  private getQueriesOptions(datasets: DatasetSchema[]) {
    const queriesOptions: QueryObserverOptions[] = datasets
      .filter((item): item is RemoteDatasetSchema => isRemoteDatasetSchema(item))
      .map((dataset) => this.getQueryOptions(dataset));
    return queriesOptions;
  }

  /**
   * 获取 QueryObserver 请求参数
   * 动态数据源类型情况，异步请求数据
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

  protected onSubscribe(): void {
    if (this.listeners.size === 1) {
      // 订阅时，才发起数据请求
    }
  }

  protected onUnsubscribe(): void {
    if (!this.listeners.size) {
      this.listeners = new Set();
    }
  }

  private notify() {
    this.listeners.forEach((listener) => {
      listener(this.getDatasetList());
    });
  }

  /**
   * 数据请求结构变更
   */
  private onQueriesStoreChange() {
    const queriesResult = this.queriesObserver.getCurrentResult();
    queriesResult.forEach((queriesResult) => {
      // queriesResult
    });
  }

  public getSnapshot() {
    return this.getDatasetList();
  }

  destroy() {
    this.listeners = new Set();
    this.queriesObserver.destroy();
  }
}

export default EditorDatasetManager;

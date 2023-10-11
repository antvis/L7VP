import type { DatasetField, DatasetSchema } from '@antv/li-sdk';
import { getDatasetColumns, isLocalDatasetSchema, isLocalOrRemoteDatasetSchema } from '@antv/li-sdk';
import type { FieldPair } from '../types';

const getPointFieldPairs = (fields: DatasetField[]) => {
  const fieldPairs: FieldPair[] = [];

  return fieldPairs;
};

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
  /** 成对列字段 */
  public fieldPairs: FieldPair[] = [];
  /** 数据集是否请求中，动态数据源类型情况 */
  public loading = false;

  constructor(schema: DatasetSchema) {
    this.schema = this.savePropertiesFromSchema(schema);
    this.data = isLocalDatasetSchema(schema) ? schema.data : [];
    if (isLocalOrRemoteDatasetSchema(schema)) {
      this.columns = schema.columns || [];
      this.fieldPairs = getPointFieldPairs(this.columns);
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

  public updateData(data: Record<string, any>[]) {
    this.data = data;
    this.columns = data.length ? getDatasetColumns(data) : [];
    this.fieldPairs = getPointFieldPairs(this.columns);
  }

  public savePropertiesFromSchema(datasetSchema: DatasetSchema) {
    return datasetSchema;
  }

  public loadSchemaFromPropertie() {
    return this.schema;
  }
}

/**
 * 编辑器的数据集状态管理器
 */
class EditorDatasetManager {
  private datasets: Map<string, EditorDataset>;

  constructor(datasets: DatasetSchema[] = []) {
    this.datasets = new Map(
      datasets.map((item) => {
        return [item.id, new EditorDataset(item)];
      }),
    );
  }

  /**
   * 数据集是否请求中，动态数据源类型情况
   */
  get loading() {
    return this.getDatasetList().some((item) => item.loading);
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
      if (editorDataset && datasetSchema !== editorDataset.schema) {
        // TODO: 什么情况下调 updateData
        // 1. 基本元数据信息发生变更；2. 属性发生变更(columns\properties)；3. 数据发生变更；4. 类型发生变更
        // 原则：只考虑会影响数据发生更新的情况；替换数据集的情况？
        this.copyEditorDatasetAndUpdate(editorDataset, { schema: datasetSchema });
      } else {
        this.datasets.set(datasetSchema.id, new EditorDataset(datasetSchema));
      }
    }
  }

  /**
   * 动态数据源类型情况，异步请求数据
   */
  public requestRemoteDataset(service: (...params: any) => Promise<any>) {
    return service;
  }
}

export default EditorDatasetManager;

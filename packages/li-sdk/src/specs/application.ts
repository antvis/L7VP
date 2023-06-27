import type { DatasetSchema } from './dataset';
import type { LayerSchema } from './layer';
import type { MapSchema } from './map';
import type { ApplicationMetadata } from './metadata';
import type { WidgetSchema } from './widget';

export type Application = {
  /**
   * 应用版本号
   */
  version: string;
  /**
   * 应用信息
   */
  metadata: ApplicationMetadata;
  /**
   * 数据集
   */
  datasets: DatasetSchema[];
  /**
   * 应用配置
   */
  spec: {
    /**
     * 地图状态
     */
    map: MapSchema;
    /**
     * 可视化图层
     */
    layers: LayerSchema[];
    /**
     * 组件
     */
    widgets: WidgetSchema[];
  };
};

export function isValidId(id: string): boolean {
  return /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(id);
}

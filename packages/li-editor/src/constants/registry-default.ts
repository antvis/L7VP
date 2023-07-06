import type { ImplementEditorWidget } from '../types';
import {
  DatasetPreview,
  DatasetsPanel,
  Export,
  FiltersPanel,
  Folder,
  LayersPanel,
  MapSetting,
  TilesetsDataset,
  UploadDataset,
  WidgetsPanel,
} from '../widgets';

export const Registry_Default_Editor_Widgets: ImplementEditorWidget[] = [
  DatasetsPanel,
  FiltersPanel,
  LayersPanel,
  WidgetsPanel,
  UploadDataset,
  TilesetsDataset,
  DatasetPreview,
  MapSetting,
  Export,
  Folder,
];

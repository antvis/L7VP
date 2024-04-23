import type { ImplementEditorWidget } from '@antv/li-editor';
import {
  DatasetsPanel,
  FetchDataset,
  FiltersPanel,
  Folder,
  LayersPanel,
  MapSetting,
  TilesetsDataset,
  UploadDataset,
  WidgetsPanel,
} from '@antv/li-editor/dist/esm/widgets';

import CaseDataset from './widgets/CaseDataset';
import DatasetPreview from './widgets/DatasetPreview';
import Docs from './widgets/Docs';
import Export from './widgets/Export';
import NavLogo from './widgets/NavLogo';
import NoviceTour from './widgets/NoviceTour';
import Preview from './widgets/Preview';

export const DefaultEditorWidgets: ImplementEditorWidget[] = [
  DatasetsPanel,
  FiltersPanel,
  LayersPanel,
  WidgetsPanel,
  UploadDataset,
  NoviceTour,
];

// 自定义编辑器的控件
export const editorWidgets: ImplementEditorWidget[] = [DatasetPreview, CaseDataset, Export];
export const editorWidgetsWithBuilder: ImplementEditorWidget[] = [
  DatasetPreview,
  TilesetsDataset,
  FetchDataset,
  CaseDataset,
  NavLogo,
  Preview,
  MapSetting,
  Export,
  Docs,
  Folder,
];

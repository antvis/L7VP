import type { ImplementEditorWidget } from '@antv/li-editor';
import CustomAddDataset from './widgets/CustomAddDataset';
import NavLogo from './widgets/NavLogo';
import Preview from './widgets/Preview';

// 自定义编辑器的控件
export const editorWidgets: ImplementEditorWidget[] = [
  CustomAddDataset,
  NavLogo,
  Preview,
];

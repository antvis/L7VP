import InsightIntoData from '../../assets/images/insight-into-data.jpg';
import SafeStorage from '../../assets/images/safe-storage.jpg';
import VisualizationData from '../../assets/images/visualization-data.jpg';
import WidgetAttr from '../../assets/images/widget-attr.jpg';

export type MenuItem = {
  key: string;
  label: string;
  imgSrc: string;
  description: string;
};

export const FeatureList: MenuItem[] = [
  {
    key: 'insight-into-data',
    label: '数据探查',
    description: '一键统计并可视化探查关键的数据指标。',
    imgSrc: InsightIntoData,
  },
  {
    key: 'visualization-data',
    label: '数据可视',
    description: '数据到图层丰富的自定义样式映射能力。',
    imgSrc: VisualizationData,
  },
  { key: 'widget-attr', label: '组件配置', description: '组件市场选组件，数据动态绑定到组件。', imgSrc: WidgetAttr },
  { key: 'safe-storage', label: '离线存储', description: '数据离线存储浏览器里，更安全更放心。', imgSrc: SafeStorage },
];

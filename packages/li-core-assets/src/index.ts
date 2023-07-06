import {
  ArcLayer,
  BubbleLayer,
  ChoroplethLayer,
  GridLayer,
  H3HexagonLayer,
  HeatmapLayer,
  HexbinLayer,
  IconLayer,
  LineLayer,
  TileLayer,
} from './layers';
import * as Services from './services';
import * as Widgets from './widgets';

const layers = [
  BubbleLayer,
  ChoroplethLayer,
  LineLayer,
  ArcLayer,
  HeatmapLayer,
  GridLayer,
  HexbinLayer,
  IconLayer,
  H3HexagonLayer,
  TileLayer,
];
const widgets = Object.values(Widgets);
const services = Object.values(Services);

export * from './layers';
export * from './widgets';

export default {
  version: 'v0.1',
  layers,
  widgets,
  services,
};

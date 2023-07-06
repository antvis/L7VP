import * as Layers from './layers';
import * as Widgets from './widgets';

const widgets = Object.values(Widgets);
const layers = Object.values(Layers);

export * from './widgets';

export default {
  version: 'v0.1',
  layers,
  widgets,
};

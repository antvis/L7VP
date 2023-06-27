import * as Layers from './layers';
import * as Services from './services';
import * as Widgets from './widgets';

const layers = Object.values(Layers);
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

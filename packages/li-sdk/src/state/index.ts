import type { Application } from '../specs';
import DatasetStore from './datasets';
import type { GlobalModel } from './global';
import GlobalStore from './global';
import LayersStore from './layers';
import MapStore from './map';
import WidgetsStore from './widgets';

export default class StateManager {
  public datasetStore = new DatasetStore();
  public mapStore = new MapStore();
  public layersStore = new LayersStore();
  public widgetsStore = new WidgetsStore();
  public globalStore = new GlobalStore();
  private lastApplication: Application | null = null;

  constructor(initialGlobalState?: GlobalModel) {
    if (initialGlobalState) {
      this.initGlobalState(initialGlobalState);
    }
  }

  public initState(application: Application) {
    const { datasets, spec } = application;
    const { map: mapConfig, layers, widgets } = spec;

    this.mapStore.initMapConfigState(mapConfig);

    // Only update the state if the datasets has changed
    if (!this.lastApplication || this.lastApplication.datasets !== application.datasets) {
      this.datasetStore.initState({ datasets });
    }

    if (!this.lastApplication || this.lastApplication.spec.layers !== application.spec.layers) {
      this.layersStore.initState({ layers });
    }

    if (!this.lastApplication || this.lastApplication.spec.widgets !== application.spec.widgets) {
      this.widgetsStore.initState({ widgets });
    }

    this.lastApplication = application;
  }

  public initGlobalState(global: GlobalModel) {
    this.globalStore.restState({ global });
  }
}

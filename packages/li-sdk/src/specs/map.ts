import type { LarkMapProps } from '@antv/larkmap';

export type MapSchema = {
  basemap: LarkMapProps['mapType'];
  config: {
    zoom?: number;
    center?: [number, number];
    pitch?: number;
    bearing?: number;
    rotation?: number;
    style?: string;
    [key: string]: any;
  };
  logoVisible?: boolean;
  logoPosition?: LarkMapProps['logoPosition'];
};

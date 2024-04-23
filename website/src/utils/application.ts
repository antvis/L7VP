import type { Application, MapSchema } from '@antv/li-sdk';
import { AMAP_KEY, MAPBOX_TOKEN } from '@/constants';
import type { Case, Project } from '@/services';

/**
 * 修改为项目自定义的地图 token
 */
const adaptationAppMapToken = (applicationConfig: Application) => {
  const mapSchema = applicationConfig.spec.map;

  if (mapSchema.basemap !== 'Map') {
    const _mapSchema: MapSchema = { ...mapSchema };
    if (mapSchema.basemap === 'Mapbox') {
      _mapSchema.config = { ..._mapSchema.config, token: MAPBOX_TOKEN };
    } else {
      _mapSchema.config = { ..._mapSchema.config, token: AMAP_KEY };
    }

    applicationConfig.spec.map = _mapSchema;

    return applicationConfig;
  }

  return applicationConfig;
};

export const adaptationProjectMapToken = (project: Project) => {
  project.applicationConfig = adaptationAppMapToken(project.applicationConfig);
  return project;
};

export const adaptationCaseMapToken = (_case: Case) => {
  _case.applicationConfig = adaptationAppMapToken(_case.applicationConfig);
  return _case;
};

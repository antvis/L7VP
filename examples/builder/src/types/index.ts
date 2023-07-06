import type { Application } from '@antv/li-sdk';

export type Project = {
  projectName: string;
  description: string;
  projectId: string;
  creatTime: string;
  applicationConfig: Application;
};

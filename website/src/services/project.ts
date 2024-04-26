import type { Application } from '@antv/li-sdk';
import dayjs from 'dayjs';
import localforage from 'localforage';
import { pick } from 'lodash-es';
import { adaptationProjectMapToken, getUid } from '@/utils';

export type Project = {
  projectName: string;
  description: string;
  projectId: string;
  creatTime: string;
  applicationConfig: Application;
  assetPackageIds?: string[];
};

export type ProjectParams = Pick<Project, 'description' | 'projectName' | 'applicationConfig' | 'assetPackageIds'>;

const PROJECTS_KEY = 'PROJECTS';

/**
 * 更新列表
 */
const updateProjectList = (projects: Project[]) => {
  return localforage.setItem(PROJECTS_KEY, projects);
};

/**
 * 获取项目列表
 */
export const getProjectList = async () => {
  const projects = await localforage.getItem<Project[]>(PROJECTS_KEY);

  return projects || [];
};

/**
 * 创建项目列表
 */
export const createProject = async (params: ProjectParams) => {
  const projectId = getUid();
  const creatTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  // 同步更新 AppConfig 元数据信息
  const appMetadata = pick(params, ['description', 'assetPackageIds']);
  const applicationConfig = {
    ...params.applicationConfig,
    metadata: { name: params.projectName, creatTime, ...appMetadata },
  };

  const project: Project = {
    ...params,
    projectId,
    creatTime,
    applicationConfig,
  };

  const projects = await getProjectList();

  const newProjects = projects.concat(project);

  await updateProjectList(newProjects);

  return project;
};

/**
 * 通过 ID 获取项目
 */
export const getProject = async (id: string) => {
  const projects = await getProjectList();
  const project = projects.find((item) => item.projectId === id);

  if (project === undefined) {
    return Promise.reject('项目不存在');
  }

  const _project = adaptationProjectMapToken(project);

  return _project;
};

/**
 * 通过 ID 更新项目
 */
export const updateProject = async (id: string, params: ProjectParams) => {
  const projects = await getProjectList();
  const index = projects.findIndex((project) => project.projectId === id);

  if (index === -1) {
    return Promise.reject('项目 ID 不存在');
  }

  const project = projects[index];

  // 同步更新 AppConfig 元数据信息
  const appMetadata = pick(params, ['description', 'assetPackageIds']);
  const applicationConfig = {
    ...params.applicationConfig,
    metadata: { name: params.projectName, ...appMetadata },
  };

  const newProject: Project = { ...project, ...params, applicationConfig };
  projects[index] = newProject;

  await updateProjectList(projects);

  return newProject;
};

/**
 * 通过 ID 删除项目
 */
export const deleteProject = async (id: string) => {
  const projects = await getProjectList();
  const index = projects.findIndex((project) => project.projectId === id);

  if (index === -1) {
    return Promise.reject('项目 ID 不存在');
  }

  const project = projects.splice(index, 1);

  await updateProjectList(projects);

  return project;
};

import type { Application } from '@antv/li-sdk';
import localforage from 'localforage';
import { ALL_CASES } from '@/constants/case';
import { adaptationCaseMapToken } from '@/utils';

export type Case = {
  id: string;
  creatTime: string;
  name: string;
  description: string;
  type: string;
  tags: string[];
  thumbnail: string;

  applicationConfig: Application;
  // TODO: 支持 CDN URL
  // applicationConfig?: Application | string;

  assetPackageIds?: string[];

  viewMode?: 'analysis' | 'view';
};

const CASES_KEY = 'CASES';

/**
 * 获取案例列表
 */
export const getCasesList = async () => {
  const solutions = await localforage.getItem<Case[]>(CASES_KEY);

  const _solutions = ALL_CASES.concat(solutions || []);

  return _solutions;
};

/**
 * 通过 ID 获取案例
 */
export const getCase = async (id: string) => {
  const solutions = await getCasesList();
  const solution = solutions.find((item) => item.id === id);

  if (solution === undefined) {
    return Promise.reject('案例 ID 不存在');
  }

  const _solution = adaptationCaseMapToken(solution);

  return _solution;
};

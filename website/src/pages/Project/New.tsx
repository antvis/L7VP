import dayjs from 'dayjs';
import { useEffect } from 'react';
import { history } from 'umi';
import { creatApplication } from './herlper';
import { createProject } from '@/services';
import type { Project as ProjectType } from '@/services';
import { DefaultAssetPackageIds } from '@/constants';

const New = () => {
  const handleRouteBuilder = (value: ProjectType) => {
    history.push({
      pathname: `/builder/${value.projectId}`,
    });
  };

  const addProject = () => {
    const creatTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const defaultName = `未命名_${creatTime}`;
    const applicationConfig = creatApplication(defaultName, DefaultAssetPackageIds);
    createProject({
      projectName: defaultName,
      description: '无描述信息',
      assetPackageIds: DefaultAssetPackageIds,
      applicationConfig,
    }).then((_project) => {
      handleRouteBuilder(_project);
    });
  };

  useEffect(() => {
    addProject();
  }, []);

  return null;
};

export default New;

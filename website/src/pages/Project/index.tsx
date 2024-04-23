import { DesktopOutlined, DownOutlined, EditOutlined, EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Card, Col, Dropdown, Row, Space, Spin, Tabs, Tooltip, Typography } from 'antd';
import classNames from 'classnames';
import { downloadText } from 'download.js';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import AddOrEditProject from './components/AddOrEditProject';
import ImportProject from './components/ImportProject';
import NavSteps from './NavSteps';
import useStyle from './style';
import { logYuyanMonitor } from '@/utils';
import { deleteProject, getProjectList } from '@/services';
import type { Project as ProjectType } from '@/services';
import { DEFAULT_PROJECTS } from '@/constants';

const { Meta } = Card;

const Project = () => {
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [addProjectVisible, setAddProjectVisible] = useState(false);
  const [importProjectVisible, setImportProjectVisible] = useState(false);
  const [type, setType] = useState<'add' | 'edit'>('add');
  const [editProject, setEditProject] = useState<ProjectType>();
  const [projectList, setProjectList] = useState<ProjectType[]>([]);
  const styles = useStyle();
  const [isProjectBtnOpen, setIsProjectBtnOpen] = useState(false);

  const getProjects = () => {
    return getProjectList()
      .then((projects) => {
        if (projects.length) {
          setProjectList(DEFAULT_PROJECTS.concat(projects));
        } else {
          setProjectList(DEFAULT_PROJECTS);
        }
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  useEffect(() => {
    setLoadingProjects(true);
    getProjects().finally(() => setLoadingProjects(false));
  }, []);

  const handleAddProject = () => {
    // 跳过输入，直接创建项目，降低用户使用心智
    window.open(history.createHref(`/new`));
    // setEditProject(undefined);
    // setType('add');
    // setAddProjectVisible(true);
  };

  const handleRouteBuilder = (value: ProjectType) => {
    history.push({
      pathname: `/builder/${value.projectId}`,
    });
  };

  const onSubmit = (value: ProjectType) => {
    if (type === 'edit') {
      getProjects();
    } else {
      handleRouteBuilder(value);
    }
  };

  const onImprotSubmit = () => {
    getProjects();
  };

  const OperationsSlot = {
    right: (
      <Space>
        <Dropdown.Button
          type="primary"
          icon={
            <DownOutlined
              className={classNames(styles.importBtnIcon, {
                [styles.importBtnIconRotate]: isProjectBtnOpen,
              })}
            />
          }
          menu={{
            items: [
              {
                key: 'importProject',
                label: '导入项目',
                onClick() {
                  setImportProjectVisible(true);
                },
              },
            ],
          }}
          onClick={() => handleAddProject()}
          onOpenChange={(open) => {
            setIsProjectBtnOpen(open);
          }}
        >
          创建项目
        </Dropdown.Button>
      </Space>
    ),
  };

  const items = [
    {
      key: 'my-project',
      label: '我的项目',
      children: (
        <Row gutter={[48, 24]}>
          {projectList.map((item) => {
            const dropDownItems: MenuProps['items'] = [
              {
                key: '2',
                label: '导出项目',
                onClick() {
                  downloadText(`${item.projectName}.json`, JSON.stringify(item.applicationConfig));
                },
              },
              {
                key: '3',
                label: '删除项目',
                onClick() {
                  deleteProject(item.projectId).then(() => {
                    getProjects();
                  });
                },
              },
            ];

            const card = (
              <Card
                className={styles.projectCard}
                onClick={() => handleRouteBuilder(item)}
                cover={
                  <div>
                    <img
                      className={styles.projectCardImg}
                      src="https://gw.alipayobjects.com/mdn/rms_816329/afts/img/A*OREXQ4vgQRIAAAAAAAAAAAAAARQnAQ"
                    />
                    <div className={styles.projectCardTools} onClick={(e) => e.stopPropagation()}>
                      <Space>
                        <Tooltip title="预览项目">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DesktopOutlined />}
                            onClick={() => {
                              logYuyanMonitor(11);
                              window.open(history.createHref(`/app/${item.projectId}?type=project`));
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="修改项目">
                          <Button
                            type="text"
                            shape="circle"
                            icon={<EditOutlined />}
                            onClick={() => {
                              setType('edit');
                              setEditProject(item);
                              setAddProjectVisible(true);
                            }}
                          />
                        </Tooltip>
                        <Dropdown menu={{ items: dropDownItems }}>
                          <Button type="text" shape="circle" icon={<EllipsisOutlined />} />
                        </Dropdown>
                      </Space>
                    </div>
                  </div>
                }
              >
                <Meta
                  title={<span title={item.projectName}>{item.projectName}</span>}
                  description={
                    <div>
                      <Typography.Paragraph
                        className={styles.itemDescription}
                        type="secondary"
                        ellipsis={{
                          rows: 1,
                          tooltip: item.description?.length > 20 && { title: item.description },
                        }}
                      >
                        {item.description ?? '暂无项目描述'}
                      </Typography.Paragraph>
                      {/* <Typography.Paragraph className={styles.itemDescription} type="secondary">
                        {item.creatTime}
                      </Typography.Paragraph> */}
                    </div>
                  }
                />
              </Card>
            );

            return (
              <Col key={item.projectId} xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
                {card}
              </Col>
            );
          })}

          {projectList.length === 0 && (
            <Col xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
              <Card bordered={false} className={styles.projectCard} onClick={handleAddProject}>
                <div className={styles.addCard}>
                  <PlusOutlined className={styles.addCardIcon} />
                  <span>暂无项目，创建一个吧</span>
                </div>
              </Card>
            </Col>
          )}
        </Row>
      ),
    },
  ];

  if (loadingProjects) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 50px' }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.project}>
      <NavSteps />
      <Tabs
        defaultActiveKey="my-project"
        tabBarExtraContent={OperationsSlot}
        items={items}
        className={styles.projectTabs}
      />
      <AddOrEditProject
        visible={addProjectVisible}
        onVisibleChange={setAddProjectVisible}
        project={editProject}
        type={type}
        onSubmit={onSubmit}
      />
      <ImportProject
        visible={importProjectVisible}
        onVisibleChange={setImportProjectVisible}
        onSubmit={onImprotSubmit}
      />
    </div>
  );
};

export default Project;

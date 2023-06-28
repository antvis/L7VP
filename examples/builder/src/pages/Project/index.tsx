import { FolderAddOutlined, MoreOutlined } from '@ant-design/icons';
import type { MenuProps, TabsProps } from 'antd';
import { Button, Card, Col, Dropdown, Layout, Row, Space, Tabs } from 'antd';
import { downloadText } from 'download.js';
import { useState } from 'react';
import { history, Link } from 'umi';
import styles from './index.less';
import type { Project } from '@/types';
import { DEFAULT_PROJECTS } from '@/constans';

export default function ProjectPage() {
  const [projectList, setProjectList] = useState<Project[]>(DEFAULT_PROJECTS);

  const handleRouteBuilder = (value: Project) => {
    history.push({
      pathname: `/builder/${value.projectId}`,
    });
  };

  const OperationsSlot = {
    right: (
      <Space>
        <Button
          type="primary"
          icon={<FolderAddOutlined />}
          disabled
          onClick={() => {
            // TODO: handle add project
          }}
        >
          新增项目
        </Button>
      </Space>
    ),
  };

  const CardExtra = (item: Project) => {
    const dropDownItems: MenuProps['items'] = [
      {
        key: '1',
        label: '修改项目',
        disabled: true,
        onClick() {
          // TODO: handle edit project
        },
      },
      {
        key: '4',
        label: (
          <Link to={`/app/${item.projectId}`} target="_blank">
            预览项目
          </Link>
        ),
      },
      {
        key: '2',
        label: '导出项目',
        onClick() {
          downloadText(
            `${item.projectName}.json`,
            JSON.stringify(item.applicationConfig),
          );
        },
      },
      {
        key: '3',
        label: '删除项目',
        disabled: true,
        onClick() {
          // TODO: handle delete project
        },
      },
    ];

    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Dropdown menu={{ items: dropDownItems }}>
          <MoreOutlined className={styles['dropdown-icon']} />
        </Dropdown>
      </div>
    );
  };

  const items: TabsProps['items'] = [
    {
      key: 'my-project',
      label: '我的项目',
      children: (
        <Row gutter={[48, 24]}>
          {projectList.map((item) => {
            return (
              <Col
                key={item.projectId}
                xxl={6}
                xl={8}
                lg={12}
                md={12}
                sm={24}
                xs={24}
              >
                <Card
                  title={item.projectName}
                  extra={CardExtra(item)}
                  className={styles.card}
                  onClick={() => handleRouteBuilder(item)}
                >
                  <p title={item.description} className={styles.description}>
                    {item.description}
                  </p>
                  <p className={styles.time}>{item.creatTime}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      ),
    },
  ];

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            padding: '0 10px',
            fontSize: '18px',
            color: '#fff',
            fontWeight: 500,
            height: '40px',
            lineHeight: '40px',
            borderRadius: '4px',
          }}
        >L7VP Builder Example</div>
      </Layout.Header>
      <Layout.Content
        style={{ padding: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
      >
        <Tabs
          defaultActiveKey="my-project"
          tabBarExtraContent={OperationsSlot}
          items={items}
        />
      </Layout.Content>
    </Layout>
  );
}

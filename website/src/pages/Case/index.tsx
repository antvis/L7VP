import { DesktopOutlined, ForkOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Spin, Tag, Tooltip, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import useStyle from './style';
import { createProject, getCasesList } from '@/services';
import type { Case as CaseType } from '@/services';
import { useEmptyModal } from '@/hooks';

const { Meta } = Card;

const Case = () => {
  const styles = useStyle();
  const [caseList, setCaseList] = useState<CaseType[]>([]);
  const [loadingCases, setLoadingCases] = useState(true);
  const { emptyModal, emptyContextHolder } = useEmptyModal();

  const getCases = () => {
    return getCasesList()
      .then((cases) => {
        setCaseList(cases);
      })
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  useEffect(() => {
    setLoadingCases(true);
    getCases().finally(() => setLoadingCases(false));
  }, []);

  const saveToProject = (caseConfig: CaseType) => {
    const appConfig = caseConfig.applicationConfig;
    const params = {
      projectName: `${appConfig?.metadata.name}_copy`,
      description: appConfig?.metadata.description || '',
      applicationConfig: appConfig!,
      assetPackageIds: caseConfig.assetPackageIds,
    };
    createProject(params)
      .then((project) => {
        history.push({
          pathname: `/project`,
        });
      })
      .catch(() => {
        emptyModal('添加到项目失败');
      });
  };

  const renderCase = (caseConfig: CaseType) => {
    const onView = () => {
      const path =
        caseConfig.viewMode === 'view' ? `/app/${caseConfig.id}?type=case` : `/template/${caseConfig.id}?nav=layers`;
      window.open(history.createHref(path));
    };

    return (
      <Card
        className={styles.caseCard}
        onClick={onView}
        cover={
          <div>
            <img alt={caseConfig.name} className={styles.caseImg} src={caseConfig.thumbnail} />
            <div className={styles.caseHead} onClick={(e) => e.stopPropagation()}>
              <div>
                <Tag color={caseConfig.type === 'vis' ? 'green' : 'blue'} bordered={false}>
                  {caseConfig.type === 'vis' ? '可视分析' : caseConfig.type === 'app' ? '应用案例' : '其他案例'}
                </Tag>
                {caseConfig.tags.map((_item) => (
                  <Tag key={_item} color="cyan" bordered={false}>
                    {_item}
                  </Tag>
                ))}
              </div>
              <div className={styles.caseTools}>
                <Space>
                  <Tooltip title="预览">
                    <Button type="text" shape="circle" icon={<DesktopOutlined />} onClick={onView} />
                  </Tooltip>
                  <Tooltip title="克隆">
                    <span key="create map" onClick={() => saveToProject(caseConfig)}>
                      <Button type="text" shape="circle" icon={<ForkOutlined />} />
                    </span>
                  </Tooltip>
                </Space>
              </div>
            </div>
          </div>
        }
      >
        <Meta
          title={<span title={caseConfig.name}>{caseConfig.name}</span>}
          description={
            <Typography.Paragraph
              className={styles.itemDescription}
              type="secondary"
              ellipsis={{
                rows: 2,
                tooltip: caseConfig.description.length > 40 && { title: caseConfig.description },
              }}
            >
              {caseConfig.description ?? '暂无描述'}
            </Typography.Paragraph>
          }
        />
      </Card>
    );
  };

  if (loadingCases) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 50px' }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.cases}>
      <div className={styles.catalogTitle}>案例列表</div>
      <Row gutter={[48, 24]}>
        {caseList.map((item) => {
          return (
            <Col key={item.id} xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
              {renderCase(item)}
            </Col>
          );
        })}
      </Row>
      {emptyContextHolder}
    </div>
  );
};

export default Case;

import Icon from '@ant-design/icons';
import { Card, Col, Row, Tag, Tooltip } from 'antd';
import { isEmpty } from 'lodash-es';
import type { LayerItem, WidgetItem } from '../index';
import useStyle from './style';

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type ContentProps = {
  list: WidgetItem[] | LayerItem[];
  icon: IconType;
};

const Content = (props: ContentProps) => {
  const { list, icon } = props;
  const styles = useStyle();

  return (
    <Row gutter={[48, 24]}>
      {list.map((item: WidgetItem | LayerItem, index) => {
        const Image = <Icon component={item.metadata.icon ? item.metadata.icon : icon} />;

        const _description = isEmpty(item.metadata.description) ? (
          '暂无描述'
        ) : item.metadata.description && item.metadata.description?.length > 20 ? (
          <Tooltip title={item.metadata.description}>{item.metadata.description}</Tooltip>
        ) : (
          item.metadata.description
        );

        return (
          <Col key={index} xxl={4} xl={6} lg={8} md={12} sm={24} xs={24}>
            <Card
              bordered={false}
              className={styles.components}
              bodyStyle={{ overflow: 'hidden', padding: 0 }}
              key={index}
            >
              <div className={styles.components__content}>
                <div className={styles.components__content__img}>{Image}</div>
                <div className={styles.components__content__right}>
                  <div className={styles.components__content__right__header}>
                    <div className={styles.components__content__right__header__name}>{item.metadata.displayName}</div>
                    <Tag className={styles.components__content__right__header__verson}>{item.version}</Tag>
                  </div>

                  <span className={styles.components__content__right__description}>{_description}</span>
                  <span className={styles.components__content__right__package}>
                    {item.packageName}
                    <span style={{ marginLeft: 5 }}>{item.packageVersion}</span>
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Content;

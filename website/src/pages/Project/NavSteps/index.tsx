import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { useResponsive } from 'ahooks';
import { Button, Card } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import useStyle from './style';

const steps = [
  { title: '准备数据', description: '准备好要进行地理可视分析的数据' },
  { title: '创建项目', description: '创建一个项目开始探索你准备的数据' },
  { title: '配置导出', description: '配置可视图层以及分析组件，预览或导出可视分析成果' },
];

const NavSteps = () => {
  const styles = useStyle();
  const [isClose, setIsClose] = useState(false);
  const responsive = useResponsive();
  const isMobile = responsive.md === false;

  if (isClose || isMobile) return;

  return (
    <Card className={classNames(styles.navCard)}>
      <div className={styles.navCardTitle}>
        <div>快来探索你的地理空间数据吧～</div>
        <Button
          type="text"
          className={styles.navCardClosed}
          onClick={() => {
            setIsClose(true);
          }}
        >
          <CloseOutlined />
        </Button>
      </div>
      <div className={styles.navCardContent}>
        {steps.map((item, index) => (
          <div key={index} className={styles.navCardContentItem}>
            <div className={styles.itemSerialNumber}>{index + 1}</div>
            <div className={styles.itemContent}>
              <div className={styles.itemTitle}>
                {item.title} {index + 1 !== steps.length && <RightOutlined className={styles.itemTitleIcon} />}
              </div>
              <div className={styles.itemDesc}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default NavSteps;

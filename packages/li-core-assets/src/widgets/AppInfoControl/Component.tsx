import { InfoCircleOutlined, ShrinkOutlined } from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import useStyle from './ComponenStyle';
import { CLS_PREFIX, POPOVER_PLACEMENT_LEGEND } from './constants';
import type { Properties } from './registerForm';

export interface AppInfoControlProps extends ImplementWidgetProps, Properties {}

const AppInfoControl: React.FC<AppInfoControlProps> = (props) => {
  const { position, open } = props;
  const styles = useStyle();
  const [openPopover, setOpenPopover] = useState(false);

  // TODO 后期拿到应用信息，替换掉
  const config = {
    metadata: {
      name: '应用名称',
      description: '应用描述',
    },
  };

  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  useEffect(() => {
    setOpenPopover(open);
  }, [open]);

  const content = (
    <>
      <div className={classNames(`${CLS_PREFIX}__popover__content`, styles.informationContent)}>
        <div className={styles.informationContentHeader}>
          <div>{config.metadata.name}</div>
          <div>
            <ShrinkOutlined
              className={styles.informationContentHeaderBtn}
              onClick={() => {
                setOpenPopover(false);
              }}
            />
          </div>
        </div>
        {config.metadata.description && (
          <div className={styles.informationContentDescription}>{config.metadata.description}</div>
        )}
      </div>
    </>
  );

  return (
    <CustomControl position={position}>
      <Popover
        overlayClassName={classNames(`${CLS_PREFIX}__popover`, styles.informationPopover)}
        open={openPopover}
        placement={onPlacement}
        content={content}
        trigger="click"
        arrow={false}
      >
        {!openPopover && (
          <Tooltip placement={onPlacement} title="显示应用信息">
            <div
              className={classNames(`${CLS_PREFIX}__btn`, styles.informationBtn, {
                [styles.informationBtnSelect]: openPopover,
              })}
              onClick={() => {
                setOpenPopover((isOpen) => !isOpen);
              }}
            >
              <InfoCircleOutlined />
            </div>
          </Tooltip>
        )}
      </Popover>
    </CustomControl>
  );
};

export default AppInfoControl;

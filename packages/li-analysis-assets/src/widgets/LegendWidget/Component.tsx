import Icon from '@ant-design/icons';
import { CustomControl, LegendCategories, LegendIcon, LegendRamp } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useLayerList } from '@antv/li-sdk';
import { useUpdate } from 'ahooks';
import { Empty, Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import useStyle from './ComponenStyle';
import {
  CLS_PREFIX,
  LegendWidgetClosureSvg,
  LegendWidgetOpenSvg,
  LegendWidgetSvg,
  POPOVER_PLACEMENT_LEGEND,
} from './constants';
import { parserLegendData } from './helper';
import type { Properties } from './registerForm';
import type { LegendCategoriesData, LegendIconData, LegendRampData } from './types';

export interface LegendType extends ImplementWidgetProps, Properties {}
type LegendDataListType = LegendRampData | LegendCategoriesData | LegendIconData;

const LegendControl: React.FC<LegendType> = (props) => {
  const { position, open } = props;
  const styles = useStyle();
  const [openPopover, setOpenPopover] = useState(false);
  const [legendDataList, setLegendDataList] = useState<LegendDataListType[]>([]);
  const layerList = useLayerList();

  useEffect(() => {
    setOpenPopover(open);
  }, [open]);

  useEffect(() => {
    const updateLegendData = () => {
      const legendDatas = layerList.map(parserLegendData);
      const legendData = legendDatas.filter(
        (item) => item.data.labels.length && (!isEmpty(item.data.colors) || !isEmpty(item.data.icons)),
      );
      setLegendDataList(legendData);
    };

    setTimeout(() => {
      updateLegendData();
    }, 1000);

    layerList.forEach((layer) => {
      layer.on('legend:color', updateLegendData);
    });
    return () => {
      layerList.forEach((layer) => {
        layer.off('legend:color', updateLegendData);
      });
    };
  }, [layerList]);

  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  const updata = useUpdate();

  const content = (
    <>
      <div className={classNames(`${CLS_PREFIX}__popover__header-title`, styles.popoverHeaderTitle)}>图层图例</div>
      {legendDataList?.map((item: LegendDataListType, index: number) => {
        const visible = item.layer.isVisible();
        return (
          <div
            key={`${index.toString()}`}
            className={classNames(`${CLS_PREFIX}__popover__content-item`, styles.popoveContentItem)}
          >
            <div className={classNames(`${CLS_PREFIX}__popover__content-item__header`, styles.itemHeader)}>
              <div>{item.name}</div>
              <Icon
                onClick={() => {
                  item.layer.update({ visible: !visible });
                  updata();
                }}
                component={visible ? LegendWidgetOpenSvg : LegendWidgetClosureSvg}
              />
            </div>
            {visible && (
              <>
                {item.type && <div className={styles.itemField}>{item.field}</div>}
                {item.type === 'LegendCategories' && <LegendCategories {...item.data} />}
                {item.type === 'LegendRamp' && <LegendRamp {...item.data} />}
                {item.type === 'LegendIcon' && <LegendIcon {...item.data} />}
              </>
            )}
          </div>
        );
      })}

      {!legendDataList.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
    </>
  );

  return (
    <CustomControl position={position}>
      <div className={classNames(CLS_PREFIX, styles.legendContainer)}>
        <Popover
          overlayClassName={classNames(`${CLS_PREFIX}__popover`, styles.legendPopover)}
          open={openPopover}
          placement={onPlacement}
          content={content}
          trigger="click"
          arrow={false}
        >
          <Tooltip placement={onPlacement} title="显示图例">
            <div
              className={classNames(`${CLS_PREFIX}__btn`, styles.legendBtn, {
                [styles.legendBtnSelect]: openPopover,
              })}
              onClick={() => {
                setOpenPopover((isOpen) => !isOpen);
              }}
            >
              <Icon component={LegendWidgetSvg} />
            </div>
          </Tooltip>
        </Popover>
      </div>
    </CustomControl>
  );
};

export default LegendControl;

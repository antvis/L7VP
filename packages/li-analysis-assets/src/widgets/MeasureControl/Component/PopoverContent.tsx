/* eslint-disable @typescript-eslint/no-unused-expressions */
import Icon from '@ant-design/icons';
import type { IBaseModeOptions } from '@antv/l7-draw';
import { DrawEvent, DrawLine, DrawPolygon, getSingleColorStyle } from '@antv/l7-draw';
import type { ILineFeature } from '@antv/l7-draw/es/typings/feature';
import { Marker } from '@antv/larkmap';
import { useScene } from '@antv/li-sdk';
import type { Feature } from '@turf/turf';
import { Button, Divider, theme, Tooltip } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import type { MouseEvent } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DeleteSvg, drawControl, RemoveSvg } from './constants';
import { collectionLine, collectionPolygon } from './helper';
import useStyle from './style';
import type { DrawCustomType, LineMarkerType, PolygonMarkerType, PopoverContentProps } from './typings';

export const CLS_PREFIX = 'li-analysis-draw-control-container';
const { useToken } = theme;
const PopoverContent: React.FC<PopoverContentProps> = ({ color = '#ec25fa' }) => {
  const styles = useStyle();
  const [scene] = useScene();
  const [customMeasureControl, setCustomMeasureControl] = useState<DrawCustomType[]>([]);
  const [lineMarkerList, setLineMarkerList] = useState<LineMarkerType[]>([]);
  const [polygonMarkerList, setPolygonMarkerList] = useState<PolygonMarkerType[]>([]);
  const activeDraw = useMemo(() => customMeasureControl.find((item) => item.isActive), [customMeasureControl]);
  const { token } = useToken();

  useEffect(() => {
    if (scene) {
      const commonOptions: Partial<IBaseModeOptions> = {
        // @ts-ignore
        style: getSingleColorStyle(color),
        autoActive: false,
        multiple: false,
      };
      // @ts-ignore
      const lineDrawer = new DrawLine(scene, {
        helper: { draw: '单击开始测量距离', drawFinish: '双击结束测距' },
        ...commonOptions,
      });
      // @ts-ignore
      const polygonDrawer = new DrawPolygon(scene, {
        helper: { draw: '单击开始测量面积', drawFinish: '双击结束测面积' },
        ...commonOptions,
      });
      const newDrawControl = drawControl.map((item) => {
        if (item.drawType === 'line') {
          return { ...item, draw: lineDrawer };
        }
        return { ...item, draw: polygonDrawer };
      });
      setCustomMeasureControl(newDrawControl);
    }
    return () => {
      customMeasureControl.forEach((item) => {
        item.draw.destroy();
      });
    };
  }, [scene]);

  const syncFeatureMarkers = useCallback((featureList: Feature[], drawType: string) => {
    if (!drawType || isEmpty(featureList)) {
      setLineMarkerList([]);
      setPolygonMarkerList([]);
      return;
    }
    // 绘制线
    if (drawType === 'line') {
      const lineFeature = collectionLine(featureList);
      if (!isEmpty(lineFeature)) {
        setLineMarkerList(lineFeature);
      }
    }
    // 绘制多边形
    if (drawType === 'polygon') {
      const polygonFeature = collectionPolygon(featureList);
      if (!isEmpty(polygonFeature)) {
        setPolygonMarkerList(polygonFeature);
      }
    }
  }, []);

  // 清空绘制状态
  const resetState = useCallback(() => {
    activeDraw?.draw.disable();
    setCustomMeasureControl(
      customMeasureControl.map((value) => {
        return { ...value, isActive: false };
      }),
    );
  }, [activeDraw?.draw, customMeasureControl]);

  // 删除节点
  const onRemoveNode = useCallback(
    ({ lineId, nodeIndex }: LineMarkerType) => {
      const [line] = customMeasureControl;
      const featureList = (line.draw.getData() as ILineFeature[]).map((feature) => {
        if (feature.properties.id === lineId) {
          feature.geometry.coordinates.splice(nodeIndex, 1);
          feature.properties.nodes.splice(nodeIndex, 1);
        }
        return feature;
      });
      line.draw.setData(featureList);
      syncFeatureMarkers(featureList, line.drawType);
    },
    [customMeasureControl, syncFeatureMarkers],
  );

  // 删除Feature
  const onDelete = useCallback(
    (editFeature: Feature, event: MouseEvent) => {
      event.stopPropagation();
      customMeasureControl.forEach((customDraw) => {
        customDraw.draw.removeFeature(editFeature);
        const id = editFeature.properties?.id;
        if (id) {
          if (customDraw.drawType === 'line') {
            const needRemoveFeature = lineMarkerList.filter((item) => item.lineId !== id);
            setLineMarkerList(needRemoveFeature);
          }
          if (customDraw.drawType === 'polygon') {
            const removeFeature = polygonMarkerList.filter((item) => item.polygonId !== id);
            setPolygonMarkerList(removeFeature);
          }
        }
      });

      requestAnimationFrame(() => {
        scene?.render();
      });
    },
    [customMeasureControl, lineMarkerList, polygonMarkerList, scene],
  );

  useEffect(() => {
    const { draw, drawType } = activeDraw ?? {};

    const onAddNode = (_: Feature, __: Feature, featureList: Feature[]) => {
      syncFeatureMarkers(featureList, drawType ?? '');
    };

    const onChange = (features: Feature[]) => {
      syncFeatureMarkers(features, drawType ?? '');
      resetState();
    };

    draw?.on(DrawEvent.AddNode, onAddNode);
    draw?.on(DrawEvent.Change, onChange);
    return () => {
      draw?.off(DrawEvent.AddNode, onAddNode);
      draw?.off(DrawEvent.Change, onChange);
    };
  }, [activeDraw, syncFeatureMarkers, resetState]);

  // 激活对应的绘制类型
  const setActiveDraw = ({ isActive, draw }: DrawCustomType, index: number) => {
    if (isActive) {
      draw.disable();
    } else {
      draw.enable();
    }
    const newCustomControl = customMeasureControl.map((value, i) => {
      const isSelect = index === i;
      if (!isSelect) {
        value.draw.disable();
      }
      return { ...value, isActive: !!isSelect };
    });
    setCustomMeasureControl(newCustomControl);
  };

  // 线 marker
  const lineMarker = useMemo(() => {
    const RemoveIcon = (item: LineMarkerType) => {
      // @ts-ignore
      const enableHide = item.editFeature.geometry.coordinates.length;
      if (enableHide <= 2) return null;
      return (
        <Icon
          className={classNames(`${CLS_PREFIX}__marker-icon`, styles.drawMarkerIcon)}
          component={RemoveSvg}
          onClick={(event) => {
            if (item.editFeature.properties?.nodes.length < 3) return;
            event.stopPropagation();
            onRemoveNode(item);
          }}
        />
      );
    };
    const DeleteIcon = (item: LineMarkerType) => {
      if (!item.isLast) return null;
      return (
        <Icon
          className={classNames(`${CLS_PREFIX}__marker-icon`, styles.drawMarkerIcon)}
          component={DeleteSvg}
          onClick={(event) => onDelete(item.editFeature, event)}
        />
      );
    };
    return (
      <div>
        {lineMarkerList.map((item) => {
          const { isLast, text, nodeId, lngLat } = item;
          return (
            // @ts-ignore
            <Marker anchor={'top-left'} lngLat={lngLat} key={nodeId} offsets={[-5, -15]}>
              <div className={classNames(`${CLS_PREFIX}__marker-content`, styles.drawMarkerContent)}>
                {!!isLast && '共'}
                {text}
                <RemoveIcon {...item} />
                <DeleteIcon {...item} />
              </div>
            </Marker>
          );
        })}
      </div>
    );
  }, [lineMarkerList, onDelete, onRemoveNode]);

  // 面 marker
  const polygonMarker = useMemo(() => {
    const DeleteIcon = (item: PolygonMarkerType) => {
      return (
        <Icon
          className={classNames(`${CLS_PREFIX}__marker-icon`, styles.drawMarkerIcon)}
          component={DeleteSvg}
          onClick={(event) => onDelete(item.editFeature, event)}
        />
      );
    };
    return (
      <div>
        {polygonMarkerList.map((item) => {
          const { text, lngLat, editFeature } = item;
          return (
            <Marker
              anchor={'center'}
              lngLat={lngLat}
              key={editFeature.properties?.id}
              // @ts-ignore
              offsets={[0, 0]}
            >
              <div className={classNames(`${CLS_PREFIX}__marker-content`, styles.drawMarkerContent)}>
                共{text}
                <DeleteIcon {...item} />
              </div>
            </Marker>
          );
        })}
      </div>
    );
  }, [onDelete, polygonMarkerList]);

  const onClear = () => {
    Promise.all(
      customMeasureControl?.map(async (item) => {
        await item.draw?.clear();
      }),
    ).then(() => {
      resetState();
      setLineMarkerList([]);
      setPolygonMarkerList([]);
    });
  };

  return (
    <div className={classNames(styles.drawContainer, CLS_PREFIX)}>
      {customMeasureControl?.map((item, index) => (
        <div key={item.title}>
          <Tooltip title={item.title}>
            <Button
              className={classNames(`${CLS_PREFIX}__btn`, {
                [styles.drawBtn]: activeDraw?.drawType === item.drawType,
              })}
              type="text"
              onClick={() => setActiveDraw(item, index)}
            >
              <Icon
                className={classNames(`${CLS_PREFIX}__icon`, styles.drawIcon)}
                component={item.icon}
                title={item.title}
              />
            </Button>
          </Tooltip>
          <Divider type="vertical" />
        </div>
      ))}
      <Tooltip title="清空测量结果">
        <Button type="text" className={classNames(`${CLS_PREFIX}__clear`, styles.drawClear)} onClick={() => onClear()}>
          <Icon component={DeleteSvg} />
        </Button>
      </Tooltip>
      {lineMarker}
      {polygonMarker}
    </div>
  );
};

export default PopoverContent;

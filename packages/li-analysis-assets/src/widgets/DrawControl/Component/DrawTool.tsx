import { DrawEvent } from '@antv/l7-draw';
import { useDrawGroup } from '@antv/larkmap';
import type { UseDrawGroupConfig } from '@antv/larkmap/es/components/Draw/use-draw-group/types';
import { useScene } from '@antv/li-sdk';
import type { Feature } from '@turf/turf';
import { useAsyncEffect } from 'ahooks';
import { Divider, message } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import useStyle from '../Component/style';
import { ContextMenu } from '../ContextMenu';
import type { DrawStyle, DrawTools, DrawType, ToolItem } from '../types';
import { CLS_PREFIX, Copy, Delete, drawConfig, getDrawCommonStyle, Off, On } from './contants';

interface DrawProps {
  color?: string;
  options: UseDrawGroupConfig;
}

const defaultOptions = {
  point: {},
  polygon: {},
  circle: {},
  rect: {},
  line: {},
};

export function DrawTool(props: DrawProps) {
  const styles = useStyle();
  const [scene] = useScene();
  const [drawVisible, setDrawVisible] = useState(true);
  const [drawType, setDrawType] = useState<DrawType & DrawTools>();
  const [drawOption, setDrawOption] = useState<UseDrawGroupConfig>(defaultOptions);
  const [messageApi, contextHolder] = message.useMessage();

  const { drawMap, setActiveDraw, setDrawGroupData, drawGroupData } = useDrawGroup(drawOption);

  const newOption = useMemo(() => {
    const options: Record<string, typeof defaultOptions> = {};
    Object.keys(defaultOptions).map((item) => {
      // if (item === 'point') {
      //   options[item] = {
      //     ...defaultOptions[item],
      //     // @ts-ignore
      //     style: getDrawPointStyle({ ...props.options, shape: 'pointIcon' }),
      //   };
      // } else {
      options[item] = {
        // @ts-ignore
        ...defaultOptions[item],
        autoActive: false,
        helper: false,
        style: getDrawCommonStyle(props.options as DrawStyle),
      };
      // }
    });
    return options;
  }, [props.options]);

  useAsyncEffect(async () => {
    // if (scene) {
    //   const fontFamily = 'iconfont';
    //   const fontPath = '//at.alicdn.com/t/a/font_3146149_3ebsv6pwmfq.woff2?t=1682333621996';
    //   scene.addIconFont('pointIcon', '&#xe617;');
    //   scene.addFontFace(fontFamily, fontPath);
    // }
    setDrawOption(newOption);
  }, [newOption, scene]);

  const clearDraw = () => {
    setDrawType(undefined);
    setActiveDraw(null);
    setDrawGroupData({ point: [], polygon: [], rect: [], circle: [], line: [] });
  };

  const onChange = useCallback(() => {
    setDrawType(undefined);
    setActiveDraw(null);
    // @ts-ignore
    drawMap[drawType].disable();
  }, [drawMap, drawType, setActiveDraw]);

  // 绘制后关闭绘制
  useEffect(() => {
    if (typeof drawType === 'undefined' || drawType === 'clear' || drawType === 'on' || drawType === 'off') return;

    drawMap[drawType]?.on(DrawEvent.Change, onChange);

    return () => {
      drawMap[drawType]?.off(DrawEvent.Change, onChange);
    };
  }, [drawType, setActiveDraw, drawMap, onChange]);

  const onVisible = () => {
    setDrawVisible(!drawVisible);
    Object.values(drawMap).forEach((draw) => {
      if (drawVisible) {
        draw.hide();
      } else {
        draw.show();
      }
    });
  };

  const canDraw = (type: DrawType & DrawTools) => {
    // 显示/隐藏
    if (typeof type === 'boolean') {
      onVisible();
    }
    // 清除
    if (type === 'clear') {
      clearDraw();
      return;
    }
    if (type === drawType) {
      // 取消选中
      setDrawType(undefined);
      setActiveDraw(null);
    } else {
      setDrawType(type);
      setActiveDraw(drawMap[type]);
    }
  };

  // 删除数据
  const deleteByContextMenu = (e: Feature) => {
    // @ts-ignore
    const { feature } = e;
    const layerId = (feature as Feature).properties?.id;
    for (const drawData in drawGroupData) {
      // @ts-ignore
      drawGroupData[drawData] = drawGroupData[drawData].filter((item) => item.properties?.id !== layerId);
    }
    setDrawGroupData(drawGroupData);
  };

  // copy数据
  const copyData = (e: Feature) => {
    // @ts-ignore
    const feature = e?.feature;
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = JSON.stringify(feature.geometry ?? '');
    input.select();
    document.execCommand('copy');
    input.remove();
    messageApi.success('复制成功');
  };

  function ToolItem(item: ToolItem) {
    const newOnClick = item?.onClick ? item.onClick : () => canDraw(item.value as DrawType & DrawTools);
    return (
      <div
        className={classNames(`${CLS_PREFIX}__draw-tools__item`, styles.drawToolItem, {
          [styles.drawToolItemAction]: item.value === drawType,
        })}
        onClick={newOnClick}
        style={{ ...item.style }}
      >
        {item.icon}
        {item.label}
      </div>
    );
  }

  return (
    <div className={classNames(`${CLS_PREFIX}__draw-tools`, styles.drawTools)}>
      {drawConfig.map((item) => (
        <ToolItem {...item} key={item.value} />
      ))}
      <Divider className={classNames(styles.divider, `${CLS_PREFIX}__draw-tools__divider`)} />
      {/*  @ts-ignore */}
      <ToolItem icon={drawVisible ? <On /> : <Off />} value={!!drawVisible} label={drawVisible ? '显示' : '隐藏'} />
      <ToolItem icon={<Delete />} value="clear" label="清除" />

      {contextHolder}
      <ContextMenu structure={drawMap}>
        {(e: Feature) => {
          return (
            <div className={classNames(styles.drawToolContextmenu, `${CLS_PREFIX}__draw-tools__context-menu`)}>
              <ToolItem icon={<Copy />} value="copy" label={'复制数据'} onClick={() => copyData(e)} />
              <ToolItem icon={<Delete />} value="delete" label="删除" onClick={() => deleteByContextMenu(e)} />
            </div>
          );
        }}
      </ContextMenu>
    </div>
  );
}

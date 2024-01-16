import { HolderOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { Empty } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
import { useEditorState, usePrefixCls } from '../../../hooks';
import DragList from './DragList';
import LayerItem from './LayerItem';

type LayersPanelProps = {
  className?: string;
  onClickLayer: (layerConfig: LayerSchema) => void;
};

const LayerList: React.FC<LayersPanelProps> = (props) => {
  const { onClickLayer } = props;
  const prefixCls = usePrefixCls('layer-list');
  const { state, updateState } = useEditorState();

  // 以图层在地图上的层级从高到低的（地图上）排列，以方便用户从 UI 上理解图层列表。
  // - 新增的图层，在最上面；
  // - 最上面的图层，在地图上的层级越高；

  // 从原始数据，反转顺序
  const layers = useMemo(() => state.layers.slice().reverse(), [state.layers]);

  const onDragEnd = (newLayerList: LayerSchema[]) => {
    const lastIndex = newLayerList.length - 1;
    const newLayerListWithZindex = newLayerList
      .map((item, index) => ({
        ...item,
        // 设置 zIndex，图层的 zIndex 从大到小排列
        visConfig: { ...item.visConfig, zIndex: lastIndex - index },
      }))
      // 反转顺序，反转为原始数据，
      .reverse();
    updateState((draft) => {
      draft.layers = newLayerListWithZindex;
    });
  };

  if (isEmpty(layers)) {
    return (
      <Empty
        className={`${prefixCls}__empty`}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无图层，请先新增图层"
      />
    );
  }

  return (
    <div className={classNames(prefixCls, props.className)}>
      <DragList items={layers} onDrag={onDragEnd} dragIcon={<HolderOutlined />}>
        {(layer, icon) => <LayerItem dragIcon={icon} layer={layer} onClickLayer={onClickLayer} />}
      </DragList>
    </div>
  );
};

export default LayerList;

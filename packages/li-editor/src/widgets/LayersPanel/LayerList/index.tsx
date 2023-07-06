import { HolderOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { Empty } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useEditorState } from '../../../hooks';
import DragList from './DragList';
import './index.less';
import LayerItem from './LayerItem';

type LayersPanelProps = {
  className?: string;
  onClickLayer: (layerConfig: LayerSchema) => void;
};

const LayerList: React.FC<LayersPanelProps> = (props) => {
  const { onClickLayer } = props;
  const { state, updateState } = useEditorState();

  const onDragEnd = (newLayerList: LayerSchema[]) => {
    updateState((draft) => {
      draft.layers = newLayerList.map((item, index) => ({
        ...item,
        visConfig: { ...item.visConfig, zIndex: index },
      }));
    });
  };

  if (isEmpty(state.layers)) {
    return (
      <Empty
        className="li-layer-list__empty"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description="暂无图层，请先新增图层"
      />
    );
  }

  return (
    <div className={classNames('li-layer-list', props.className)}>
      <DragList items={state.layers} onDrag={onDragEnd} dragIcon={<HolderOutlined />}>
        {(layer: LayerSchema, icon: JSX.Element) => (
          <LayerItem dragIcon={icon} layer={layer} onClickLayer={onClickLayer} />
        )}
      </DragList>
    </div>
  );
};

export default LayerList;

import React, { memo } from 'react';
import { useLayerConfigList } from '../../../hooks/internal';
import WrapperLayer from '../WrapperLayer';

type LayerListProps = {};

/** 图层渲染组件 */
const LayerList: React.FC<LayerListProps> = (props) => {
  const [layerConfigList] = useLayerConfigList();

  return (
    <React.Fragment>
      {layerConfigList.map((layerSchema) => {
        return <WrapperLayer key={layerSchema.id} layer={layerSchema} />;
      })}
    </React.Fragment>
  );
};

export default memo(LayerList);

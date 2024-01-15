import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import React, { useState } from 'react';
import classNames from 'classnames';
import type { ImplementEditorAddDatasetWidgetProps } from '../../types';
import { usePrefixCls } from '../../hooks';
import MVTTile from './MVTTile';
import XYZTile from './XYZTile';
import useStyle from './TilesetsDatasetStyle';

type TilesetsDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function TilesetsDataset(props: TilesetsDatasetProps) {
  const { onSubmit, onCancel } = props;
  const prefixCls = usePrefixCls('tilesets');
  const styles = useStyle();
  const [tilesetType, setTilesetType] = useState('XYZ Tile');

  return (
    <>
      <div className={prefixCls}>
        <div className={classNames(`${prefixCls}__type`, styles.tilesetsType)}>
          <p className={classNames(`${prefixCls}__type-label`, styles.tilesetsTypeLabel)}>瓦片类型</p>
          <Radio.Group value={tilesetType} onChange={(e: RadioChangeEvent) => setTilesetType(e.target.value)}>
            <Radio.Button value="XYZ Tile">XYZ Tile</Radio.Button>
            {/* <Radio.Button value="WMS">TMS</Radio.Button> */}
            {/* <Radio.Button value="WMTS">TMTS</Radio.Button> */}
            <Radio.Button value="MVT Tile">MVT Tile</Radio.Button>
          </Radio.Group>
        </div>
        {tilesetType === 'XYZ Tile' && <XYZTile onSubmit={onSubmit} onCancel={onCancel} />}
        {tilesetType === 'MVT Tile' && <MVTTile onSubmit={onSubmit} onCancel={onCancel} />}
      </div>
    </>
  );
}

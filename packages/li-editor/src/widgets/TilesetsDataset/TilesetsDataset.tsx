import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import React, { useState } from 'react';
import type { ImplementEditorAddDatasetWidgetProps } from '../../types';
import MVTTile from './MVTTile';
import './TilesetsDataset.less';
import XYZTile from './XYZTile';

type TilesetsDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function TilesetsDataset(props: TilesetsDatasetProps) {
  const { onSubmit, onCancel } = props;
  const [tilesetType, setTilesetType] = useState('XYZ Tile');

  return (
    <>
      <div className="li-tilesets">
        <div className="li-tilesets__type">
          <p className="li-tilesets__type-label">瓦片类型</p>
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

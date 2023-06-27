import { getUniqueId } from '@antv/li-sdk';
import type { RadioChangeEvent } from 'antd';
import { Button, Form, Input, Radio, Space } from 'antd';
import React, { useState } from 'react';
import type { ImplementEditorAddDatasetWidgetProps } from '../../types';
import { isValidTileUrl } from './helper';
import './TilesetsDataset.less';
import type { XYZTilesetConfig } from './types';
import Zoom from './Zoom';

type TilesetsDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function TilesetsDataset(props: TilesetsDatasetProps) {
  const { onSubmit, onCancel } = props;
  const [tilesetType, setTilesetType] = useState('XYZ Tile');
  const [tilesetConfig, setTilesetConfig] = useState<XYZTilesetConfig>();
  const [form] = Form.useForm();
  const canAddTileset = tilesetConfig && tilesetConfig.name && tilesetConfig.url;

  const onFormChange = (_: any, allValues: XYZTilesetConfig) => {
    setTilesetConfig(allValues);
  };

  const onAddTileset = async () => {
    if (!tilesetConfig) return;
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    const { name, url, zoom } = tilesetConfig;
    const tilesetId = getUniqueId();
    const tileset = {
      id: tilesetId,
      type: 'raster-tile' as const,
      metadata: {
        name,
        description: tilesetType,
        serviceType: tilesetType,
      },
      properties: {
        url,
        parser: { type: 'rasterTile', tileSize: 256, minZoom: zoom.minZoom, maxZoom: zoom.maxZoom },
      },
    };
    const layer = {
      id: getUniqueId(),
      type: 'TileLayer',
      metadata: { name },
      sourceConfig: {
        datasetId: tilesetId,
        parser: { type: 'rasterTile' },
      },
      visConfig: {
        visible: true,
      },
    };
    onSubmit([tileset], [layer]);
  };

  return (
    <>
      <div className="li-tilesets">
        <div className="li-tilesets__type">
          <p className="li-tilesets__type-label">瓦片类型</p>
          <Radio.Group value={tilesetType} onChange={(e: RadioChangeEvent) => setTilesetType(e.target.value)}>
            <Radio.Button value="XYZ Tile">XYZ Tile</Radio.Button>
            {/* <Radio.Button value="WMS">TMS</Radio.Button> */}
            {/* <Radio.Button value="WMTS">TMTS</Radio.Button> */}
            {/* <Radio.Button value="vector tile">Vector Tile</Radio.Button> */}
          </Radio.Group>
        </div>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onValuesChange={onFormChange}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请填写服务名称' }]}>
            <Input placeholder="请输入服务名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="服务 URL"
            rules={[
              { required: true, message: '请输入服务地址' },
              {
                validator(_, value) {
                  if (!value) {
                    return Promise.reject();
                  }
                  if (value && isValidTileUrl(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请输入有效的服务地址'));
                },
              },
            ]}
          >
            <Input placeholder="https://example.com/{z}/{x}/{y}.png" />
          </Form.Item>
          <Form.Item name="zoom" label="层级" tooltip="指定服务的有效层级">
            <Zoom onChange={(zoom) => form.setFieldValue('zoom', zoom)} />
          </Form.Item>
        </Form>
      </div>
      <div className="li-tilesets__footer ant-modal-footer">
        <Space>
          <Button onClick={onCancel}>返回</Button>
          <Button disabled={!canAddTileset} type="primary" onClick={onAddTileset}>
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}

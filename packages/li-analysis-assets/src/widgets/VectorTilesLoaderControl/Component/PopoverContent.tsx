import type { LineLayerProps, PointLayerProps, PolygonLayerProps } from '@antv/larkmap';
import { LineLayer, PointLayer, PolygonLayer } from '@antv/larkmap';
import { Button, Form, Input, InputNumber, Select } from 'antd';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ConfigProps, VectorTileType } from './helper';
import { getLayerConfig, isValidTileUrl } from './helper';
import Zoom from './Zoom';

const CLS_PREFIX = 'li-analysis-vector-tiles-loader-control-popover-content';
const PopoverContent = () => {
  const [form] = Form.useForm();
  const [loaded, setLoaded] = useState(false);
  const layerKey = useRef(uniqueId());
  const [layerConfig, setLayerConfig] = useState<PointLayerProps | PolygonLayerProps | LineLayerProps>();
  const [vectorTileType, setVectorTileType] = useState<VectorTileType>('point');
  const [urlValidateStatus, setUrlValidateStatus] = useState<
    '' | 'success' | 'warning' | 'error' | 'validating' | undefined
  >(undefined);

  const onLoaded = (values: ConfigProps) => {
    if (loaded) {
      // 重新加载
      layerKey.current = uniqueId();
    }

    const config = getLayerConfig(values);
    setLayerConfig(config);
    setLoaded(true);
  };

  const onRemove = () => {
    setLoaded(false);
  };

  const urlVaildator = (rule: any, value: string) => {
    if (!value) {
      setUrlValidateStatus('error');
      return Promise.reject();
    } else if (!isValidTileUrl(value)) {
      setUrlValidateStatus('error');
      return Promise.reject(new Error('请检查输入的 url 地址是否有效！'));
    } else {
      setUrlValidateStatus('success');
      return Promise.resolve();
    }
  };

  const VectorTileLayer = useMemo(() => {
    switch (vectorTileType) {
      case 'line':
        return <LineLayer key={layerKey.current} {...(layerConfig as LineLayerProps)} />;
      case 'polygon':
        return <PolygonLayer key={layerKey.current} {...(layerConfig as PolygonLayerProps)} />;
      case 'point':
      default:
        return <PointLayer key={layerKey.current} {...(layerConfig as PointLayerProps)} />;
    }
  }, [layerConfig]);

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        type: 'point',
        tileSize: 256,
        zoomOffset: 0,
        zoom: {
          minZoom: 0,
          maxZoom: 14,
        },
      });
    }
  }, []);

  return (
    <>
      <Form form={form} onFinish={onLoaded} labelCol={{ span: 7 }} style={{ minWidth: 280 }} className={CLS_PREFIX}>
        <Form.Item
          name="url"
          label="矢量瓦片"
          tooltip="请输入瓦片地址，例如：https://example.com/{z}/{x}/{y}.pdf"
          hasFeedback
          validateStatus={urlValidateStatus}
          rules={[{ required: true, message: '请输入矢量瓦片地址' }, { validator: urlVaildator }]}
        >
          <Input placeholder="https://example.com/{z}/{x}/{y}.pdf" allowClear />
        </Form.Item>
        <Form.Item name="type" label="瓦片类型" rules={[{ required: true, message: '请选择瓦片类型' }]}>
          <Select
            value={vectorTileType}
            placeholder="请选择类型"
            options={[
              { label: '点', value: 'point' },
              { label: '线', value: 'line' },
              { label: '面', value: 'polygon' },
            ]}
            onChange={(e) => {
              setVectorTileType(e);
            }}
          />
        </Form.Item>
        <Form.Item name="featureId" label="编码 ID" tooltip="用于指定图形的编码 ID">
          <Input placeholder="请输入编码 ID" />
        </Form.Item>
        <Form.Item
          name="sourceLayer"
          label="瓦片图层"
          tooltip="一个矢量瓦片服务有多个图层，指定一个名称加载其中一个图层"
          rules={[{ required: true, message: '请填写加载矢量瓦片图层名称' }]}
        >
          <Input placeholder="请填写加载矢量瓦片图层名称" />
        </Form.Item>
        <Form.Item name="zoom" label="瓦片层级" tooltip="指定矢量瓦片服务的有效层级">
          <Zoom onChange={(zoom) => form.setFieldValue('zoom', zoom)} />
        </Form.Item>
        <Form.Item name="zoomOffset" label="偏移量" tooltip="请求瓦片层级的偏移量">
          <InputNumber min={0} defaultValue={0} />
        </Form.Item>
        <Form.Item name="tileSize" label=" 瓦片尺寸">
          <InputNumber min={0} defaultValue={256} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button htmlType="button" disabled={!loaded} onClick={onRemove} style={{ marginRight: 10 }}>
            移除
          </Button>
          <Button type="primary" htmlType="submit">
            {loaded ? '重新加载' : '加载'}
          </Button>
        </Form.Item>
      </Form>

      {loaded && VectorTileLayer}
    </>
  );
};

export default PopoverContent;

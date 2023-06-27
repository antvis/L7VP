import Icon, { EnvironmentOutlined } from '@ant-design/icons';
import type { FeatureData } from '@antv/larkmap/es/components/Draw/types';
import { point } from '@turf/turf';
import type { RadioChangeEvent } from 'antd';
import { Button, ConfigProvider, Form, InputNumber, message, Modal, Radio, theme, Tooltip } from 'antd';
import React, { useMemo, useState } from 'react';
import { useEditorService, useEditorState } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';
import {
  AMAP_KEY as AMAP__KEY,
  BaseMapSvg,
  CLS_PREFIX,
  GaodeMapStyleConfig,
  MapboxStyleConfig,
  MAPBOX_TOKEN as MAPBOX__TOKEN,
} from './constant';
import { DrawModal } from './DrawModal';
import './MapSetting.less';

type MapSettingProps = ImplementEditorWidgetProps & {
  AMAP_KEY?: string;
  MAPBOX_TOKEN?: string;
};

const { useToken } = theme;

const MapSetting: React.FC<MapSettingProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip placement="right" title="地图初始化配置">
        <Button
          onClick={showModal}
          type="text"
          size="middle"
          shape="circle"
          icon={<Icon component={BaseMapSvg} style={{ fontSize: '18px' }} />}
        />
      </Tooltip>
      <MapSettingModal {...props} open={isModalOpen} onClose={onClose} />
    </>
  );
};

function MapSettingModal(props: { AMAP_KEY?: string; MAPBOX_TOKEN?: string; open: boolean; onClose: () => void }) {
  const { AMAP_KEY = AMAP__KEY, MAPBOX_TOKEN = MAPBOX__TOKEN, open, onClose } = props;
  const context = useEditorState();
  const appService = useEditorService().appService;
  const [drawModalOpen, setDrawModalOpen] = useState(false);
  const [zoomValue, setZoomValue] = useState(context.state.map.config.zoom);
  const [drawValue, setDrawValue] = useState(context.state.map.config.center);
  const [mapStyle, setMapStyle] = useState(context.state.map.config.style);
  const [mapType, setMapType] = useState(context.state.map.basemap);
  const [viewMode, setViewMode] = useState(context.state.map.config.viewMode || '2D');
  const [pitchValue, setPitchValue] = useState(context.state.map.config.pitch || 50);
  const [rotationValue, setRotationValue] = useState(context.state.map.config.rotation || 20);
  const [messageApi, messageContextHolder] = message.useMessage();
  const { token } = useToken();

  const setSyncMapViewState = () => {
    const viewState = appService.getMapViewState();
    if (!viewState) return;

    const { zoom, center } = viewState;
    setZoomValue(zoom);
    setDrawValue([center.lng, center.lat]);
  };

  const handleOk = () => {
    context.updateState((draft) => {
      // 关闭地图缓冲区，否则截图时无法截取到地图部分
      const drawingBufferConfig =
        mapType && ['Mapbox', 'Map'].includes(mapType)
          ? { preserveDrawingBuffer: true }
          : { WebGLParams: { preserveDrawingBuffer: true } };
      draft.map.basemap = mapType;
      const token = mapType !== 'Map' ? (mapType === 'Mapbox' ? MAPBOX_TOKEN : AMAP_KEY) : undefined;
      // mapBox\map 逆时针旋转更改顺时针
      const rotation = viewMode === '2D' ? 0 : mapType === 'Gaode' ? rotationValue : 360 - rotationValue;

      draft.map.config = {
        ...draft.map.config,
        token,
        zoom: zoomValue,
        center: drawValue,
        style: mapType === 'Map' ? undefined : mapStyle,
        pitch: viewMode === '2D' ? 0 : pitchValue,
        rotation: rotation,
        viewMode: mapType === 'Gaode' ? viewMode : undefined,
        dragRotate: mapType === 'Mapbox' && viewMode === '2D' ? false : true,
        pitchWithRotate: mapType === 'Mapbox' && viewMode === '2D' ? false : true,
        ...drawingBufferConfig,
      };
    });
    onClose();
  };

  const initialData = useMemo(() => {
    if (drawValue) {
      const points = point(drawValue);
      return points;
    }
  }, [drawValue]);

  const handleCancel = () => {
    onClose();
  };

  const drawModalOk = (featureData?: FeatureData) => {
    if (featureData) {
      setDrawModalOpen(false);
      setDrawValue(featureData.geometry.coordinates as [number, number]);
    } else {
      messageApi.info('请添加中心点');
    }
  };

  const drawModalCance = () => {
    setDrawModalOpen(false);
  };

  const onZoomChange = (e: any) => {
    setZoomValue(e);
  };

  const onMapStyleClick = (e: { text: string; img?: string; type?: string }) => {
    setMapStyle(e.type);
  };

  const onMapTypeChange = (e: RadioChangeEvent) => {
    setMapType(e.target.value);
    setMapStyle('dark');
  };

  const onViewModeChange = (e: RadioChangeEvent) => {
    setViewMode(e.target.value);
  };

  const onPictChange = (e: number | null) => {
    setPitchValue(e ? e : 0);
  };

  const onRotationChange = (e: number | null) => {
    setRotationValue(e ? e : 0);
  };

  return (
    <>
      <Modal
        okText="保存"
        cancelText="取消"
        destroyOnClose
        title="地图设置"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <ConfigProvider componentSize="small">
          <p className={`${CLS_PREFIX}__desc`}>设置地图初始化的中心点、缩放等级、底图样式</p>

          <Form layout="vertical" className={`${CLS_PREFIX}`}>
            <Form.Item label="地图中心点">
              <div className={`${CLS_PREFIX}__map-content`}>
                <div className={`${CLS_PREFIX}__map-content-text`}>{drawValue?.toString()}</div>
                <Button
                  type="link"
                  style={{ color: token.colorPrimary }}
                  icon={<EnvironmentOutlined size={15} />}
                  onClick={() => {
                    setDrawModalOpen(true);
                  }}
                >
                  选择
                </Button>
              </div>
            </Form.Item>
            <Form.Item label="缩放等级">
              <InputNumber value={zoomValue} onChange={onZoomChange} min={1} max={17} />
            </Form.Item>
          </Form>
          <Button onClick={setSyncMapViewState} className={`${CLS_PREFIX}__btn`}>
            使用当前窗口中心点、缩放等级
          </Button>

          <div className={`${CLS_PREFIX}__view-mode`}>
            <div>视图模式</div>
            <Radio.Group onChange={onViewModeChange} value={viewMode}>
              <Radio.Button value="2D">2D</Radio.Button>
              <Radio.Button value="3D">3D</Radio.Button>
            </Radio.Group>
          </div>
          {viewMode === '3D' ? (
            <div className={`${CLS_PREFIX}__view-angle`}>
              <div className={`${CLS_PREFIX}__view-angle-item`}>
                <div>地图倾角</div>
                <InputNumber
                  className={`${CLS_PREFIX}__view-angle-item-input`}
                  min={0}
                  //  mapBox\map 地图倾斜角度最大为60
                  max={mapType === 'Gaode' ? 90 : 60}
                  width={110}
                  value={pitchValue}
                  onChange={onPictChange}
                />
              </div>
              <div className={`${CLS_PREFIX}__view-angle-item`}>
                <div>地图旋转</div>
                <InputNumber
                  className={`${CLS_PREFIX}__view-angle-item-input`}
                  min={0}
                  max={360}
                  value={rotationValue}
                  onChange={onRotationChange}
                />
              </div>
            </div>
          ) : null}
          <div className={`${CLS_PREFIX}__map-type`}>
            <div>底图样式</div>
            <Radio.Group onChange={onMapTypeChange} value={mapType}>
              <Radio.Button style={{ width: 70, textAlign: 'center' }} value="Gaode">
                高德
              </Radio.Button>
              <Radio.Button style={{ width: 100, textAlign: 'center' }} value="Mapbox">
                MapBox
              </Radio.Button>
              <Radio.Button style={{ width: 100, textAlign: 'center' }} value="Map">
                无底图
              </Radio.Button>
            </Radio.Group>
          </div>

          <div className={`${CLS_PREFIX}__style`}>
            {mapType === 'Gaode' &&
              GaodeMapStyleConfig.map((item) => {
                return (
                  <div key={item.text} className={`${CLS_PREFIX}__style-content`} onClick={() => onMapStyleClick(item)}>
                    <div
                      className={
                        mapStyle === item.type ? `${CLS_PREFIX}__style-item-active` : `${CLS_PREFIX}__style-item`
                      }
                    >
                      <img src={item.img} width={120} height={90} className={`${CLS_PREFIX}__style-item-img`} />
                    </div>
                    <div
                      className={
                        mapStyle === item.type
                          ? `${CLS_PREFIX}__style-item-text-active`
                          : `${CLS_PREFIX}__style-item-text`
                      }
                    >
                      {item.text}
                    </div>
                  </div>
                );
              })}

            {mapType === 'Mapbox' &&
              MapboxStyleConfig.map((item) => {
                return (
                  <div key={item.text} className={`${CLS_PREFIX}__style-content`} onClick={() => onMapStyleClick(item)}>
                    <div
                      className={
                        mapStyle === item.type ? `${CLS_PREFIX}__style-item-active` : `${CLS_PREFIX}__style-item`
                      }
                    >
                      <img src={item.img} width={120} height={90} className={`${CLS_PREFIX}__style-item-img`} />
                    </div>
                    <div
                      className={
                        mapStyle === item.type
                          ? `${CLS_PREFIX}__style-item-text-active`
                          : `${CLS_PREFIX}__style-item-text`
                      }
                    >
                      {item.text}
                    </div>
                  </div>
                );
              })}
          </div>
        </ConfigProvider>
      </Modal>
      {messageContextHolder}
      <DrawModal
        destroyOnClose
        title="选择中心点"
        open={drawModalOpen}
        initialData={initialData}
        type={'point'}
        onCancel={drawModalCance}
        onSubmit={drawModalOk}
      />
    </>
  );
}

export default MapSetting;

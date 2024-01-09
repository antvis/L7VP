import { CloseOutlined } from '@ant-design/icons';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useDatasetList, useLayerList } from '@antv/li-sdk';
import { Col, Image, Row, Typography } from 'antd';
import cls from 'classnames';
import { isObject, isString } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useStyle from './ComponenStyle';
import { CLS_PREFIX } from './constants';
import { isImageUrl } from './helper';
import type { Properties } from './registerForm';

const { Paragraph, Text } = Typography;

export interface PropertiesPanelProps extends ImplementWidgetProps, Properties {}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({ items = [], isOpen }) => {
  const [feature, setFeature] = useState<Record<string, any>>({});
  const styles = useStyle();
  const [collapsed, setCollapsed] = useState(0);
  const [title, setTitle] = useState<string>();
  const layerList = useLayerList();
  const [datasetList] = useDatasetList();
  const activeFeatureIdRef = useRef<string>();

  const formatLayerList = useMemo(() => {
    const list = items
      .map((item) => ({ ...item, layer: layerList.find((layer) => layer.id === item.layerId) }))
      .filter((item) => item.enable && item.layer);
    return list;
  }, [items, layerList]);

  useEffect(() => {
    const onLayerClick = (event: any, datasetId: string, layerName: string | undefined) => {
      const datasetName = datasetList.find((item) => item.id === datasetId);
      setTitle(datasetName?.metadata.name || layerName);
      setCollapsed(300);
      setFeature(event.feature);
    };
    // 事件代理列表，为保证取消绑定事件是同一个函数引用地址
    const onLayerClickList: ((event: any) => void)[] = [];
    formatLayerList.forEach((item) => {
      const layerClick = (event: any) => {
        const currentActiveFeatureId = item.layerId + event.featureId;
        // 判断是否点到同一位置，是关闭信息展示框
        if (activeFeatureIdRef.current && activeFeatureIdRef.current === currentActiveFeatureId) {
          setCollapsed(0);
          setFeature({});
          setTitle(undefined);
          activeFeatureIdRef.current = undefined;
        } else {
          activeFeatureIdRef.current = currentActiveFeatureId;
          onLayerClick(event, item.datasetId, item.layer?.name);
        }
      };

      item.layer?.on('click', layerClick);
      onLayerClickList.push(layerClick);
    });
    return () => {
      formatLayerList.forEach((item, index) => {
        item.layer?.off('click', onLayerClickList[index]);
      });
    };
  }, [datasetList, formatLayerList]);

  const getContent = (val: any) => {
    if (isString(val) && isImageUrl(val)) {
      return (
        <div>
          <Image referrerPolicy="no-referrer" height={100} src={val} />
        </div>
      );
    }

    const text = isObject(val) ? JSON.stringify(val) : val;

    return (
      <Paragraph
        ellipsis={{
          rows: 3,
          expandable: true,
        }}
      >
        {text}
      </Paragraph>
    );
  };

  return (
    <>
      {isOpen && (
        <div className={cls(styles.propertiesPanel, CLS_PREFIX)} style={{ width: collapsed }}>
          <div style={{ display: Boolean(collapsed) ? 'block' : 'none' }}>
            <div className={cls(`${CLS_PREFIX}__header`, styles.panelHeader)}>
              <div className={cls(`${CLS_PREFIX}__header__title`, styles.panelHeaderTitle)}>{title}</div>
              <CloseOutlined onClick={() => setCollapsed(0)} />
            </div>
            <Row style={{ padding: 14 }} className={cls(`${CLS_PREFIX}__content`, styles.panelContent)}>
              {Object.keys(feature).map((key) => {
                return (
                  <Col span={24} key={key} style={{ marginBottom: 10 }}>
                    <Text className={cls(`${CLS_PREFIX}__header__label`, styles.panelHeaderLabel)}>{key}:</Text>
                    {getContent(feature[key])}
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertiesPanel;

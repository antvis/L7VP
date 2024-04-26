import type { ImplementEditorAddDatasetWidgetProps } from '@antv/li-editor';
import { parserCSVToSource, parserGeoJsonToSource, parserJsonToSource } from '@antv/li-editor';
import type { DatasetSchema, LayerSchema } from '@antv/li-sdk';
import { Button, Col, Row, Space } from 'antd';
import classNames from 'classnames';
import { flatten } from 'lodash-es';
import { useEffect, useState } from 'react';
import { usePrefixCls } from '../../hooks';
import { DEMO_CASE } from './constants';
import useStyle from './style';
import type { DemoDataSource } from './types';

type CaseDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function CaseDataset(props: CaseDatasetProps) {
  const { onSubmit, onCancel } = props;
  const prefixCls = usePrefixCls('case-dataset');
  const styles = useStyle();
  const [selectData, setSelectData] = useState<{
    dataSources: DatasetSchema[];
    layers?: LayerSchema[];
  }>({ dataSources: [], layers: [] });
  const [slelectDemo, setSelectDemo] = useState<string[]>([]);

  const onSelectDemos = async (sources: DemoDataSource[], layers: LayerSchema[]) => {
    const fetchDataBySrc = async (src: string) => {
      const response = await fetch(src);
      const originData = await response.text();
      return originData;
    };
    const newFetch = sources.map((item: DemoDataSource) => fetchDataBySrc(item.url));
    const originDatas = await Promise.all(newFetch);
    const data: DatasetSchema[] = originDatas
      .map((item, index) => {
        if (sources[index].type === 'json') {
          return parserJsonToSource(item, sources[index].name, sources[index].id);
        } else if (sources[index].type === 'geojson') {
          return parserGeoJsonToSource(item, sources[index].name, sources[index].id);
        } else if (sources[index].type === 'csv') {
          return parserCSVToSource(item, sources[index].name, sources[index].id);
        }
      })
      .filter((item) => item !== undefined) as DatasetSchema[];

    setSelectData({ dataSources: data, layers });
  };

  useEffect(() => {
    const selectDemoSource = DEMO_CASE.filter((demo) => slelectDemo.includes(demo.demoName)).map(
      (demo) => demo.dataSources,
    );
    const layers = DEMO_CASE.filter((demo) => slelectDemo.includes(demo.demoName)).map((demo) => demo.layerList);
    onSelectDemos(flatten(selectDemoSource), flatten(layers));
  }, [slelectDemo]);

  return (
    <>
      <Row className={classNames(prefixCls, styles.caseDataset)} gutter={[42, 24]}>
        {DEMO_CASE.map((demo) => (
          <Col span={8} key={demo.demoName}>
            <div
              className={classNames(`${prefixCls}__item`, styles.datasetItem)}
              onClick={() => {
                if (slelectDemo.includes(demo.demoName)) {
                  setSelectDemo(slelectDemo.filter((item) => item !== demo.demoName));
                } else {
                  setSelectDemo([...slelectDemo, demo.demoName]);
                }
              }}
            >
              <img
                style={{ width: '100%', height: 150 }}
                src={demo.imgUrl}
                className={
                  slelectDemo.includes(demo.demoName)
                    ? classNames(`${prefixCls}__item_select`, styles.datasetItemSelect)
                    : ''
                }
              />
              <div className={classNames(`${prefixCls}__item-name`, styles.datasetItemName)}>{demo.demoName}</div>
            </div>
          </Col>
        ))}
      </Row>

      <div className={classNames(`${prefixCls}__footer`, 'ant-modal-footer')}>
        <Space>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            返回
          </Button>
          <Button
            disabled={selectData.dataSources.length ? false : true}
            type="primary"
            onClick={() => {
              onSubmit(selectData.dataSources, selectData.layers);
            }}
          >
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}

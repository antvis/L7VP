import type { Dataset, LocalDatasetSchema } from '@antv/li-sdk';
import { isLocalOrRemoteDataset } from '@antv/li-sdk';
import { Form, message, Modal, Radio, Select } from 'antd';
import classNames from 'classnames';
import { downloadBlob, downloadText } from 'download.js';
import React from 'react';
import { useEditorDatasets, useEditorState, usePrefixCls } from '../../../hooks';
import { json2CSV, json2geo, json2xlsx } from './helper';
import useStyle from './style';

type ExportDataProps = {
  visible: boolean;
  onVisbleChange: (open: boolean) => void;
};

const ExportData = ({ visible, onVisbleChange }: ExportDataProps) => {
  const prefixCls = usePrefixCls('export-data');
  const styles = useStyle();
  const [form] = Form.useForm();
  const { state } = useEditorState();
  const { editorDatasets } = useEditorDatasets();
  // 过滤常规数据源
  const localDatasets = state.datasets
    .filter((dataset) => isLocalOrRemoteDataset(dataset as Dataset))
    .map((dataset) => {
      const data = editorDatasets.find((item) => item.schema.id === dataset.id)?.data;
      return {
        ...dataset,
        data,
      };
    }) as LocalDatasetSchema[];

  const [messageApi, messageContextHolder] = message.useMessage();

  const fieldTypeListOption = [
    { label: 'JSON', value: 'json' },
    { label: 'CSV', value: 'csv' },
    { label: 'Excel', value: 'xlsx' },
    { label: 'GeoJSON', value: 'geojson' },
  ];

  const downLoadDataSource = () => {
    const { dataSourceId, type } = form.getFieldsValue(true);
    const targetDataset = localDatasets.find((item) => item.id === dataSourceId);
    if (dataSourceId == 'all') {
      try {
        if (type === 'json') {
          localDatasets.forEach((item) => {
            downloadText(`${item.metadata.name}.${type}`, JSON.stringify(item.data));
          });
        }
        if (type === 'geojson') {
          localDatasets.forEach((dataset) => {
            const geometry = dataset.columns.find((item) => item.type === 'geo');
            if (geometry?.name) {
              const { type: geometryType } = dataset.data[0][geometry.name];
              const geojosn = json2geo(dataset, geometryType, geometry);
              downloadText(`${dataset.metadata.name}.json`, JSON.stringify(geojosn));
            } else {
              messageApi.error(`${dataset.metadata.name}数据不支持 GeoJSON 格式输出`);
            }
          });
        }
        if (type === 'csv') {
          localDatasets.forEach((item) => {
            downloadText(`${item.metadata.name}.${type}`, json2CSV(item));
          });
        }
        if (type === 'xlsx') {
          localDatasets.forEach((item) => {
            const content = json2xlsx(item);
            if (content) {
              downloadBlob(`${item.metadata.name}.${type}`, content);
            } else {
              messageApi.error(`${item.metadata.name}数据不支持 xlsx 格式输出`);
            }
          });
        }
        onVisbleChange(false);
      } catch (e) {
        throw e;
      }
    } else if (targetDataset) {
      try {
        if (type === 'json') {
          downloadText(`${targetDataset.metadata.name}.${type}`, JSON.stringify(targetDataset.data));
        }
        if (type === 'geojson') {
          const geometry = targetDataset.columns.find((item) => item.type === 'geo');
          if (geometry?.name) {
            const { type: geometryType } = targetDataset.data[0][geometry.name];
            const geojosn = json2geo(targetDataset, geometryType, geometry);
            downloadText(`${targetDataset.metadata.name}.json`, JSON.stringify(geojosn));
          } else {
            messageApi.error('此数据不支持 GeoJSON 格式输出');
          }
        }
        if (type === 'csv') {
          downloadText(`${targetDataset.metadata.name}.${type}`, json2CSV(targetDataset));
        }
        if (type === 'xlsx') {
          const content = json2xlsx(targetDataset);
          if (content) {
            downloadBlob(`${targetDataset.metadata.name}.${type}`, content);
          } else {
            messageApi.error(`${targetDataset.metadata.name}数据不支持 xlsx 格式输出`);
          }
        }
        onVisbleChange(false);
      } catch (e) {
        throw e;
      }
    }
  };

  return (
    <Modal
      className={prefixCls}
      destroyOnClose
      open={visible}
      onCancel={() => onVisbleChange(false)}
      title="导出数据"
      width={600}
      onOk={downLoadDataSource}
      okText="导出"
      cancelText="返回"
    >
      {messageContextHolder}
      <Form colon={false} form={form}>
        <Form.Item
          name="dataSourceId"
          label={
            <div className={classNames(`${prefixCls}__form-label`, styles.formLabel)}>
              <span>数据集</span>
              <span className={classNames(`${prefixCls}__form-desc`, styles.formDesc)}>选择要导出的数据集</span>
            </div>
          }
          style={{ padding: 20 }}
          initialValue={localDatasets.length ? 'all' : undefined}
        >
          <Select
            options={
              localDatasets.length
                ? [
                    { label: '全部', value: 'all' },
                    ...localDatasets.map((item) => {
                      return { label: item.metadata.name, value: item.id };
                    }),
                  ]
                : []
            }
          />
        </Form.Item>
        <Form.Item
          name="type"
          label={
            <div className={classNames(`${prefixCls}__form-label`, styles.formLabel)}>
              <span>数据类型</span>
              <span className={classNames(`${prefixCls}__form-desc`, styles.formDesc)}>选择要导出的数据类型</span>
            </div>
          }
          style={{ padding: 20 }}
          initialValue={'json'}
        >
          <Radio.Group optionType="button" buttonStyle="solid" options={fieldTypeListOption} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ExportData;

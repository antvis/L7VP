import type { LayerSchema } from '@antv/li-sdk';
import { getDatasetFields } from '@antv/li-sdk';
import { Form } from '@formily/antd-v5';
import { createForm, onFieldValueChange } from '@formily/core';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import { pick } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { useEditorDataset, useEditorService, useEditorState } from '../../../../hooks';
import BaseFormSchemaField from '../BaseFormSchemaField';
import './index.less';
import StyleForm from './StyleForm';

type LayerFormProps = {
  className?: string;
  config: LayerSchema;
  onChange: (config: Pick<LayerSchema, 'type' | 'sourceConfig' | 'visConfig'>) => void;
};

const LayerForm: React.FC<LayerFormProps> = ({ className, config, onChange }) => {
  const { state } = useEditorState();
  const [visType, setVisType] = useState(config.type);
  const [datasetId, setDatasetId] = useState(config?.sourceConfig?.datasetId);
  const editorDataset = useEditorDataset(datasetId!);
  const columns = useMemo(() => (editorDataset ? editorDataset.columns : []), [editorDataset]);

  const [initialValues, setInitialValues] = useState<Pick<LayerSchema, 'sourceConfig' | 'visConfig'>>(
    pick(config, ['sourceConfig', 'visConfig']),
  );

  const { appService } = useEditorService();
  const implementLayer = appService.getImplementLayer(visType);

  const sourceList = useMemo(() => {
    const list = state.datasets.map((item) => ({
      label: item.metadata.name,
      value: item.id,
    }));
    return list;
  }, [state.datasets]);

  const datasetFields = useMemo(() => getDatasetFields(columns), [columns]);

  const handleFormValuesChange = useMemoizedFn((styleConfig: Pick<LayerSchema, 'sourceConfig' | 'visConfig'>) => {
    if (styleConfig.sourceConfig && datasetId) {
      styleConfig.sourceConfig.datasetId = datasetId;
    }

    const layerConfig: Pick<LayerSchema, 'type' | 'sourceConfig' | 'visConfig'> = {
      type: visType,
      ...styleConfig,
    };

    onChange(layerConfig);
  });

  // 基础配置表单
  const baseForm = useMemo(() => {
    const form = createForm({
      initialValues: { datasetId, visType },
      effects() {
        // 数据集更新时，同步更新表数据字段
        onFieldValueChange('datasetId', (field) => {
          setDatasetId(field?.value);
        });
        // 可视化类型更新时，同步更新可视化图层表单
        onFieldValueChange('visType', (field) => {
          const type = field.value;
          const defaultVisConfig = appService.getImplementLayer(type)?.defaultVisConfig ?? {};
          const values = {
            sourceConfig: {} as LayerSchema['sourceConfig'],
            visConfig: defaultVisConfig,
          };
          // 更新可视化类型
          setVisType(type);
          // 设置表单默认值
          setInitialValues(values);
        });
      },
    });

    return form;
  }, []);

  return (
    <div className={classNames('li-layer-form', className)}>
      {/* 基础配置，选择数据集和可视化类型 */}
      <Form
        form={baseForm}
        labelCol={8}
        wrapperCol={16}
        colon={false}
        layout="horizontal"
        labelAlign="left"
        wrapperAlign="right"
        feedbackLayout="terse"
      >
        <BaseFormSchemaField sourceList={sourceList} />
      </Form>
      {/* 坐标配置和样式配置 */}
      {implementLayer && (
        <StyleForm
          initialValues={initialValues}
          implementLayer={implementLayer}
          datasetFields={datasetFields}
          onChange={handleFormValuesChange}
        />
      )}
    </div>
  );
};

export default LayerForm;

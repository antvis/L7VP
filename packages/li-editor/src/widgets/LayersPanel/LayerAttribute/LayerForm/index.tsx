import type { LayerSchema } from '@antv/li-sdk';
import { getDatasetFields } from '@antv/li-sdk';
import { Form } from '@formily/antd-v5';
import { createForm, onFieldValueChange } from '@formily/core';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import { max, min, pick } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { useEditorDataset, useEditorService, useEditorState, usePrefixCls } from '../../../../hooks';
import BaseFormSchemaField from '../BaseFormSchemaField';
import StyleForm from './StyleForm';
import useStyle from './style';

export type LayerFormValue = Pick<LayerSchema, 'type' | 'sourceConfig' | 'visConfig'>;
type LayerStyleFormValue = Pick<LayerSchema, 'sourceConfig' | 'visConfig'>;

type LayerFormProps = {
  className?: string;
  config: LayerSchema;
  onChange: (config: LayerFormValue) => void;
};

const LayerForm: React.FC<LayerFormProps> = ({ className, config, onChange }) => {
  const prefixCls = usePrefixCls('layer-form');
  const styles = useStyle();
  const { state } = useEditorState();
  const [visType, setVisType] = useState(config.type);
  const [datasetId, setDatasetId] = useState(config.sourceConfig.datasetId);
  const editorDataset = useEditorDataset(datasetId);
  const columns = useMemo(() => (editorDataset ? editorDataset.columns : []), [editorDataset]);

  const [initialStyleValue, setInitialStyleValue] = useState<LayerStyleFormValue>(
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

  // TODO: 从 editorDataset 获取数据
  const datasetFieldList = useMemo(() => {
    return datasetFields.map((item) => {
      const itemValue = editorDataset?.data.map((_item) => _item[item.value]) || [];
      const domain = item.type === 'number' ? [min(itemValue), max(itemValue)] : [...new Set(itemValue)];

      return { ...item, domain };
    });
  }, [datasetFields, editorDataset?.data]);

  const onFormValuesChange = (visType_: string, datasetId_: string, styleConfig: LayerStyleFormValue) => {
    if (styleConfig.sourceConfig && datasetId_) {
      styleConfig.sourceConfig.datasetId = datasetId_;
    }

    const layerConfig: LayerFormValue = {
      type: visType_,
      ...styleConfig,
    };

    onChange(layerConfig);
  };

  const handleVisTypeChange = useMemoizedFn((type: string) => {
    const defaultVisConfig = appService.getImplementLayerDefaultVis(type);
    const _initialStyleValue: LayerStyleFormValue = {
      sourceConfig: { datasetId },
      visConfig: defaultVisConfig,
    };

    // 更新可视化类型
    setVisType(type);
    // 设置表单默认值
    setInitialStyleValue(_initialStyleValue);
  });

  const handleStyleFormValuesChange = useMemoizedFn((styleConfig: LayerStyleFormValue) => {
    onFormValuesChange(visType, datasetId, styleConfig);
  });

  // 基础配置表单
  const baseForm = useMemo(() => {
    const form = createForm({
      initialValues: { datasetId, visType },
      effects() {
        // 数据集更新时，同步更新表数据字段
        onFieldValueChange('datasetId', (field) => {
          const id = field?.value;
          setDatasetId(id);
        });
        // 可视化类型更新时，同步更新可视化图层表单
        onFieldValueChange('visType', (field) => {
          const type = field.value;
          handleVisTypeChange(type);
        });
      },
    });

    return form;
  }, []);

  return (
    <div className={classNames(prefixCls, styles.layerForm, className)}>
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
          initialValues={initialStyleValue}
          implementLayer={implementLayer}
          datasetFields={datasetFieldList}
          onChange={handleStyleFormValuesChange}
        />
      )}
    </div>
  );
};

export default LayerForm;

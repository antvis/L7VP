import { PlusOutlined } from '@ant-design/icons';
import type { LocalDatasetSchema, RemoteDatasetSchema } from '@antv/li-sdk';
import { isLocalOrRemoteDatasetSchema } from '@antv/li-sdk';
import { Button, Empty, Popover, Select } from 'antd';
import classNames from 'classnames';
import { isEmpty, isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { useEditorState } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';
import PreviewDataset from '../DatasetsPanel/PreviewDataset';
import FilterCard from './FilterCard';
import './FiltersPanel.less';

type LocalOrRemoteDatasetSchema = LocalDatasetSchema | RemoteDatasetSchema;

interface FiltersPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const FiltersPanel: React.FC<FiltersPanelProps> = (props: FiltersPanelProps) => {
  const { className } = props;
  const { state, updateState } = useEditorState();

  const [addFilterPanelOpen, setFilterPanelOpen] = useState(false);

  const { datasetOptions, filteredDatasets } = useMemo(() => {
    const datasets = state.datasets.filter((item): item is LocalOrRemoteDatasetSchema =>
      isLocalOrRemoteDatasetSchema(item),
    );
    return {
      datasetOptions: datasets.map((item) => ({ value: item.id, label: item.metadata.name })),
      filteredDatasets: datasets.filter((item) => !isUndefined(item?.filter)).map(({ id }) => id),
    };
  }, [state.datasets]);
  const selectedDatasets = filteredDatasets;

  const [previewdatasetId, setPreviewDatasetId] = useState<string>('');
  const [previewDatasetVisible, setPreviewDatasetVisible] = useState(false);

  const onAddDatasetFilter = (datasetId: string) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1)
        (draft.datasets[index] as LocalOrRemoteDatasetSchema).filter = { relation: 'AND', children: [] };
    });
  };

  const onDatasetIdChange = (datasetId: string, newId: string) => {
    updateState((draft) => {
      const datasetIndex = draft.datasets.findIndex((item) => item.id === datasetId);
      if (datasetIndex !== -1) {
        const dataset = draft.datasets[datasetIndex] as LocalOrRemoteDatasetSchema;
        dataset.filter = undefined;
      }

      const newDatasetIndex = draft.datasets.findIndex((item) => item.id === newId);
      if (newDatasetIndex !== -1) {
        const dataset = draft.datasets[newDatasetIndex] as LocalOrRemoteDatasetSchema;
        dataset.filter = { relation: 'AND', children: [] };
      }
    });
  };

  const onClearDatasetFilter = (datasetId: string) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) (draft.datasets[index] as LocalDatasetSchema | RemoteDatasetSchema).filter = undefined;
    });
  };

  const AddFilter = (
    <div className="li-filters-panel__add-filter">
      <span>筛选器({filteredDatasets.length})</span>
      <Popover
        placement="bottomRight"
        destroyTooltipOnHide
        open={addFilterPanelOpen}
        onOpenChange={(open) => setFilterPanelOpen(open)}
        content={
          <Select
            showSearch
            placeholder="请选择数据集"
            style={{ width: 200 }}
            options={datasetOptions.map((item) => ({
              ...item,
              disabled: filteredDatasets.includes(item.value),
            }))}
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            onSelect={onAddDatasetFilter}
          />
        }
        arrow={false}
      >
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setFilterPanelOpen(true);
          }}
        >
          新增筛选器
        </Button>
      </Popover>
    </div>
  );

  return (
    <div className={classNames('li-filters-panel', className)}>
      <div className="li-filters-panel__header">筛选</div>
      {AddFilter}
      <div className="li-filters-panel__filter-list">
        {isEmpty(filteredDatasets) ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据，请先添加筛选器" />
        ) : (
          filteredDatasets.map((id) => {
            return (
              <FilterCard
                key={id}
                id={id}
                selectedDatasets={selectedDatasets}
                datasetOptions={datasetOptions}
                onDatasetIdChange={(newId) => onDatasetIdChange(id, newId)}
                onDel={() => onClearDatasetFilter(id)}
              />
            );
          })
        )}
      </div>

      {previewDatasetVisible && (
        <PreviewDataset
          visible={previewDatasetVisible}
          onClose={() => setPreviewDatasetVisible(false)}
          datasetId={previewdatasetId}
        />
      )}
    </div>
  );
};

export default FiltersPanel;

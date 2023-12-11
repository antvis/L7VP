import { PlusOutlined } from '@ant-design/icons';
import type { LocalDataset, RemoteDataset } from '@antv/li-sdk';
import { isLocalOrRemoteDataset, useDatasetList } from '@antv/li-sdk';
import { Button } from 'antd';
import classNames from 'classnames';
import { isEmpty, isUndefined, uniqueId } from 'lodash-es';
import React, { useState } from 'react';
import FilterCard, { UNSELECTED_DATASET_ID } from './FilterCard';
import './index.less';
import type { Properties } from '../registerForm';

const CLS_PREFIX = 'li-analysis-filter-widget';

const FilterWidget = (props: Properties) => {
  const { showAddFilter, showDeleteFilter, showFilterRelation } = props;
  const [dataSourcesList] = useDatasetList();
  const datasets = dataSourcesList.filter((item): item is LocalDataset | RemoteDataset => isLocalOrRemoteDataset(item));
  const datasetOptions = datasets.map((item) => ({ id: item.id, name: item.metadata.name }));

  const [filterWidget, setfilterWidget] = useState<string[]>(() => {
    const _datasets = datasets.filter((item) => !isUndefined(item?.filter));
    if (_datasets.length === 0) {
      return [uniqueId(UNSELECTED_DATASET_ID)];
    }
    return _datasets.map(({ id }) => id);
  });

  const selectedDatasets = datasets.filter((item) => !isUndefined(item?.filter)).map(({ id }) => id);

  return (
    <div className={`${CLS_PREFIX}`}>
      {filterWidget.map((id) => {
        return (
          <FilterCard
            key={id}
            id={id}
            showDeleteFilter={showDeleteFilter}
            showAddFilter={showAddFilter}
            showFilterRelation={showFilterRelation}
            selectedDatasets={selectedDatasets}
            datasetOptions={datasetOptions}
            onDel={() => {
              setfilterWidget(filterWidget.filter((filtrtid) => filtrtid !== id));
            }}
          />
        );
      })}

      {showAddFilter && (
        <div
          className={classNames(`${CLS_PREFIX}__add-filter`, {
            [`${CLS_PREFIX}__add-filter_opcity`]: filterWidget.length === 0,
          })}
        >
          <Button
            block
            size="small"
            disabled={isEmpty(datasets)}
            icon={<PlusOutlined />}
            onClick={() => {
              setfilterWidget([...filterWidget, uniqueId(UNSELECTED_DATASET_ID)]);
            }}
          >
            新增过滤器
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterWidget;

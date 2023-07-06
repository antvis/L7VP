import type { ImplementWidgetProps } from '@antv/li-sdk';
import { isLocalOrRemoteDataset, useDataset } from '@antv/li-sdk';
import React from 'react';
import type { Properties } from './registerForm';

export interface DataseInforProps extends ImplementWidgetProps, Properties {}

const DataseInfor: React.FC<DataseInforProps> = (props) => {
  const { datasetId } = props;
  const [dataset] = useDataset(datasetId);

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {JSON.stringify(
        dataset && isLocalOrRemoteDataset(dataset) ? dataset.data : [],
      )}
    </div>
  );
};

export default DataseInfor;

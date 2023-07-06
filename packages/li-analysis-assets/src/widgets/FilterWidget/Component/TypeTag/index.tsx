import type { DatasetField } from '@antv/li-sdk';
import { DATASET_FIELD_TYPE_MAP } from '@antv/li-sdk';
import { Tag } from 'antd';
import React from 'react';

const TypeTag = ({ type }: Pick<DatasetField, 'type'>) => {
  const { color, value } = DATASET_FIELD_TYPE_MAP[type];

  return <Tag color={color}>{value}</Tag>;
};

export default TypeTag;

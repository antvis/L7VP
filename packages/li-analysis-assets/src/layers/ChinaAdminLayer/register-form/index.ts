import type { ChoroplethLayerStyleAttributeValue } from '@antv/li-p2';
import { choroplethLayerStyleConfigToFlat, choroplethLayerStyleFlatToConfig } from '@antv/li-p2';
import type { LayerRegisterForm, LayerRegisterFormProps, LayerRegisterFormResultType } from '@antv/li-sdk';
import { pick } from 'lodash-es';
import getSchema from './schema';

type ChinaAdminLayerStyleAttributeValue = ChoroplethLayerStyleAttributeValue & {
  showAdminLabel: boolean;
  adminLabelColor: string;
  adminLabelFontSize: number;
  adminLabelStroke: string;
  adminLabelStrokeWidth: number;
  showNationalBorders: boolean;
  nationalBorderColor: string;
  coastBorderColor: string;
};

/**
 * 表单数据格式转换，将结构化数据转换为表单的平铺结构
 */
const toValues = (config: LayerRegisterFormResultType<ChinaAdminLayerStyleAttributeValue>) => {
  const { sourceConfig, visConfig } = config;
  const { countryAdConfig } = sourceConfig;
  const {
    showAdminLabel,
    adminLabelColor,
    adminLabelFontSize,
    adminLabelStroke,
    adminLabelStrokeWidth,
    showNationalBorders,
    nationalBorderColor,
    coastBorderColor,
  } = visConfig;

  return {
    ...countryAdConfig,
    showAdminLabel,
    adminLabelColor,
    adminLabelFontSize,
    adminLabelStroke,
    adminLabelStrokeWidth,
    showNationalBorders,
    nationalBorderColor,
    coastBorderColor,
    ...choroplethLayerStyleConfigToFlat(visConfig),
  };
};

/**
 * 表单数据格式转换，将表单的平铺数据结构转为结构化数据
 */
const fromValues = (values: Record<string, any>): LayerRegisterFormResultType<ChinaAdminLayerStyleAttributeValue> => {
  const sourceConfig = {
    countryAdConfig: {
      countryGranularity: values.countryGranularity,
      countryAdType: values.countryAdType,
      countryAdField: values.countryAdField,
    },
  };
  const visConfig = choroplethLayerStyleFlatToConfig(values);
  const adminLabelStyle = pick(values, [
    'showAdminLabel',
    'adminLabelColor',
    'adminLabelFontSize',
    'adminLabelStroke',
    'adminLabelStrokeWidth',
  ]);
  const showNationalStyle = pick(values, ['showNationalBorders', 'coastBorderColor', 'nationalBorderColor']);

  return {
    sourceConfig,
    visConfig: {
      ...visConfig,
      ...adminLabelStyle,
      ...showNationalStyle,
    },
  };
};

export default (props: LayerRegisterFormProps): LayerRegisterForm<ChinaAdminLayerStyleAttributeValue> => {
  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = getSchema(props.datasetFields);
  return {
    schema,
    toValues,
    fromValues,
  };
};

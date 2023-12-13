import type { SchemaProperties } from '@formily/json-schema';
import { isUndefined, max, min } from 'lodash-es';
import { DATASET_FIELD_TYPE_MAP } from '../constants';
import type { DatasetField, WidgetSchema } from '../specs';
import type { DatasetFieldWithMeta, WidgetRegisterFormProps } from '../types';
import { isLocalOrRemoteDataset } from './dataset';

/**
 * 获取筛选的原子组件，用于容器组件多插槽情况，筛选已经选择的原子组件
 */
export const getFilterAtomWidgets = (atomWidgets: WidgetSchema[], containerId: string, containerSlot: string) => {
  const widgets = atomWidgets.filter(
    (widget) => !(widget.container && widget.container.id === containerId && widget.container.slot !== containerSlot),
  );

  return widgets;
};

/**
 * 获取容器组件的插槽 formily 的 Schema 配置
 */
export const getWidgetSlotFormSchema = (
  props: WidgetRegisterFormProps,
  slotName: string,
  slotTitle: string,
): SchemaProperties<any, any, any, any, any, any, any, any> => {
  const atomWidgets = getFilterAtomWidgets(props.atomWidgets, props.widgetId, slotName).map((item) => ({
    label: item.metadata.name,
    value: item.id,
  }));

  return {
    [`slots.${slotName}`]: {
      type: 'string',
      title: slotTitle,
      required: false,
      enum: atomWidgets,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择子组件',
        mode: 'multiple',
      },
      'x-decorator-props': {
        tooltip: '请选择挂载的子组件',
      },
    },
  };
};

/**
 *  获取数据集列字段带有元数据信息
 */
export const getDatasetFields = (columns: DatasetField[]) => {
  const fieldList: DatasetFieldWithMeta[] = columns.map((item) => {
    const { color: typeColor, value: typeName } = DATASET_FIELD_TYPE_MAP[item.type];
    return { ...item, label: item.name, value: item.name, type: item.type, typeName, typeColor };
  });
  return fieldList;
};

/**
 * 获取选择数据源下拉框的 formily 的 Schema 配置
 */
export const getDatasetSelectFormSchema = (
  props: WidgetRegisterFormProps,
  name = 'datasetId',
  title = '关联的数据源',
  isRequired = true,
): SchemaProperties<any, any, any, any, any, any, any, any> => {
  const datasetOptions = props.datasets.map((dataset) => {
    let _columns = getDatasetFields(isLocalOrRemoteDataset(dataset) ? dataset.columns : []);

    // @ts-ignore
    if (dataset?.data && dataset.data.length) {
      const cloumss = _columns.map((item) => {
        // @ts-ignore
        const itemValue = dataset.data.map((_item: any) => _item[item.value]) || [];
        const domain = item.type === 'number' ? [min(itemValue), max(itemValue)] : [...new Set(itemValue)];

        return { ...item, domain };
      });

      _columns = cloumss;
    }

    return {
      label: dataset.metadata.name,
      value: dataset.id,
      columns: _columns,
    };
  });

  return {
    [name]: {
      type: 'string',
      title: title,
      required: isRequired,
      enum: datasetOptions,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择数据源',
      },
      'x-decorator-props': {
        tooltip: '请选择关联的数据集作为数据源',
      },
    },
  };
};

/**
 * 获取选择服务资产下拉框的 formily 的 Schema 配置
 */
export const getServiceSelectFormSchema = (
  props: WidgetRegisterFormProps,
  name = 'serviceName',
  title = '关联的服务',
  isRequired = true,
  pickServiceCategory: string[] = [],
): SchemaProperties<any, any, any, any, any, any, any, any> => {
  const serviceOptions = props.services
    .filter(
      (service) =>
        service.metadata.type !== 'Dataset' &&
        (isUndefined(service.metadata.category) ||
          pickServiceCategory.length === 0 ||
          pickServiceCategory.includes(service.metadata.category)),
    )
    .map((service) => {
      return {
        label: service.metadata.displayName,
        value: service.metadata.name,
        metadata: service.metadata,
      };
    });

  return {
    [name]: {
      type: 'string',
      title: title,
      required: isRequired,
      enum: serviceOptions,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择服务',
      },
      'x-decorator-props': {
        tooltip: '请选择关联的服务资产',
      },
    },
  };
};

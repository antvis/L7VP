import type { Dataset, ImplementWidget, WidgetSchema } from '@antv/li-sdk';
import classNames from 'classnames';
import { forOwn, max, min, omit } from 'lodash-es';
import React, { useCallback, useMemo } from 'react';
import { AtomWidgetEmptyContainer } from '../../../constants';
import { useEditorDatasets, useEditorService, useEditorState } from '../../../hooks';
import { useWidgets } from './useWidgets';
import WidgetForm from './WidgetForm';

type WidgetAttributeProps = {
  className?: string;
  widgetSchema: WidgetSchema;
  implementWidget: ImplementWidget;
};

const WidgetAttribute: React.FC<WidgetAttributeProps> = (props) => {
  const { className, widgetSchema, implementWidget } = props;
  const { state, updateState } = useEditorState();
  const { appService } = useEditorService();

  // 判断依赖组件配置是否发改变，避免 WidgetSchemaField schema 重复生成渲染
  const widgets = useWidgets(state.widgets, widgetSchema.id);

  const initialValues = useMemo(() => {
    const slotMap = appService.getContainerWidgetSlotMap(widgets, widgetSchema.id);
    const values = { ...widgetSchema.properties, slots: { ...slotMap } };
    return values;
  }, [appService, widgetSchema.id, widgetSchema.properties, widgets]);

  const registerForm = implementWidget.registerForm;

  // 原子组件
  const atomWidgets = useMemo(() => appService.getAtomWidgets(widgets, widgetSchema.id), [
    appService,
    widgetSchema.id,
    widgets,
  ]);

  // 数据集列表
  const { editorDatasets } = useEditorDatasets();
  const datasets: Dataset[] = editorDatasets.map((item) => {
    const columns = item.columns.map((cloumn) => {
      const itemValue = item.data.map((_item) => _item[cloumn.name]);
      // TODO: 从 editorDataset 获取数据
      const domain = cloumn.type === 'number' ? [min(itemValue), max(itemValue)] : [...new Set(itemValue)];

      return { ...cloumn, domain };
    });

    return {
      ...item.schema,
      columns: columns,
      data: [],
    };
  });

  // 服务资产列表
  const services = useMemo(() => appService.getImplementServices(), [appService]);

  const registerFormProps = useMemo(() => {
    return { atomWidgets, datasets, layers: state.layers, widgetId: widgetSchema.id, services };
  }, [atomWidgets, datasets, state.layers, widgetSchema.id, services]);

  const handleValuesChange = useCallback((values: Record<string, any>) => {
    // 如果有插槽设置
    if (values.slots) {
      const slots = values.slots as Record<string, string[]>;
      // 更新插槽组件
      updateState((draft) => {
        draft.widgets.forEach((widget) => {
          // 如果已经挂载
          if (widget.container?.id === widgetSchema.id) {
            const slotIdList = slots[widget.container.slot];
            if (slotIdList && slotIdList.find((id) => id === widget.id)) {
              // slotIdList 有，没有变更情况
            } else {
              // slotIdList 没有，删除更新为占位的容器
              widget.container = AtomWidgetEmptyContainer;
            }
          } else {
            // 没有挂载，新增情况
            forOwn(slots, (value, key) => {
              if (value.find((id) => id === widget.id)) {
                widget.container = { id: widgetSchema.id, slot: key };
              }
            });
          }
        });
      });
    }

    // 更新属性
    updateState((draft) => {
      const index = draft.widgets.findIndex((item) => item.id === widgetSchema.id);
      if (index !== -1) {
        // isEqual
        draft.widgets[index].properties = omit(values, 'slots');
      }
    });
  }, []);

  return (
    <div className={classNames(className)}>
      <WidgetForm
        initialValues={initialValues}
        registerForm={registerForm}
        registerFormProps={registerFormProps}
        onChange={handleValuesChange}
      />
    </div>
  );
};

export default WidgetAttribute;

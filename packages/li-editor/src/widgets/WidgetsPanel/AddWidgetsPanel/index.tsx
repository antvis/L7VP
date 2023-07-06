import type { ImplementWidget } from '@antv/li-sdk';
import { Badge, Button, Modal, Tabs, theme } from 'antd';
import { isEmpty } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { WidgetTypeMap } from '../../../constants';
import { useEditorService, useEditorState } from '../../../hooks';
import { getMarketWidgetCategory } from '../../../utils/widget';
import { getWidgetDefaultSchema } from './helper';
import './index.less';
import WidgetList from './WidgetList';

type AddWidgetsPanelProps = {
  className?: string;
  open: boolean;
  onClose: () => void;
};

const { useToken } = theme;

const AddWidgetsPanel: React.FC<AddWidgetsPanelProps> = (props) => {
  const { open, onClose } = props;
  const { state, updateState } = useEditorState();
  const { appService } = useEditorService();
  const [selectedWidgets, setSelectedWidgets] = useState<Record<string, ImplementWidget[]>>({});
  const layoutWidget = useMemo(() => appService.getLayoutWidget(state.widgets), [appService, state.widgets]);
  const implementWidgets = useMemo(() => appService.getImplementWidgets(), [appService]);
  const selectedWidgetsList: ImplementWidget[] = useMemo(() => {
    return Object.values(selectedWidgets).flat();
  }, [selectedWidgets]);
  const { token } = useToken();

  const onAddWidgets = () => {
    const selectedLayoutWidget = selectedWidgetsList.find((widget) => widget.metadata.type === WidgetTypeMap.Layout);
    // 当选中的没有布局组件时，直接添加
    if (selectedLayoutWidget === undefined) {
      const widgetsSchema = selectedWidgetsList.map((widget) => getWidgetDefaultSchema(widget, layoutWidget));
      updateState((draft) => {
        draft.widgets.push(...widgetsSchema);
      });
    } else {
      // 当选中的有布局组件时，需要切换布局组件需要修改 Atom 原子组件挂载逻辑
      const selectedLayoutWidgetSchema = getWidgetDefaultSchema(selectedLayoutWidget);
      const addwidgetsSchema = selectedWidgetsList
        .filter((widget) => widget.metadata.type !== WidgetTypeMap.Layout)
        .map((widget) => getWidgetDefaultSchema(widget, selectedLayoutWidgetSchema));
      const existWidgetsSchema = state.widgets
        .filter((widget) => widget.id !== layoutWidget?.id)
        .map((widget) => {
          // 没有挂载点的原子组件不需要修改
          if (widget.container === undefined) return widget;
          // 当前原子组件挂载的点是布局组件，需要修改父组件的 container
          if (widget.container?.id === layoutWidget?.id) {
            return { ...widget, container: { ...widget.container, id: selectedLayoutWidgetSchema.id } };
          } else {
            // 当前原子组件挂载的点是容器组件，不需要修改父组件的 container
            return widget;
          }
        });
      const widgetsSchema = [selectedLayoutWidgetSchema, ...existWidgetsSchema, ...addwidgetsSchema];

      updateState((draft) => {
        draft.widgets = widgetsSchema;
      });
    }
    onClose();
  };

  const handleSelectedWidgets = (selecteWidgetNameList: string[], key: string) => {
    const selectedImplementWidgets = selecteWidgetNameList.map(
      (widgetName) => appService.getImplementWidget(widgetName)!,
    );

    setSelectedWidgets({
      ...Object.assign(selectedWidgets, {
        [key]: selectedImplementWidgets,
      }),
    });
  };

  const TabItems = useMemo(() => {
    const categoryList = getMarketWidgetCategory(implementWidgets);
    const items = categoryList
      .map((item) => {
        const key = item.category;
        const label = item.categoryName;
        const widgets =
          item.category === WidgetTypeMap.Layout
            ? // 如果是布局组件，需要过滤掉当前布局组件
              item.widgets.filter((widgetName) => widgetName.metadata.name !== layoutWidget?.type)
            : item.widgets;

        if (widgets.length === 0) return null;

        return {
          label: label,
          key: key,
          children: (
            <WidgetList
              widgets={widgets}
              onChange={(selecteWidgetNameList) => handleSelectedWidgets(selecteWidgetNameList, key)}
            />
          ),
        };
      })
      .filter<{ label: string; key: string; children: JSX.Element }>(
        (item): item is { label: string; key: string; children: JSX.Element } => item !== null,
      );

    return items;
  }, [implementWidgets]);

  return (
    <Modal
      title="新增组件"
      className="li-add-widgets-panel"
      width={1100}
      destroyOnClose
      bodyStyle={{ minHeight: '300px' }}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>
          取消
        </Button>,
        <Badge key="submit" color={token.colorPrimary} count={selectedWidgetsList.length}>
          <Button type="primary" onClick={onAddWidgets} disabled={isEmpty(selectedWidgetsList)}>
            添加
          </Button>
        </Badge>,
      ]}
    >
      <Tabs defaultActiveKey="MapControl" items={TabItems} />
    </Modal>
  );
};

export default AddWidgetsPanel;

import { CaretRightOutlined, MoreOutlined } from '@ant-design/icons';
import type { ImplementWidget, WidgetSchema } from '@antv/li-sdk';
import type { CollapseProps, MenuProps } from 'antd';
import { Collapse, Dropdown } from 'antd';
import classNames from 'classnames';
import { isEmpty, isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import WidgetName from '../../../components/EditName';
import { WidgetTypeMap } from '../../../constants';
import { useEditorService, useEditorState } from '../../../hooks';
import WidgetAttribute from '../WidgetAttribute';

type WidgetGroupProps = {
  className?: string;
  item: { category: string; categoryName: string; widgets: ImplementWidget[] };
};

const WidgetGroup: React.FC<WidgetGroupProps> = ({ className, item }) => {
  const { appService } = useEditorService();
  const { state, updateState } = useEditorState();
  const [focusWigetId, setFocusWidgetId] = useState('');
  const [isEditName, setIsEditName] = useState(false);

  const widgets = useMemo(() => {
    const implementWidgetMap = item.widgets.reduce(
      (map, implementWidget) => map.set(implementWidget.metadata.name, implementWidget),
      new Map(),
    );
    return state.widgets.filter((widget) => implementWidgetMap.has(widget.type));
  }, [item.widgets, state.widgets]);

  const deleteWidget = (widget: WidgetSchema) => {
    updateState((draft) => {
      const delDataIndex = draft.widgets.findIndex((_item) => _item.id === widget.id);
      draft.widgets.splice(delDataIndex, 1);
    });
  };

  if (isEmpty(widgets)) {
    return null;
  }

  const panels: CollapseProps['items'] = widgets
    .filter((widget) => {
      const implementWidget = appService.getImplementWidget(widget.type);
      return !isUndefined(implementWidget);
    })
    .map((widget) => {
      const implementWidget = appService.getImplementWidget(widget.type)!;

      const onChangeName = (newName: string) => {
        updateState((draft) => {
          const findIndex = draft.widgets.findIndex((_items) => _items.id === widget.id);
          draft.widgets[findIndex].metadata.name = newName;
          setIsEditName(false);
          setFocusWidgetId('');
        });
      };

      const dropDownItems: MenuProps['items'] = [
        {
          key: 'editWidget',
          label: '修改名称',
          onClick() {
            setIsEditName(true);
          },
        },
      ];

      // 布局组件，禁用删除
      const isLayout = item.category === WidgetTypeMap.Layout;
      if (!isLayout) {
        dropDownItems.push({
          key: 'deleteWidget',
          label: '删除组件',
          onClick() {
            deleteWidget(widget);
          },
        });
      }

      return {
        key: widget.id,
        className: 'li-widget-list__panel',
        label: (
          <WidgetName
            name={widget?.metadata?.name}
            isEdit={focusWigetId === widget.id && isEditName}
            onChange={(newName) => onChangeName(newName)}
            onCancel={() => setIsEditName(false)}
          />
        ),
        extra: (
          <div
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Dropdown
              onOpenChange={(visible) => setFocusWidgetId(visible ? widget.id : '')}
              menu={{ items: dropDownItems }}
            >
              <MoreOutlined />
            </Dropdown>
          </div>
        ),
        children: <WidgetAttribute key={widget.id} widgetSchema={widget} implementWidget={implementWidget} />,
      };
    });

  return (
    <div className={classNames(className, 'li-widget-list__widget-group')}>
      <p className="li-widget-list__widget-group-title">{item.categoryName}</p>
      <Collapse
        defaultActiveKey={[]}
        ghost={true}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        items={panels}
      />
    </div>
  );
};

export default WidgetGroup;

import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { ImplementEditorWidgetProps } from '../../types';
import { usePrefixCls } from '../../hooks';
import AddWidgetsPanel from './AddWidgetsPanel';
import WidgetList from './WidgetList';
import useStyle from './WidgetsPanelStyle';

interface WidgetsPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const { useToken } = theme;

const WidgetsPanel: React.FC<WidgetsPanelProps> = (props) => {
  const prefixCls = usePrefixCls('widgets-panel');
  const styles = useStyle();
  const [visibleAttribute, setVisibleAttribute] = useState(false);
  const [addWidgetsPanelOpen, setAddWidgetsPanelOpen] = useState(false);
  const { token } = useToken();

  const openAddWidgetsPanel = () => {
    setAddWidgetsPanelOpen(true);
  };

  return (
    <div className={classNames(prefixCls, styles.panel, props.className)}>
      <div
        className={classNames(`${prefixCls}__content`, styles.panelContent, {
          [`${prefixCls}__content_hidden`]: visibleAttribute,
          [styles.panelContentHidden]: visibleAttribute,
        })}
      >
        <div className={classNames(`${prefixCls}__header`, styles.panelHeader)}>
          <div className={classNames(`${prefixCls}__title`, styles.panelTitle)}>组件</div>
          <Button
            size="small"
            type="link"
            id="LITourAddAnalysisWidget"
            icon={<AppstoreAddOutlined style={{ color: token.colorPrimary }} className="li-widgets-panel__add-icon" />}
            onClick={openAddWidgetsPanel}
          />
        </div>
        <WidgetList className={classNames(`${prefixCls}__widget-list`, styles.widgetList)} />
      </div>

      {/* {visibleAttribute && <div className={classNames(`${prefixCls}__attribute`, styles.attribute)}>组件配置内容</div>} */}
      {addWidgetsPanelOpen && (
        <AddWidgetsPanel
          open={addWidgetsPanelOpen}
          onClose={() => {
            setAddWidgetsPanelOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default WidgetsPanel;

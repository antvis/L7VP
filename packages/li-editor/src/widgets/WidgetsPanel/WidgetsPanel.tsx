import { AppstoreAddOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import type { ImplementEditorWidgetProps } from '../../types';
import AddWidgetsPanel from './AddWidgetsPanel';
import WidgetList from './WidgetList';
import './WidgetsPanel.less';

interface WidgetsPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const { useToken } = theme;

const WidgetsPanel: React.FC<WidgetsPanelProps> = (props) => {
  const [visibleAttribute, setVisibleAttribute] = useState(false);
  const [addWidgetsPanelOpen, setAddWidgetsPanelOpen] = useState(false);
  const { token } = useToken();

  const openAddWidgetsPanel = () => {
    setAddWidgetsPanelOpen(true);
  };

  return (
    <div className={classNames('li-widgets-panel', props.className)}>
      <div
        className={classNames('li-widgets-panel__content', {
          'li-widgets-panel__content_hidden': visibleAttribute,
        })}
      >
        <div className="li-widgets-panel__header">
          <div className="li-widgets-panel__title">组件</div>
          <Button
            size="small"
            type="link"
            icon={<AppstoreAddOutlined style={{ color: token.colorPrimary }} className="li-widgets-panel__add-icon" />}
            onClick={openAddWidgetsPanel}
          />
        </div>
        <WidgetList className="li-widgets-panel__widget-list" />
      </div>

      {/* {visibleAttribute && <div className="li-widgets-panel__attribute">组件配置内容</div>} */}
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

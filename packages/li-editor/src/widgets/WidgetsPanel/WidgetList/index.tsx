import { default as classNames } from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
import { useEditorService, usePrefixCls } from '../../../hooks';
import { getMarketWidgetCategory } from '../../../utils/widget';
import useStyle from './style';
import WidgetGroup from './WidgetGroup';

type WidgetListProps = {
  className?: string;
};

const WidgetList: React.FC<WidgetListProps> = (props) => {
  const prefixCls = usePrefixCls('widget-list');
  const styles = useStyle();
  const { appService } = useEditorService();
  const implementWidgets = useMemo(() => appService.getImplementWidgets(), [appService]);

  const WidgetGroupList = useMemo(() => {
    const categoryList = getMarketWidgetCategory(implementWidgets);

    if (isEmpty(categoryList)) {
      return null;
    }

    return categoryList.map((item) => {
      return <WidgetGroup key={item.category} item={item} />;
    });
  }, [implementWidgets]);

  return <div className={classNames(prefixCls, styles.widgetList, props.className)}>{WidgetGroupList}</div>;
};

export default WidgetList;

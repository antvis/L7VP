import { default as classNames } from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
import { useEditorService } from '../../../hooks';
import { getMarketWidgetCategory } from '../../../utils/widget';
import './index.less';
import WidgetGroup from './WidgetGroup';

type WidgetListProps = {
  className?: string;
};

const WidgetList: React.FC<WidgetListProps> = (props) => {
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

  return <div className={classNames('li-widget-list', props.className)}>{WidgetGroupList}</div>;
};

export default WidgetList;

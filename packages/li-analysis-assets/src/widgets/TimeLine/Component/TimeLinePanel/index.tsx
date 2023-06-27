import { ClockCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { CLS_PREFIX } from '../constants';
import TimeLineAnimation from '../TimeLineAnimation';
import { TimeLineChart } from '../TimeLineChart';
import { getFormatData, getFormatDefaultSelection, getInitTimeRange, getTimeFormat } from './helper';
import useStyle from './style';
import type { Selection } from './types';

const getDataTimes = (
  orignalData: Record<string, any>[],
  field: string,
  isTimeXField: boolean,
  dateGranularity: string,
) => {
  const data = getFormatData(orignalData, field, isTimeXField, dateGranularity);
  const line: string[] = data.map((item) => item[field]);
  const times = [...new Set(line)];

  return { data, times };
};

type Props = {
  field: string;
  dateGranularity: string;
  onClose: () => void;
  isTimeXField: boolean;
  data: Record<string, any>[];
  defaultSelection?: Selection;
  onChangeTimeRange: (val: Selection) => void;
  onClear: () => void;
};

const TimeLinePanel: React.FC<Props> = (props) => {
  const {
    field,
    dateGranularity,
    onClose,
    data: orignalData,
    isTimeXField,
    defaultSelection,
    onChangeTimeRange,
    onClear,
  } = props;
  const styles = useStyle();

  const formatedDefaultSelection =
    defaultSelection && getFormatDefaultSelection(defaultSelection, isTimeXField, dateGranularity);

  const [dataTimes, setDataTimes] = useState(() => getDataTimes(orignalData, field, isTimeXField, dateGranularity));

  const [initSelection, setInitSelection] = useState<Selection>(
    () => formatedDefaultSelection || getInitTimeRange(dataTimes.times),
  );
  // 当前选中区间
  const [currentSelectedRange, setCurrentSelectedRange] = useState<Selection | undefined>(formatedDefaultSelection);
  // 同步图标选中区间
  const [chartSelectedRange, setChartSelectedRange] = useState<Selection | undefined>(formatedDefaultSelection);

  // 当数据源发生更新变化时（配置状态切换数据源和时间字段）
  useUpdateEffect(() => {
    const _dataTimes = getDataTimes(orignalData, field, isTimeXField, dateGranularity);
    // 重置选中区间
    const initTimeRange = formatedDefaultSelection || getInitTimeRange(_dataTimes.times);
    setDataTimes(_dataTimes);
    setInitSelection(initTimeRange);
    setCurrentSelectedRange(formatedDefaultSelection);
    setChartSelectedRange(formatedDefaultSelection);
  }, [orignalData, field, isTimeXField, dateGranularity]);

  const selectionTime = useMemo(() => {
    if (currentSelectedRange) {
      return `${currentSelectedRange[0]} 至 ${currentSelectedRange[1]}`;
    }

    return `${dataTimes.times[0]} 至 ${dataTimes.times[1]}`;
  }, [currentSelectedRange, dataTimes.times]);

  // 移动框选事件
  const onSelection = (start: string, end: string) => {
    if (start && end) {
      setCurrentSelectedRange([start, end]);
      setInitSelection([start, end]);
      onChangeTimeRange(getTimeFormat([start, end], dateGranularity));
    }
  };

  const onSelectionAnimation = (val: Selection) => {
    setCurrentSelectedRange(val);
    setChartSelectedRange(val);
    onChangeTimeRange(getTimeFormat(val, dateGranularity));
  };

  // 图表取消高亮事件
  const onChartReset = () => {
    // 删除筛选条件
    onClear();
    setCurrentSelectedRange(undefined);
  };

  // 按钮控制取消高亮事件
  const onReset = () => {
    onChartReset();
    setChartSelectedRange([-Infinity, Infinity]);
  };

  return (
    <div className={classNames(`${CLS_PREFIX}__content`, styles.content)}>
      <div className={classNames(`${CLS_PREFIX}__content__header`, styles.contentHeader)}>
        <div className={classNames(`${CLS_PREFIX}__content__header__field`, styles.contentHeaderField)}>
          <ClockCircleOutlined />
          {field}
        </div>
        <div className={classNames(`${CLS_PREFIX}__content__header__time`, styles.contentHeaderTime)}>
          <span>{selectionTime}</span>
        </div>
        <div className={classNames(`${CLS_PREFIX}__content__header__btn`, styles.contentHeaderBtn)}>
          <CloseOutlined onClick={onClose} />
        </div>
      </div>

      <TimeLineChart
        className={classNames(`${CLS_PREFIX}__chart`, styles.chart)}
        data={dataTimes.data}
        xField={field}
        isTimeXField={isTimeXField}
        selection={chartSelectedRange}
        onSelection={onSelection}
        onReset={onChartReset}
      />

      <TimeLineAnimation
        className={classNames(`${CLS_PREFIX}__animation`, styles.contentBtn)}
        timeLine={dataTimes.times}
        selection={currentSelectedRange}
        initialSelection={initSelection}
        setSelection={onSelectionAnimation}
        onReset={onReset}
      />
    </div>
  );
};

export default TimeLinePanel;

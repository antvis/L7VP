import {
  BoxPlotOutlined,
  CaretRightOutlined,
  ColumnWidthOutlined,
  ForwardOutlined,
  PauseOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { Button, Popover, Radio, Space } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import type { Selection } from '../TimeLinePanel/types';
import { playbackSpeedList, timeWindowList } from './constants';
import { getTimeInterval } from './helper';
import useStyle from './style';
import type { Speed, TimeWindowType } from './type';

const CLS_PREFIX = 'li-analysis-time-line-panel-animation';

type Props = {
  className?: string;
  timeLine: string[];
  initialSelection: Selection;
  selection?: Selection; // 选择时间区间
  setSelection: (val: Selection) => void; // 设置选中区间值
  onReset?: () => void;
};

const TimeLineAnimation: React.FC<Props> = (props) => {
  const { className, setSelection, selection, timeLine, initialSelection, onReset } = props;
  const styles = useStyle();
  const [timeWindowType, setTimeWindowType] = useState<TimeWindowType>('cumulativeTime');
  const [speed, setSpeed] = useState<Speed>(1);
  const [isAnimation, setIsAnimation] = useState(false);
  const timer = useRef<number | null>(null);

  // 动画播放操作
  const timerAnimation = (val: {
    speed: Speed;
    timeWindowType: TimeWindowType;
    selection: Selection;
    playback?: boolean;
  }) => {
    if (timer.current) {
      window.cancelAnimationFrame(timer.current);
      timer.current = null;
    }
    const { speed = 1, timeWindowType, selection, playback } = val;

    if (speed > 0) {
      //  延迟时间  const delay = (BASE_SPEED * (1000 / FPS)) / steps.length / (speed || 1);
      const delay = (600 * (1000 / 60)) / 100 / (speed || 1);
      let _startTime = new Date().getTime();

      const loop = () => {
        const current = new Date().getTime();
        const delta = current - _startTime;

        if (delta >= delay) {
          _startTime = new Date().getTime();
          const timeIntervals = getTimeInterval(timeLine, selection, timeWindowType, playback);
          if (timeIntervals) {
            setSelection(timeIntervals);
          }
        } else {
          timer.current = window.requestAnimationFrame(loop);
        }
      };

      timer.current = window.requestAnimationFrame(loop);
    }
  };

  const onTimeWindowChange = (e: TimeWindowType) => {
    setTimeWindowType(e);
    if (isAnimation && selection) {
      timerAnimation({ speed, timeWindowType: e, selection });
    }
  };

  const onplaybackSpeedChange = (e: Speed) => {
    setSpeed(e);
    if (isAnimation && selection) {
      timerAnimation({ speed: e, timeWindowType, selection });
    }
  };

  // 动画播放操作
  const onIsAnimationChange = () => {
    let _selection = selection;

    setIsAnimation(!isAnimation);

    // 开始播放
    if (!isAnimation) {
      // 没有选中区间，从头开始播放
      if (!_selection) _selection = initialSelection;
      timerAnimation({ speed, timeWindowType, selection: _selection });
    } else {
      // 暂停播放
      if (timer.current) {
        window.cancelAnimationFrame(timer.current);
        timer.current = null;
      }
    }
  };

  // 动画还原操作
  const playbackRestoration = () => {
    if (isAnimation && selection) {
      timerAnimation({ speed, timeWindowType, selection, playback: true });
    } else {
      setSelection(initialSelection);
    }
  };

  // 取消选中
  const onCancelSelected = () => {
    if (onReset) onReset();
    if (isAnimation) {
      onIsAnimationChange();
    }
  };

  useEffect(() => {
    if (isAnimation && selection) {
      timerAnimation({ speed, timeWindowType, selection });
    }
  }, [selection]);

  const TimeWindow = (
    <Radio.Group onChange={(e) => onTimeWindowChange(e.target.value)} value={timeWindowType}>
      <Space direction="vertical">
        {timeWindowList.map((item) => {
          return (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );

  const PlaybackSpeed = (
    <Radio.Group onChange={(e) => onplaybackSpeedChange(e.target.value)} value={speed}>
      <Space direction="vertical">
        {playbackSpeedList.map((item) => {
          return (
            <Radio key={item.value} value={item.value}>
              {item.label}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );

  const disabledPlay = isEmpty(selection) && isEmpty(initialSelection);

  return (
    <div className={className}>
      <Popover content={TimeWindow} overlayStyle={{ width: 150, padding: 0 }}>
        <div className={classNames(`${CLS_PREFIX}__btn-item`, styles.contentBtnItem)}>
          <ColumnWidthOutlined />
        </div>
      </Popover>
      <Popover content={PlaybackSpeed} overlayStyle={{ width: 70, padding: 0 }}>
        <div className={classNames(`${CLS_PREFIX}__btn-item`, styles.contentBtnItem)}>
          <ForwardOutlined />
        </div>
      </Popover>
      <div className={classNames(`${CLS_PREFIX}__btn-item`, styles.contentBtnItem)}>
        <Button
          type="link"
          onClick={onIsAnimationChange}
          className={classNames(`${CLS_PREFIX}__btn-item_active`, { [styles.contentBtnItemActive]: disabledPlay })}
          disabled={disabledPlay}
        >
          {isAnimation ? <PauseOutlined /> : <CaretRightOutlined />}
        </Button>
      </div>
      <div className={classNames(`${CLS_PREFIX}__btn-item`, styles.contentBtnItem)}>
        <Button type="link" onClick={playbackRestoration}>
          <ReloadOutlined />
        </Button>
      </div>
      <div className={classNames(`${CLS_PREFIX}__btn-item`, styles.contentBtnItem)}>
        <Button
          type="link"
          disabled={!selection}
          className={classNames(`${CLS_PREFIX}__btn-item_active`, { [styles.contentBtnItemActive]: !selection })}
          onClick={onCancelSelected}
        >
          <BoxPlotOutlined />
        </Button>
      </div>
    </div>
  );
};

export default TimeLineAnimation;

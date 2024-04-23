import Icon, { ArrowRightOutlined } from '@ant-design/icons';
import { useEditorState } from '@antv/li-editor';
import { useLocalStorageState } from 'ahooks';
import type { TourProps } from 'antd';
import { Button, Checkbox, Popover, Space, Tour } from 'antd';
import cls from 'classnames';
import { isNumber } from 'lodash-es';
import { useEffect, useState } from 'react';
import { usePrefixCls } from '../../hooks';
import { DefaultSteps, NoviceTourSvg, TourSteps } from './constants';
import useStyle from './NoviceTourStyles';
import type { Steps } from './types';

const LI_VNOVICE_TOUR_TIME = '_LI_VNOVICE_TOUR_TIME';
const MAX_TOUR_TIME = 2;

const NoviceTour = () => {
  const prefixCls = usePrefixCls('editor-novice-tour');
  const styles = useStyle();
  const { updateState } = useEditorState();
  const [steps, setSteps] = useState(DefaultSteps);
  const [tourOpen, setTourOpen] = useState(true);
  const [showTour, setShowTour] = useState(true);
  const [closeNoviceTour, setCloseNoviceTour] = useState(false);
  const [nextOpenNoviceTour, setNextOpenNoviceTour] = useState(false);
  const [vnoviceTourTime, setVnoviceTourTime] = useLocalStorageState<number>(LI_VNOVICE_TOUR_TIME, {
    defaultValue: 0,
  });
  const [tourPopoverOpen, setTourPopoverOpen] = useState(true);

  useEffect(() => {
    if (!isNumber(vnoviceTourTime)) return;
    if (vnoviceTourTime > MAX_TOUR_TIME) return;
    setVnoviceTourTime(vnoviceTourTime + 1);
  }, []);

  if (isNumber(vnoviceTourTime) && vnoviceTourTime > MAX_TOUR_TIME && showTour) {
    return null;
  }

  const handleStartUse = () => {
    updateState((draft) => {
      draft.activeNavMenuKey = steps[0].menu;
      if (draft.collapsed) {
        draft.collapsed = false;
      }
      // TODO: 如果当前没有数据集，默认打开添加数据集弹窗，引导用户添加数据
    });
  };

  const getSteps = (key: number, type: 'pre' | 'next' | 'now', steps: Steps[]) => {
    switch (type) {
      case 'pre':
        return steps.map((item) => {
          if (item.key === key) {
            return { ...item, status: 'finish' };
          }

          if (item.key === key - 1) {
            updateState((draft) => {
              draft.activeNavMenuKey = item.menu;
              if (draft.collapsed) {
                draft.collapsed = false;
              }
            });

            return { ...item, status: 'process' };
          }

          return item;
        });
      case 'next':
        return steps.map((item) => {
          if (item.key === key) {
            return { ...item, status: 'finish' };
          }
          if (item.key === key + 1) {
            updateState((draft) => {
              draft.activeNavMenuKey = item.menu;
              if (draft.collapsed) {
                draft.collapsed = false;
              }
            });

            return { ...item, status: 'process' };
          }
          return item;
        });
      case 'now':
      default:
        return steps.map((item) => {
          if (item.key === key) {
            updateState((draft) => {
              draft.activeNavMenuKey = item.menu;
              if (draft.collapsed) {
                draft.collapsed = false;
              }
            });

            return { ...item, status: 'process' };
          } else {
            return {
              ...item,
              status: item.status === 'process' ? 'finish' : item.status,
            };
          }
        });
    }
  };

  const onStepChange = (key: number, type: 'pre' | 'next' | 'now') => {
    const _steps = getSteps(key, type, steps) as Steps[];
    setSteps(_steps);
    setCloseNoviceTour(false);
    setTourOpen(true);
  };

  // 结束引导
  const onFinish = () => {
    const _steps = steps[0];

    updateState((draft) => {
      draft.activeNavMenuKey = _steps.menu;
      if (draft.collapsed) {
        draft.collapsed = false;
      }
    });

    setTourOpen(false);
    setShowTour(false);
    if (nextOpenNoviceTour) {
      // 缓存中记录下次不不开启引导
      setVnoviceTourTime(Number.MAX_SAFE_INTEGER);
    }
  };

  const onTourPopoverChange = () => {
    setTourPopoverOpen(!tourPopoverOpen);
    if (!tourPopoverOpen) {
      const _key = steps.find((item) => item.status === 'process')?.key;
      if (_key) {
        onStepChange(_key, 'now');
      }
    } else {
      setTourOpen(false);
    }
  };

  const _tourSteps = TourSteps.map((item, index) => {
    return {
      ...item,
      prevButtonProps: {
        onClick: () => {
          onStepChange(steps[index].key, 'pre');
        },
      },
      nextButtonProps: {
        children: index + 1 === TourSteps.length ? '开始使用' : '下一步',
        onClick: () => {
          if (index !== steps.length - 1) {
            onStepChange(steps[index].key, 'next');
          } else {
            // 开始使用，最后一步回到上传数据
            handleStartUse();
          }
        },
      },
    };
  });

  const TourContent = (
    <div className={cls(`${prefixCls}__tour-content`, styles.tourContent)}>
      {closeNoviceTour ? (
        <>
          <div className={cls(`${prefixCls}__tour-content__header`, styles.tourContentHeader)}>跳过分析操作引导？</div>
          <div className={cls(`${prefixCls}__tour-content__clear-btn`, styles.clearBtn)}>
            <Space>
              <Button type="primary" size="small" onClick={() => onFinish()}>
                开始使用
              </Button>
              <Button size="small" onClick={() => setCloseNoviceTour(false)}>
                取消
              </Button>
            </Space>
          </div>

          <div className={cls(`${prefixCls}__tour-content__no-tour`, styles.noTour)}>
            <Checkbox
              onChange={() => setNextOpenNoviceTour(!nextOpenNoviceTour)}
              className={cls(`${prefixCls}__tour-content__no-tour`, styles.noTour)}
            >
              以后不需要操作引导
            </Checkbox>
          </div>
        </>
      ) : (
        <>
          <div className={cls(`${prefixCls}__tour-content__header`, styles.tourContentHeader)}>请开始分析操作吧</div>
          <div className={cls(`${prefixCls}__tour-content__menu`, styles.tourContentMenu)}>
            {steps.map((item: Steps) => (
              <div
                key={item.key}
                className={cls(
                  `${prefixCls}__tour-content__menu__item`,
                  styles.tourContentMenuItem,
                  ['process'].includes(item.status) && `${prefixCls}__tour-content__menu__item_selected`,
                  ['process'].includes(item.status) && styles.tourContentMenuItemSelected,
                )}
              >
                <div
                  className={cls(`${prefixCls}__tour-content__menu__item-header`, styles.tourContentMenuItemHeader)}
                  onClick={() => onStepChange(item.key, 'now')}
                >
                  <div
                    className={cls(
                      `${prefixCls}__tour-content__menu__item-header-index`,
                      styles.tourContentMenuItemHeaderIndex,
                      ['process', 'finish'].includes(item.status) &&
                        `${prefixCls}__tour-content__menu__item-header-index_selected`,
                      ['process', 'finish'].includes(item.status) && styles.tourContentMenuItemHeaderIndexSelected,
                    )}
                  >
                    {item.key}
                  </div>
                  <div
                    className={cls(
                      `${prefixCls}__tour-content__menu__item-header-title`,
                      ['process', 'finish'].includes(item.status) &&
                        `${prefixCls}__tour-content__menu__item-header-title_selected`,
                    )}
                  >
                    {item.title}
                  </div>
                </div>
                {item.status === 'process' && item.key !== 4 && (
                  <div
                    className={cls(`${prefixCls}__tour-content__menu__item-next`, styles.tourContentMenuItemNext)}
                    onClick={() => onStepChange(item.key, 'next')}
                  >
                    <ArrowRightOutlined />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div
            className={cls(`${prefixCls}__tour-content__btn`, styles.tourContentBtn)}
            onClick={() => setCloseNoviceTour(true)}
          >
            跳过引导
          </div>
        </>
      )}

      <Tour
        open={tourOpen}
        current={steps.findIndex((item) => item.status === 'process')}
        onClose={() => setTourOpen(false)}
        steps={_tourSteps as TourProps['steps']}
        rootClassName={cls(`${prefixCls}__tour-content__tour`, styles.tourContentTour)}
      />
    </div>
  );

  return (
    showTour && (
      <Popover
        overlayClassName={cls(`${prefixCls}__popover`, styles.tourPopover)}
        placement="topRight"
        open={tourPopoverOpen}
        content={TourContent}
        trigger="click"
        arrow={false}
        destroyTooltipOnHide={true}
      >
        <Button
          className={cls(prefixCls, styles.noviceTour)}
          type="primary"
          icon={<Icon component={NoviceTourSvg} />}
          onClick={onTourPopoverChange}
        >
          操作引导
        </Button>
      </Popover>
    )
  );
};

export default NoviceTour;

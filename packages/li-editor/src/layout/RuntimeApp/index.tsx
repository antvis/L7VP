import type { Application, DatasetSchema, LIRuntimeApp } from '@antv/li-sdk';
import { useLatest, useMemoizedFn, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import type { WritableDraft } from 'immer/dist/internal';
import { debounce } from 'lodash-es';
import type { CSSProperties } from 'react';
import React from 'react';
import { useEditorService, useEditorState } from '../../hooks';
import { useImmer } from '../../hooks/internal';
import { validateDatasets, validateLayers, validWidgets } from '../../utils';

export type RuntimeAppProps = {
  /** 默认的应用配置 */
  defaultApplication: Application;
  /** 运行时应用 */
  App: LIRuntimeApp['App'];
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
};

const RuntimeApp: React.FC<RuntimeAppProps> = (props) => {
  const { className, style, defaultApplication, App: LIApp } = props;

  // 编辑器上下文服务
  const { editorService } = useEditorService();

  // 编辑器上下文状态
  const { state } = useEditorState();

  // LISDK 配置项
  const [sdkConfigState, updateSdkConfigState] = useImmer<Application>(defaultApplication);

  const latestAppConfigRef = useLatest({
    ...sdkConfigState,
    metadata: state.metadata,
  });

  const publishSdkUpdateEvent = useMemoizedFn(
    debounce(() => {
      editorService.publishEvent('change', latestAppConfigRef.current);
    }, 1000),
  );

  useUpdateEffect(() => {
    console.log('update state.map => ', state.map);
    updateSdkConfigState((draft) => {
      draft.spec.map = state.map;
    });
    publishSdkUpdateEvent();
  }, [state.map]);

  useUpdateEffect(() => {
    console.log('update state.datasets => ', state.datasets);
    updateSdkConfigState((draft) => {
      draft.datasets = validateDatasets(state.datasets) as WritableDraft<DatasetSchema[]>;
    });
    publishSdkUpdateEvent();
  }, [state.datasets]);

  useUpdateEffect(() => {
    console.log('update state.layers => ', state.layers);
    updateSdkConfigState((draft) => {
      draft.spec.layers = validateLayers(state.layers);
    });
    publishSdkUpdateEvent();
  }, [state.layers]);

  useUpdateEffect(() => {
    console.log('update state.widgets => ', state.widgets);
    updateSdkConfigState((draft) => {
      draft.spec.widgets = validWidgets(state.widgets);
    });
    publishSdkUpdateEvent();
  }, [state.widgets]);

  return <LIApp className={classNames(className)} config={sdkConfigState} style={style} />;
};

export default RuntimeApp;

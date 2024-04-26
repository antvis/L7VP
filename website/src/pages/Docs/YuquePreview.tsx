import { Spin } from 'antd';
import classNames from 'classnames';
import querystring from 'query-string';
import type { ComponentType } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

/**
 * 构建预览地址
 * @param url
 * @param previewOptions
 */
const buildPreviewUrl = (url: string, previewOptions: any) => {
  const urlObj = querystring.parseUrl(url);
  // 构建URL参数，注意实现顺序
  const query = {
    ...urlObj.query,
    ...{ title: 0, outline: 0, from: 'yuque-preview' },
    ...previewOptions,
    ...{ view: 'doc_embed' },
  };
  return querystring.stringifyUrl({ url: urlObj.url, query });
};

// 预留 64 高度，避免缩放窗口等中中间状态出现滚动条
const HEIGHT_OFFSET = 64;

const defaultHeightCalcOptions = {
  // 最大高度补偿次数
  reCalcCount: 3,
  // 单次执行补偿的延迟时间
  delayMs: 2000,
};

export type YuquePreviewProps = {
  className?: string;
  docUrl: string;

  /**
   * 承载内嵌 iframe 的容器的样式
   */
  style?: React.CSSProperties;

  /**
   * 高度，如果不设置，则自动计算高度。如果设置，则采取设置的高度
   */
  height?: number;

  /**
   * loading 提示文本
   */
  loadingText?: string;

  /**
   * 加载完成事件
   */
  onLoaded?: () => void;

  /**
   * 是否要重新计算高度
   */
  heightCalcOptions?:
    | false
    | {
        /**
         * 重新计算次数，默认 3 次
         */
        reCalcCount?: number;
        /**
         * 间隔时间，默认 2000
         */
        delayMs?: number;
      };

  /**
   * 预览配置，https://yuque.antfin-inc.com/ant-fe/vcdlq5/oidric
   */
  previewOptions?: {
    /**
     * 是否显示文档标题（已废弃）
     */
    header?: number;

    /**
     * 是否显示文档标题
     */
    title?: number;

    outline?: number;

    /**
     * 来源标记，如果传空（不传有默认值：yuque-preview），会导致高度自适应失效
     */
    from?: string;
  };
  /**
   * 允许自定义 iframe 参数
   */
  iframeProps?: Record<string, string>;
  SpinComponent?: ComponentType<{ spinning: boolean; tip?: string }>;
};

// ?=&title=0&outline=1&from=1"

export const YuquePreview: React.FC<YuquePreviewProps> = (props) => {
  const {
    className,
    docUrl,
    previewOptions,
    height,
    style,
    heightCalcOptions = false,
    loadingText = '内容加载中...',
    SpinComponent = Spin,
    onLoaded,
    iframeProps = {},
  } = props;
  if (previewOptions?.header !== undefined) {
    console.warn('header property in previewOptions is deprecated, please use previewOptions.title.');
  }
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const heightReCalcCountRef = useRef<number>(0);
  const [contentLoading, setContentLoading] = useState(true);

  // 自定义高度模式下，不处理高度变化
  const isCustomHeight = height !== undefined;

  const [innerHeight, setInnerHeight] = useState(height || 200);

  useEffect(() => {
    if (height) {
      setInnerHeight(height);
    }
  }, [height]);

  // 处理高度变更
  const handleContentHeightChange = useCallback(
    (contentHeight: number) => {
      setInnerHeight(contentHeight + HEIGHT_OFFSET);
      // 补偿机制
      if (heightCalcOptions) {
        const calcOpt = { ...defaultHeightCalcOptions, ...heightCalcOptions };
        if (heightReCalcCountRef.current < calcOpt.reCalcCount) {
          setTimeout(() => {
            setInnerHeight(contentHeight + HEIGHT_OFFSET + 1);
          }, calcOpt.delayMs);
          heightReCalcCountRef.current += 1;
        }
      }
    },
    [setInnerHeight, heightCalcOptions],
  );

  const handleWindowMessage = useCallback(
    (evt: any) => {
      if (isCustomHeight) {
        return;
      }
      let evtData = evt?.data || {};
      if (typeof evtData === 'string') {
        try {
          evtData = JSON.parse(evtData);
        } catch {
          evtData = {};
        }
      }
      const { type, payload } = evtData;
      switch (type) {
        case 'doc_ready':
        case 'doc_height_change':
          if (payload?.height) {
            handleContentHeightChange(payload.height);
          }
          break;
        // 页面 resize 回调，不要使用这个高度来更改 iframe 高度，会死循环
        case 'yuque_sdk_resize_callback':
          // if (message?.height) {
          // setInnerHeight(message.height + HEIGHT_OFFSET);
          // }
          break;
        default:
          break;
      }
    },
    [handleContentHeightChange],
  );

  useEffect(() => {
    window.addEventListener('message', handleWindowMessage, true);
    return function cleanup() {
      window.removeEventListener('message', handleWindowMessage, true);
    };
  }, []);

  // URL 变化重新加载
  useEffect(() => {
    setContentLoading(true);
  }, [docUrl]);

  const handleIframeLoad = useCallback(() => {
    onLoaded?.();
    setContentLoading(false);
  }, [setContentLoading, onLoaded]);

  const finalPreviewOptions = { ...previewOptions };
  // 处理参数兼容
  if (finalPreviewOptions.header !== undefined) {
    finalPreviewOptions.title = finalPreviewOptions.header;
    delete finalPreviewOptions.header;
  }
  const previewUrl = buildPreviewUrl(docUrl, finalPreviewOptions);

  return (
    <div style={style} className={classNames('yuque-preview', className)}>
      <SpinComponent spinning={contentLoading} tip={loadingText}>
        <iframe
          {...iframeProps}
          ref={iframeRef}
          onLoad={handleIframeLoad}
          title="yuque-preview"
          src={previewUrl}
          frameBorder="0"
          className="yuque-preview-iframe"
          style={{ width: '100%', height: innerHeight }}
          // https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/iframe#attr-allowfullscreen
          allow="fullscreen"
        />
      </SpinComponent>
    </div>
  );
};

import { CopyOutlined } from '@ant-design/icons';
import MonacoEditor from '@monaco-editor/react';
import { Space, Tooltip } from 'antd';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import LZString from 'lz-string';
import { useRef, useState } from 'react';
import { usePrefixCls } from '../../../../hooks';
import { CodeSandboxIcon, RiddleIcon } from './Icon';
import useStyle from './style';
import { useIsInternalNetwork } from '@/hooks';

function compress(string: string): string {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

const Monaco_Themes = {
  base: 'vs-dark',
  inherit: true,
  rules: [],
  colors: {
    'editor.foreground': '#ffffffd9',
    'editor.background': '#282932',
    'editor.selectionBackground': '#282932',
    'editor.lineHighlightBackground': '#282932',
    'editorCursor.foreground': '#819090',
    'editorWhitespace.foreground': '#282932',
  },
};

type CodePreviewType = {
  language: string;
  value: string;
  className?: string;
  riddle?: Record<string, any>;
  codesanbox?: Record<string, any>;
};

const CodePreview = (props: CodePreviewType) => {
  const { language, value, riddle, codesanbox, className } = props;
  const prefixCls = usePrefixCls('code-preview');
  const styles = useStyle();
  const riddleIconRef = useRef<HTMLFormElement>(null);
  const codeSandboxIconRef = useRef<HTMLFormElement>(null);
  const showRiddleButton = useIsInternalNetwork() && riddle;
  const showCodesanboxButton = useIsInternalNetwork() && codesanbox;
  const [loaded, setLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cleanCopyId = () => {
    if (copyIdRef.current) {
      clearTimeout(copyIdRef.current);
    }
  };

  const riddlePrefillConfig = riddle;
  const codesanboxPrefillConfig = codesanbox;

  // useEffect(() => {
  //   loader
  //     .init()
  //     .then((monaco) => {
  //       monaco.editor.defineTheme('vs-dark', Monaco_Themes);
  //       // monaco.editor.setTheme('vs-dark');
  //     })
  //     .catch((error) => console.error('An error occurred during initialization of Monaco: ', error));
  // }, []);

  const onCopyClick = () => {
    copy(value || '');
    setCopied(true);

    // Trigger tips update
    cleanCopyId();
    copyIdRef.current = setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const ToolBar = (
    <div className={classNames(`${prefixCls}__toolbar`, styles.toolBar)}>
      <Space size="middle">
        {showCodesanboxButton ? (
          <form
            className={classNames(`${prefixCls}__action`, styles.action)}
            action="https://codesandbox.io/api/v1/sandboxes/define"
            method="POST"
            target="_blank"
            ref={codeSandboxIconRef}
            onClick={() => {
              codeSandboxIconRef.current?.submit();
            }}
          >
            <input type="hidden" name="parameters" value={compress(JSON.stringify(codesanboxPrefillConfig))} />
            <Tooltip title="在 CodeSandbox 中打开">
              <CodeSandboxIcon className={classNames(`${prefixCls}__action-icon`, styles.actionIcon)} />
            </Tooltip>
          </form>
        ) : null}

        {showRiddleButton ? (
          <form
            className={classNames(`${prefixCls}__action`, styles.action)}
            action="//riddle.alibaba-inc.com/riddles/define"
            method="POST"
            target="_blank"
            ref={riddleIconRef}
            onClick={() => {
              riddleIconRef.current?.submit();
            }}
          >
            <input type="hidden" name="data" value={JSON.stringify(riddlePrefillConfig)} />
            <Tooltip title="在 Riddle 中打开">
              <RiddleIcon className={classNames(`${prefixCls}__action-icon`, styles.actionIcon)} />
            </Tooltip>
          </form>
        ) : null}

        <Tooltip title={copied ? '复制成功' : '复制代码'}>
          <CopyOutlined className={classNames(`${prefixCls}__action-icon`, styles.actionIcon)} onClick={onCopyClick} />
        </Tooltip>
      </Space>
    </div>
  );

  return (
    <div className={classNames(className, styles.codePreview, prefixCls)}>
      {loaded ? ToolBar : null}
      <MonacoEditor
        language={language}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          lineNumbers: 'off',
          overviewRulerBorder: false,
          wordWrap: 'off',
          wordWrapOverride1: 'off',
        }}
        onMount={() => {
          setLoaded(true);
        }}
        theme="vs-dark"
        value={value}
      />
    </div>
  );
};

export default CodePreview;

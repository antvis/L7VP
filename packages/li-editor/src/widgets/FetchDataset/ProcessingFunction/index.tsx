import { DownOutlined, MinusCircleOutlined } from '@ant-design/icons';
import MonacoEditor from '@monaco-editor/react';
import { Button, Dropdown } from 'antd';
import React, { useRef, useState } from 'react';
import { getValue } from './helper';
import './index.less';

type ProcessingFunctionProps = {
  onChange?: (funs: {
    onComplete?: { type: string; value: string };
    onError?: { type: string; value: string };
  }) => void;
};

export type FuncItem = { name: string; value: any; key: string };

const ItemList = [
  {
    key: 'success-func',
    label: '请求成功对结果的处理函数',
  },
  {
    key: 'error-func',
    label: '请求失败对异常的处理函数',
  },
];

const ProcessingFunction = (props: ProcessingFunctionProps) => {
  const { onChange } = props;
  const [menus, setMenus] = useState(ItemList);
  const functionListRef = useRef<FuncItem[]>([]);

  const onFunctionListChange = (list: FuncItem[]) => {
    functionListRef.current = [...list];

    const funs = getValue(list);
    if (onChange) {
      onChange(funs);
    }

    const selectedKeys: string[] = list.map((item) => item.key);
    const _items = ItemList.filter(
      (item) => item && item.key && typeof item.key === 'string' && !selectedKeys.includes(item.key),
    );
    setMenus(_items);
  };

  const onAddFunc = (val: { key: string; label: string }) => {
    const _item =
      val.key === 'success-func'
        ? {
            name: val.label,
            value: 'function(res) { return res.data }',
            key: val.key,
          }
        : {
            name: val.label,
            value: 'function(err) {}',
            key: val.key,
          };

    const _funcList = [...functionListRef.current, _item];
    onFunctionListChange(_funcList);
  };

  const onDel = (key: string) => {
    const _funcList = functionListRef.current.filter((item) => item.key !== key);
    onFunctionListChange(_funcList);
  };

  const handleEditorChange = (fun: any, key: string) => {
    const _functionList = functionListRef.current.map((item) => (item.key === key ? { ...item, value: fun } : item));
    const funs = getValue(_functionList);
    if (onChange) {
      onChange(funs);
    }
    functionListRef.current = _functionList;
  };

  return (
    <div className="li-provessing-function">
      <div className="li-provessing-function__btn">
        <Dropdown menu={{ items: menus.map((item) => ({ ...item, onClick: () => onAddFunc(item) })) }}>
          <Button>
            选择添加 <DownOutlined />
          </Button>
        </Dropdown>
      </div>

      {functionListRef.current.map((item: FuncItem) => {
        return (
          <div className="li-provessing-function__success-and-err" key={item.key}>
            <p>{item.name}:</p>
            <div className="li-provessing-function__success-and-err__content">
              <div className="li-provessing-function__success-and-err__content-json">
                <MonacoEditor
                  language="json"
                  options={{
                    readOnly: false,
                    minimap: { enabled: false },
                    lineNumbers: 'off',
                    overviewRulerBorder: false,
                  }}
                  onChange={(fun) => handleEditorChange(fun, item.key)}
                  theme="vs-dark"
                  value={item.value}
                />
              </div>
              <div className="li-provessing-function__success-and-err__content-icon">
                <MinusCircleOutlined
                  onClick={() => {
                    onDel(item.key);
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessingFunction;

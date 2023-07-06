import { CaretRightOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/lib/__builtins__';
import type { Schema, SchemaKey } from '@formily/json-schema';
import type { ReactFC } from '@formily/react';
import { observer, RecursionField, useField, useFieldSchema } from '@formily/react';
import { markRaw, model } from '@formily/reactive';
import { toArr } from '@formily/shared';
import type { CollapsePanelProps, CollapseProps } from 'antd';
import { Badge, Collapse } from 'antd';
import cls from 'classnames';
import React, { Fragment, useMemo } from 'react';
import useStyle from './style';

type ActiveKeys = string | number | (string | number)[];

type ActiveKey = string | number;
export interface IFormCollapse {
  activeKeys: ActiveKeys;
  hasActiveKey: (key: ActiveKey) => boolean;
  setActiveKeys: (key: ActiveKeys) => void;
  addActiveKey: (key: ActiveKey) => void;
  removeActiveKey: (key: ActiveKey) => void;
  toggleActiveKey: (key: ActiveKey) => void;
}

export interface IFormCollapseProps extends CollapseProps {
  formCollapse?: IFormCollapse;
}

const usePanels = () => {
  const collapseField = useField();
  const schema = useFieldSchema();
  const panels: { name: SchemaKey; props: any; schema: Schema }[] = [];
  schema.mapProperties((_schema, name) => {
    const field = collapseField.query(collapseField.address.concat(name)).take();
    if (field?.display === 'none' || field?.display === 'hidden') return;
    if (_schema['x-component']?.indexOf('CollapsePanel') > -1) {
      panels.push({
        name,
        props: {
          ..._schema?.['x-component-props'],
          key: _schema?.['x-component-props']?.key || name,
        },
        schema: _schema,
      });
    }
  });
  return panels;
};

const createFormCollapse = (defaultActiveKeys?: ActiveKeys) => {
  const formCollapse = model({
    activeKeys: defaultActiveKeys,
    setActiveKeys(keys: ActiveKeys) {
      formCollapse.activeKeys = keys;
    },
    hasActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        if (formCollapse.activeKeys.includes(key)) {
          return true;
        }
      } else if (formCollapse.activeKeys === key) {
        return true;
      }
      return false;
    },
    addActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) return;
      formCollapse.activeKeys = toArr(formCollapse.activeKeys).concat(key);
    },
    removeActiveKey(key: ActiveKey) {
      if (Array.isArray(formCollapse.activeKeys)) {
        formCollapse.activeKeys = formCollapse.activeKeys.filter((item) => item !== key);
      } else {
        formCollapse.activeKeys = '';
      }
    },
    toggleActiveKey(key: ActiveKey) {
      if (formCollapse.hasActiveKey(key)) {
        formCollapse.removeActiveKey(key);
      } else {
        formCollapse.addActiveKey(key);
      }
    },
  });
  return markRaw(formCollapse);
};

const InternalFormCollapse: ReactFC<IFormCollapseProps> = observer(({ formCollapse, ...props }) => {
  const field = useField();
  const panels = usePanels();
  const prefixCls = usePrefixCls('formily-collapse', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const _formCollapse = useMemo(() => {
    return formCollapse ? formCollapse : createFormCollapse(props.defaultActiveKey);
  }, []);

  const takeActiveKeys = () => {
    if (props.activeKey) return props.activeKey;
    if (_formCollapse?.activeKeys) return _formCollapse?.activeKeys;
    if (props.accordion) return panels[0]?.name;
    return panels.map((item) => item.name);
  };

  const badgedHeader = (key: SchemaKey, _props: any) => {
    const errors = field.form.queryFeedbacks({
      type: 'error',
      address: `${field.address.concat(key)}.*`,
    });
    if (errors.length) {
      return (
        <Badge size="small" className="errors-badge" count={errors.length}>
          {_props.header}
        </Badge>
      );
    }
    return _props.header;
  };
  return wrapSSR(
    <Collapse
      {...props}
      className={cls(prefixCls, props.className, hashId)}
      activeKey={takeActiveKeys()}
      onChange={(key) => {
        props?.onChange?.(key);
        _formCollapse?.setActiveKeys?.(key);
      }}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
    >
      {panels.map(({ props: _props, schema, name }, index) => (
        <Collapse.Panel key={index} {..._props} header={badgedHeader(name, _props)} forceRender>
          <RecursionField schema={schema} name={name} />
        </Collapse.Panel>
      ))}
    </Collapse>,
  );
});

const CollapsePanel: React.FC<React.PropsWithChildren<CollapsePanelProps>> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export const FormCollapse = Object.assign(InternalFormCollapse, {
  CollapsePanel,
  createFormCollapse,
});

export default FormCollapse;

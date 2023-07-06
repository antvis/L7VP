import { DownOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import { Button, Form, Input, message, Popconfirm, Popover } from 'antd';
import cls from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useRef, useState } from 'react';
import { BuiltInImageList as DEFULT_ICON_LIST } from '../../IconImageLayerStyle/constant';
import useStyle from './style';
import type { IconSelectOptionType } from './type';

export type IconListProps = {
  onChange?: (iconList: IconSelectOptionType[]) => void;
  value?: IconSelectOptionType[];
};

// 选择图标的自定义组件
const Internal: React.FC<IconListProps> = (props) => {
  const { onChange } = props;
  const prefixCls = usePrefixCls('formily-icon-list');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [iconList, setIconList] = useState<IconSelectOptionType[]>(
    isEmpty(props.value) ? DEFULT_ICON_LIST : props.value,
  );
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const formRef = useRef(null);
  const [messageApi, messageContextHolder] = message.useMessage();

  const onFinish = (values: any) => {
    const hasId = iconList.findIndex((item) => item.id === values.id);
    if (hasId === -1) {
      setIconList([...iconList, values]);
      form.resetFields();
    } else {
      return messageApi.error('图标名称不能相同！');
    }
  };

  useEffect(() => {
    onChange?.(iconList);
  }, [iconList]);

  useEffect(() => {
    if (formRef.current) {
      form.resetFields();
    }
  }, [open, formRef]);

  const content = (
    <div className={cls(`${prefixCls}-popover`, hashId)}>
      <div className={`${prefixCls}-popover-icon-list`}>
        {(iconList || []).map((item) => {
          return (
            <div className={`${prefixCls}-popover-icon-list__item`} key={item.id}>
              <Popconfirm
                title="删除该图标"
                onConfirm={() => {
                  setIconList(iconList.filter((_item) => _item.id !== item.id));
                }}
                okText="确定"
                cancelText="取消"
              >
                <img src={item.image} />
                <p>{item.id}</p>
              </Popconfirm>
            </div>
          );
        })}
      </div>
      <div className={`${prefixCls}-popover-add-icon`}>
        {messageContextHolder}
        <Form onFinish={onFinish} form={form} ref={formRef}>
          <Form.Item
            name="id"
            rules={[
              {
                required: true,
                message: '请输入图标名称',
              },
            ]}
          >
            <Input placeholder="请输入图标名称" />
          </Form.Item>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: '请输入图标的路径地址',
              },
              {
                pattern: '^https?://.+/',
                message: '请输入正确地址链接',
              },
            ]}
          >
            <Input placeholder="请输入图标的路径地址" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

  return wrapSSR(
    <Popover
      placement="bottom"
      trigger="click"
      destroyTooltipOnHide={true}
      content={content}
      className={cls(`${prefixCls}`, hashId)}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      {(iconList || []).slice(0, 4).map((item) => {
        return (
          <div className={`${prefixCls}-item`} key={item.id}>
            <img src={item.image} />
          </div>
        );
      })}
      <DownOutlined className={`${prefixCls}-icon`} />
    </Popover>,
  );
};

const IconList: ReactFC<IconListProps> = connect(Internal);
export default IconList;

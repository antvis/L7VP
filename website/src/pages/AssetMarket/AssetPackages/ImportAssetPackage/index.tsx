import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { AssetPackageSpec } from '@antv/li-sdk';
import { Button, Form, Input, message, Modal, Radio, Select } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import { isEmpty, isUndefined } from 'lodash-es';
import { useEffect, useState } from 'react';
import { getFormatUMDName, getPackageVersions, getUrls, isCSSOrJsUrl } from './helper';
import type { AssetPackage } from '@/services';

const UrlFormList = () => {
  return (
    <Form.List
      name="urls"
      rules={[
        {
          validator: async (_, urls) => {
            if (!urls || urls.length < 0) {
              return Promise.reject(new Error('请至少填写一个 CDN 资源地址'));
            }
          },
        },
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              label={index === 0 ? 'CDN 地址' : ''}
              wrapperCol={index === 0 ? { span: 24 } : { span: 20, offset: 4 }}
              required={false}
              key={field.key}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    { required: true, message: '请输入 CDN 地址' },
                    { type: 'url', message: 'URL 地址不合法' },
                    {
                      validator(_, value) {
                        if (!value) {
                          return Promise.reject();
                        }
                        if (value && isCSSOrJsUrl(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('请输入有效的 JS 或 CSS 资源地址'));
                      },
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="请输入 URL，例如：https://unpkg.com/@antv/li-analysis-assets@0.10.0/dist/umd/li-analysis-assets.min.js" />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined style={{ marginLeft: 8 }} onClick={() => remove(field.name)} />
                ) : null}
              </div>
            </Form.Item>
          ))}
          <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
            <Button block type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
              {fields.length > 0 ? '新增 CDN 资源' : '输入 CDN 地址'}
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

type ImportAssetPackageProps = {
  open: boolean;
  initialValue?: AssetPackageSpec & { assetId?: string };
  onSubmit: (val: AssetPackage) => void;
  onCancel: () => void;
};

const ImportAssetPackage = (props: ImportAssetPackageProps) => {
  const { open, initialValue, onSubmit, onCancel } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [verisonLoading, setVerisonLoading] = useState(false);
  const [versionList, setVersionList] = useState<DefaultOptionType[]>([]);

  const npmMirror = Form.useWatch('npmMirror', form);
  const packageName = Form.useWatch('package', form);
  const isNpmMirror = npmMirror === 'npm';
  const isEdit = !isUndefined(initialValue?.assetId);
  const [messageApi, messageContextHolder] = message.useMessage();

  const getVersionList = (packages: string) => {
    getPackageVersions(packages)
      .then((res: { versions: []; tags: Record<string, string>; name: string }) => {
        if (res?.versions?.length) {
          const versions = res.versions.map((item: { version: string }) => {
            return { label: item.version, value: item.version };
          });
          if (!initialValue?.version) {
            form.setFieldValue('version', res?.tags?.latest);
            form.setFieldValue('global', getFormatUMDName(res?.name));
            form.setFieldValue('name', res?.name);
          }
          setVersionList(versions);
          setVerisonLoading(false);
        }
      })
      .catch(() => {
        messageApi.error('包信息获取失败！');
        setVersionList([]);
        setVerisonLoading(false);
      });
  };

  useEffect(() => {
    if (isEdit && initialValue) {
      form.setFieldsValue(initialValue);
      if (isNpmMirror) {
        getVersionList(initialValue.package);
      }
    } else {
      form.resetFields();
    }
  }, [initialValue, open]);

  const onFinish = (values: AssetPackage) => {
    if (!isNpmMirror) {
      onSubmit(values);
      return;
    }

    setLoading(true);
    getUrls(values.package, values.version)
      .then((urls: string[]) => {
        onSubmit({ ...values, urls });
        setLoading(false);
      })
      .catch((err) => {
        console.log('获取 CDN 资源失败！');
        setLoading(false);
      });
  };

  const onBack = () => {
    onCancel();
  };

  return (
    <Modal
      title={`${isEdit ? '修改' : '导入'}资产包`}
      width={600}
      open={open}
      footer={null}
      onCancel={onBack}
      centered
      destroyOnClose
    >
      <Form initialValues={{ npmMirror: 'npm' }} labelCol={{ span: 4 }} form={form} onFinish={onFinish}>
        <Form.Item label="包镜像" name="npmMirror">
          <Radio.Group>
            <Radio.Button value="npm">NPM 镜像</Radio.Button>
            <Radio.Button value="private">私有镜像</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="id" name="assetId" style={{ display: 'none' }}>
          <Input />
        </Form.Item>
        {messageContextHolder}
        <Form.Item label="包名" name="package" rules={[{ required: true, message: '请输入包名' }]}>
          <Input
            disabled={isEdit}
            placeholder="请输入包名，例如：@antv/li-analysis-assets"
            addonAfter={
              isNpmMirror ? (
                <Button
                  disabled={isEmpty(packageName)}
                  loading={verisonLoading}
                  size="small"
                  type="link"
                  onClick={() => {
                    setVerisonLoading(true);
                    getVersionList(form.getFieldValue('package'));
                  }}
                >
                  获取包信息
                </Button>
              ) : null
            }
          />
        </Form.Item>

        <Form.Item
          label="版本号"
          name="version"
          rules={[{ required: true, message: isNpmMirror ? '请选择版本号' : '请输入版本号' }]}
        >
          {isNpmMirror ? (
            <Select options={versionList} placeholder="请选择版本号" />
          ) : (
            <Input placeholder="请输入版本号" />
          )}
        </Form.Item>

        <Form.Item label="UMD 名称" name="global" rules={[{ required: true, message: '请输入 UMD 名称' }]}>
          <Input placeholder="请输入 UMD 名称，例如：LIAnalysisAssets" />
        </Form.Item>

        {!isNpmMirror && <UrlFormList />}

        <Form.Item label="资产名称" name="name" rules={[{ required: true, message: '请输入资产名称' }]}>
          <Input placeholder="请输入资产名称，例如：官方分析资产" />
        </Form.Item>

        <Form.Item label="资产描述" name="description" rules={[{ message: '请输入资产描述' }]}>
          <Input.TextArea
            placeholder="请输入资产描述，例如：分析资产包，用于数据可视分析场景，包含分析图层、组件等"
            rows={4}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button htmlType="button" onClick={onBack} style={{ marginRight: 20 }}>
            返回
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEdit ? '确认' : '导入'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ImportAssetPackage;

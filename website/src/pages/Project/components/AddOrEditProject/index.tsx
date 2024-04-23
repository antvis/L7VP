import type { ModalProps } from 'antd';
import { Form, Input, Modal, Select, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { creatApplication } from '../../herlper';
import styles from './index.less';
import { createProject, getAssetPackageList, updateProject } from '@/services';
import type { AssetPackage, Project as ProjectType } from '@/services';
import { CORE_ASSETS_ID, DefaultAssetPackageIds } from '@/constants';

const { TextArea } = Input;

interface AddProjectProps extends ModalProps {
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  type: 'edit' | 'add';
  onSubmit: (project: ProjectType) => void;
  project?: ProjectType;
}
export default function AddOrEditProject({ visible, onVisibleChange, project, onSubmit, type }: AddProjectProps) {
  const [form] = Form.useForm();
  const [assetMarketList, setAssetMarketList] = useState<AssetPackage[]>([]);
  const assetPackageList = assetMarketList.map((assetPackage) => ({
    label: assetPackage.name,
    value: assetPackage.assetId,
  }));

  useEffect(() => {
    getAssetPackageList().then((res: AssetPackage[]) => {
      setAssetMarketList(res);
    });
  }, []);

  const onSubmitValue = async () => {
    form.validateFields().then((value: Pick<ProjectType, 'projectName' | 'description' | 'assetPackageIds'>) => {
      if (type === 'edit') {
        if (project?.projectId) {
          updateProject(project?.projectId, { ...project, ...value }).then((_project) => {
            onSubmit(_project);
            onVisibleChange(false);
            form.resetFields();
          });
        }
      } else {
        const applicationConfig = creatApplication(value.projectName, value.assetPackageIds!);
        createProject({
          ...value,
          applicationConfig,
        }).then((_project) => {
          onSubmit(_project);
          onVisibleChange(false);
          form.resetFields();
        });
      }
    });
  };

  useEffect(() => {
    if (type === 'edit' && visible) {
      form.setFieldsValue({
        projectName: project?.projectName,
        description: project?.description,
        assetPackageIds: project?.assetPackageIds || DefaultAssetPackageIds,
      });
    }
  }, [form, project, type, visible]);

  const items = [
    {
      key: '1',
      label: `${type === 'edit' ? '修改' : '创建'}项目`,
      children: (
        <Form form={form} layout="vertical" initialValues={{ assetPackageIds: DefaultAssetPackageIds }}>
          <Form.Item name="projectName" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
            <Input placeholder="请输入名称" className={styles.inputBorder} />
          </Form.Item>
          <Form.Item name="description" label="项目描述">
            <TextArea rows={2} className={styles.inputBorder} />
          </Form.Item>
          <Form.Item
            name="assetPackageIds"
            label="资产包"
            validateFirst
            rules={[
              { required: true, message: '请选择项目依赖的资产包' },
              {
                validator(_, value) {
                  if (value.includes(CORE_ASSETS_ID)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('请添加可视化核心资产'));
                },
              },
            ]}
          >
            <Select placeholder="请选择资产包" mode="multiple" options={assetPackageList} />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      width={800}
      open={visible}
      onOk={onSubmitValue}
      onCancel={() => {
        onVisibleChange(false);
        form.resetFields();
      }}
      destroyOnClose
    >
      <Tabs defaultActiveKey="1" items={items} className={styles['tabs-item']} />
    </Modal>
  );
}

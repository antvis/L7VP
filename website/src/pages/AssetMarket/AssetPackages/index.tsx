import { MoreOutlined } from '@ant-design/icons';
import { loadAssetPackages } from '@antv/li-sdk';
import type { MenuProps } from 'antd';
import { Button, Card, Col, Dropdown, message, Row, Tag, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import ImportAssetPackage from './ImportAssetPackage';
import useStyle from './style';
import { createAssetPackage, deleteAssetPackage, getAssetPackageList, updateAssetPackage } from '@/services';
import type { AssetPackage } from '@/services';
import { BUILTIN_ASSET_PACKAGES } from '@/constants';

const isBuiltinAssetPackage = (assetPackage: string) =>
  BUILTIN_ASSET_PACKAGES.some((asset) => asset.package === assetPackage);

type AssetPackagesProps = {
  className: string;
};

const AssetPackages = (props: AssetPackagesProps) => {
  const [importAsset, setImportAsset] = useState(false);
  const [editAssetPackage, setEditAssetPackage] = useState<AssetPackage>();
  const [assetMarketList, setAssetMarketList] = useState<AssetPackage[]>([]);
  const styles = useStyle();
  const [messageApi, messageContextHolder] = message.useMessage();

  const getAssets = () => {
    getAssetPackageList().then((res: AssetPackage[]) => {
      setAssetMarketList(res);
    });
  };

  useEffect(() => {
    getAssets();
  }, []);

  const handleEditAssetPackage = (item: AssetPackage) => {
    setEditAssetPackage(item);
    setImportAsset(true);
  };

  const onSubmit = (values: AssetPackage) => {
    const { assetId, ...params } = values;
    loadAssetPackages([{ ...values }], { isLoadStyle: false })
      .then((assets) => {
        if (assets) {
          if (assetId) {
            updateAssetPackage(assetId, params).then((res) => {
              messageApi.success('更新资产成功！');
              getAssets();
              setImportAsset(false);
              setEditAssetPackage(undefined);
            });
          } else {
            createAssetPackage(values).then(() => {
              messageApi.success('创建资产成功！');
              getAssets();
              setImportAsset(false);
              setEditAssetPackage(undefined);
            });
          }
        }
      })
      .catch(() => {
        if (assetId) {
          messageApi.error('创建资产失败！');
        } else {
          messageApi.error('资产更新失败！');
        }
      });
  };

  const delAsset = (id: string) => {
    deleteAssetPackage(id).then(() => {
      messageApi.success('资产删除成功！');
      getAssets();
    });
  };

  const CardExtra = (item: AssetPackage) => {
    const dropDownItems: MenuProps['items'] = [
      {
        key: 'editAsset',
        label: '修改资产',
        disabled: isBuiltinAssetPackage(item.package),
        onClick() {
          handleEditAssetPackage(item);
        },
      },
      {
        key: 'delAsset',
        label: '删除资产',
        disabled: isBuiltinAssetPackage(item.package),
        onClick() {
          delAsset(item.assetId);
        },
      },
    ];

    return (
      <div onClick={(e) => e.stopPropagation()}>
        <Dropdown menu={{ items: dropDownItems }}>
          <MoreOutlined />
        </Dropdown>
      </div>
    );
  };

  return (
    <Row gutter={[48, 24]} className={props.className}>
      {assetMarketList.map((item: AssetPackage) => (
        <Col key={item.assetId} xxl={6} xl={8} lg={12} md={12} sm={24} xs={24}>
          <Card
            title={
              <div
                className={styles.cardTitle}
                onClick={() => {
                  if (!isBuiltinAssetPackage(item.package)) {
                    handleEditAssetPackage(item);
                  }
                }}
              >
                <div>{item.name}</div>

                {item.description?.includes('官方') && (
                  <div>
                    <Tag className={styles.cardPackageVerson}>官方</Tag>
                  </div>
                )}
              </div>
            }
            bordered={false}
            className={styles.card}
            extra={CardExtra(item)}
          >
            <p className={styles.cardDescription}>
              {item.description && item.description.length > 26 ? (
                <Tooltip title={item.description}>{item.description}</Tooltip>
              ) : (
                item.description
              )}
            </p>

            <div className={styles.cardPackage}>
              <div>{item.package}</div>
              <div>
                <Tag className={styles.cardPackageVerson}>{item.version}</Tag>
              </div>
            </div>
          </Card>
        </Col>
      ))}

      <Button type="primary" ghost className={styles.importAsset} onClick={() => setImportAsset(true)}>
        导入资产包
      </Button>

      <ImportAssetPackage
        open={importAsset}
        initialValue={editAssetPackage}
        onSubmit={onSubmit}
        onCancel={() => {
          setImportAsset(false);
          setEditAssetPackage(undefined);
        }}
      />
      {messageContextHolder}
    </Row>
  );
};

export default AssetPackages;

import { GithubOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import type { RadioChangeEvent } from 'antd';
import { Button, Popover, Radio, Space, theme, Tooltip } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { history, Link } from 'umi';
import type { MenuItem } from './constant';
import { FeatureList } from './constant';
import './index.less';

const { useToken } = theme;

const Home = () => {
  const [item, setItem] = useState<MenuItem>(FeatureList[0]);
  const [watchersCount, setWatchersCount] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    fetch(`https://api.github.com/repos/antvis/L7VP`, {
      method: 'GET',
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        setWatchersCount(res.watchers_count);
      });
  }, []);

  return (
    <div className="li-home">
      <div className="li-home__content">
        <div className="li-home__header">
          <div className="li-home__header-left">
            <p className={'li-home__header-left_title'}>L7VP 地理空间智能可视分析工具</p>
            <p className={'li-home__header-left_more'}>
              下一代地理空间智能可视分析工具和应用研发平台，具有丰富的可视化效果
              <br /> 提供洞察分析、地图应用搭建工具、开放扩展能力
            </p>
            <div className="li-home__header-left_btn">
              <Button
                type="primary"
                shape="round"
                size="large"
                className="li-home__header-left_btn_start"
                onClick={() => {
                  history.push('/project');
                }}
              >
                开始使用
              </Button>
              <Link to="/template/09ccdf29-8bb0-4af8-8aa7-c89cfb4a2281?nav=layers" target="_blank">
                <Button shape="round" size="large" className="li-home__header-left_btn_demo">
                  体验 Demo
                </Button>
              </Link>

              <Tooltip
                title={watchersCount}
                color={token.colorBgElevated}
                open={watchersCount ? true : false}
                placement="right"
                overlayClassName="li-home__header-left_btn-start__tooltip"
              >
                <a href="https://github.com/antvis/L7VP" target="_blank" rel="noreferrer">
                  <Button
                    className="li-home__header-left_btn-start"
                    size="small"
                    icon={<GithubOutlined style={{ fontSize: '16px' }} />}
                  />
                </a>
              </Tooltip>
            </div>
          </div>
          <div className="li-home__header-right">
            <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*TF-kQIA2a9wAAAAAAAAAAAAADmJ7AQ/fmt.webp" />
          </div>
        </div>

        <div className="li-home__function-features">
          <div className="li-home__function-features__left-menu">
            <div>
              <h1
                className={css`
                  border-bottom: 1px solid ${token.colorPrimary};
                `}
              >
                功能特性
              </h1>
            </div>
            <div>
              <Radio.Group
                value={item.key}
                onChange={(e: RadioChangeEvent) => {
                  const selectItem = FeatureList.find((items: MenuItem) => items.key === e.target.value);
                  if (selectItem) {
                    setItem(selectItem);
                  }
                }}
              >
                <Space direction="vertical">
                  {FeatureList.map((_item: MenuItem) => {
                    return (
                      <Radio key={_item.key} value={_item.key} className="li-home__function-features__left-menu__item">
                        {_item.label}
                        {item.key === _item.key && (
                          <p className={'li-home__function-features__left-menu__item__description'}>
                            {_item.description}
                          </p>
                        )}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="li-home__function-features__right-image">
            <img src={item.imgSrc} />
          </div>
        </div>

        <div className="li-home__types-of-visualization">
          <h1
            className={css`
              border-bottom: 1px solid ${token.colorPrimary};
            `}
          >
            可视化类型
          </h1>
          <div className="li-home__types-of-visualization__img">
            <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*imR2Qb0-3k8AAAAAAAAAAAAADmJ7AQ/fmt.webp" />
          </div>
        </div>

        <div className="li-home__capacity-for-openness">
          <h1
            className={css`
              border-bottom: 1px solid ${token.colorPrimary};
            `}
          >
            开放能力
          </h1>
          <div className="li-home__capacity-for-openness__img">
            <video
              src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/file/A*bEDbQrbm6SgAAAAAAAAAAAAADmJ7AQ"
              poster="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*nBTiSZdffVIAAAAAAAAAAAAADmJ7AQ/original"
              loop={true}
              muted={true}
              controls
            />
            <p className="li-home__capacity-for-openness__des">
              基于 L7VP 开放能力建设出行领域的位置平台 - 客流分析场景案例
            </p>
          </div>
        </div>

        <div className="li-home__contact-us">
          <div
            className={classNames(
              'li-home__contact-us__card',
              css`
                background-color: ${token.colorBgContainer};
              `,
            )}
          >
            <div className="li-home__contact-us__card-container">
              <p>
                除了提供数据分析能力以及应用搭建能力，更重要的 L7VP
                也提供了平台开放能力，如果在你的业务中需要专有数据分析平台满足日常工作数据处理、分析，分享等需求或者你需要私有化部署，欢迎来开源社区交流。
              </p>
              <div className="li-home__contact-us__card-container-btn">
                <Space size="large">
                  <Popover
                    overlayClassName="li-home__contact-us__qr-popover"
                    placement="bottom"
                    trigger="click"
                    content={
                      <img
                        width={160}
                        src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*3YNMR5CIKosAAAAAAAAAAAAADmJ7AQ/original"
                      />
                    }
                  >
                    <Button type="primary">社区交流</Button>
                  </Popover>
                  <Button
                    onClick={() => {
                      window.open(history.createHref(`/docs?path=whvb0uddx03vqxka`));
                    }}
                  >
                    演示视频
                  </Button>
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={classNames(
          'li-home__footer',
          css`
            background-color: ${token.colorBgContainer};
          `,
        )}
      >
        <div className="li-home__footer-content">
          <div
            className={classNames(
              'li-home__footer-content-left',
              css`
                a:hover {
                  color: ${token.colorPrimaryHover};
                }
              `,
            )}
          >
            <a href="https://antv.antgroup.com/zh" target="_blank" rel="noreferrer">
              AntV 官网
            </a>
            <a href="https://github.com/antvis/L7VP" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.yuque.com/antv/l7vp" target="_blank" rel="noreferrer">
              关于我们
            </a>
          </div>
          <div>© Copyright 2023 AntV L7VP</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

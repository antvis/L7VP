import { ANALYSIS_ASSETS_ID, CORE_ASSETS_ID } from './asset';
import nCoVPrediction from './cases/2019-nCoV-prediction';
import remoteSensingImageSam from './cases/ai-remote-sensing';
import populationGrowth from './cases/china-census/population-growth';
import populationSexRatio from './cases/china-census/population-sex-ratio';
import universityList from './cases/china-university-list';
import cyberspacePattern from './cases/cyberspace-pattern';
import dragonBoatFestival from './cases/dragon-boat-festival';
import earthquake from './cases/earthquake';
import marineProtectedAreas from './cases/marine-protected-areas';
import newHouseJZH from './cases/new-house-jzh';
import shanghaiFlowLayer from './cases/shanghai-flow-layer';
import zeldaApp from './cases/zelda-app';
import type { Case } from '@/services';

// 可视分析
export const VIS_CASES: Case[] = [
  {
    id: 'dbbce4c3-e198-4a3e-8543-9e7da35af901',
    name: '2024 端午各省热度排行',
    description: '2024 端午各省热搜指数，数据来源于「端午节」百度指数',
    creatTime: '2022-09-19 16:29:09',
    type: 'vis',
    tags: ['区域对比'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xyXSRqUKvioAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: dragonBoatFestival,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '09ccdf29-8bb0-4af8-8aa7-c89cfb4a2283',
    name: '地震等级与震深可视化',
    description: '可视化 5.12 汶川地震等级分布与震深情况，数据来源于中国地震网。',
    creatTime: '2022-09-19 16:29:09',
    type: 'vis',
    tags: ['空间分布'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9neiR5CbgAEAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: earthquake,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '09ccdf29-8bb0-4af8-8aa7-c89cfb4a2280',
    name: '全国高等学校分布',
    description:
      '全国高等学校名单，截至2021年9月30日，全国高等学校共计3012所，本名单未包含香港特别行政区、澳门特别行政区和台湾地区高等学校。数据来源：教育部 http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/A03/202110/t20211025_574874.html',
    creatTime: '2023-06-21 17:17:48',
    type: 'vis',
    tags: ['空间分布'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*cmmnRpX12QsAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: universityList,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '09ccdf29-8bb0-4af8-8aa7-c89cfb4a2281',
    name: '省份人口性别比-第七次人口普查',
    description: '中国第七次人口普查省份数据，统计时间点为 2020 年底。数据来源：https://github.com/leiii/census。',
    creatTime: '2023-06-21 17:17:48',
    type: 'vis',
    tags: ['区域对比'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*KET9QaOLUDMAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: populationSexRatio,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '09ccdf29-8bb0-4af8-8aa7-c89cfb4a2282',
    name: '城市人口增长率-第七次人口普查',
    description:
      '中国第七次人口普查城市数据，统计时间点为 2020 年底。人口增长率，根据 2010 年的第六次人口普查数据计算获得。数据来源：https://github.com/leiii/census。',
    creatTime: '2023-06-21 17:17:48',
    type: 'vis',
    tags: ['区域对比'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*27vwSIc2J3UAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: populationGrowth,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '8691fa68-7ff9-41b7-8644-1d6d87735715',
    name: '海洋保护区分布',
    description:
      '可视化中国海洋保护区地域分布，海洋保护区分类为：水产种质资源保护区、海洋自然保护区、海洋公园、特别海洋保护区的。',
    creatTime: '2022-12-16 16:04:51',
    type: 'vis',
    tags: ['海洋保护'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*vrAcQZKTxFAAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: marineProtectedAreas,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: 'c88659da-b502-4eb5-b0b6-d37e92ee5f02',
    name: '上海城市客流聚合',
    description: '通过不同地图缩放下客流的自动聚合能力，帮助用户洞察城市维度下的客流位置分布和流量指标。',
    creatTime: '2023-09-22 16:24:55',
    type: 'app',
    tags: ['出行'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*QkXHRKsYGhgAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: shanghaiFlowLayer,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: 'bb5772d7-acde-486e-a4f9-ed8ecaf8ce2c',
    name: '上海杭州南京及周边新楼盘',
    description:
      '地图上标识出楼盘的分布情况，点的大小表示平均总价，点颜色深浅表示均价，从时间变化和空间分布的视角，每年新楼盘的分布及价格变化等趋势。数据来源于：https://github.com/yemanzhongting/picb',
    creatTime: '2023-10-16 20:59:27',
    type: 'vis',
    tags: ['空间分布', '趋势变化'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*zv-MSIIa0k4AAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: newHouseJZH,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '8691fa68-7ff9-41b7-8644-1d6d87735714',
    name: '疫情各城市首轮感染高峰期预测可视化',
    description: '统计各城市第一波疫情达峰预测与累计感染占总人口占比，预测数据来源于 “数据帝 chenqin”。',
    creatTime: '2022-12-16 16:04:51',
    type: 'vis',
    tags: ['区域对比'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*0j_NTK1efMYAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: nCoVPrediction,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: '3e1daebd-ac12-4ae2-9a54-fda10fab96bc',
    name: '疫情前后全国人口流动网络空间格局',
    description:
      '利用人口迁移数据，绘制全国的人口流动网络，识别疫情前后人口流动的差异，数据来源：https://pattern.swarma.org/article/228',
    creatTime: '2023-09-04 15:35:08',
    type: 'vis',
    tags: ['人口流动'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*384hSrP9CRAAAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: cyberspacePattern,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID],
  },
  {
    id: 'fb85734d-a5d1-468f-966d-447b3d715a90',
    name: 'AI 遥感',
    description: 'SAM 图像分割大模型在遥感领域的应用：AI 识别、提取家乡所在城市体育馆、飞机场飞机、自家房产等轮廓。',
    creatTime: '2023-05-24 16:04:51',
    type: 'app',
    tags: ['遥感'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*Ge03Qo2cKv0AAAAAAAAAAAAADmJ7AQ/original',
    applicationConfig: remoteSensingImageSam,
    assetPackageIds: [CORE_ASSETS_ID, ANALYSIS_ASSETS_ID, '@antv/li-sam-assets'],
  },
];

// 应用案例
const APP_CASES: Case[] = [
  {
    id: '30dd22f0-99a4-4ae2-8858-91b00e7bbe87',
    name: 'Zelda: Tears of the Kingdom - Power by  AntV L7VP',
    description: '通过 L7VP 搭建研发的《塞尔达：王国之泪》移动端地图应用',
    creatTime: '2023-05-24 18:04:51',
    type: 'app',
    tags: ['移动端'],
    thumbnail: 'https://mdn.alipayobjects.com/huamei_iy7sau/afts/img/A*4uOxQ46zCusAAAAAAAAAAAAADruNAQ/original',
    applicationConfig: zeldaApp,
    assetPackageIds: [CORE_ASSETS_ID, '@lvisei/li-zelda-assets'],
    viewMode: 'view',
  },
];

// 全部
export const ALL_CASES: Case[] = [...VIS_CASES, ...APP_CASES];

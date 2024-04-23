export type Steps = {
  key: number;
  title: string;
  status: 'process' | 'wait' | 'finish';
  // 侧边导航 key
  menu: 'datasets' | 'layers' | 'widgets';
};

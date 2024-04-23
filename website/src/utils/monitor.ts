const LogMap = new Map([
  [11, '项目预览'],
  [12, '项目应用导出 HTML'],
  [13, '预览 APP 应用页面'],
  [14, '项目分析态'],
]);
const yuyanMonitor = (window as any)?.yuyanMonitor;

export const logYuyanMonitor = (
  code: 11 | 12 | 13 | 14,
  customDatas?: Partial<Record<'c1' | 'c2' | 'c3' | 'c4' | 'c5', string>>,
) => {
  if (!yuyanMonitor) return;
  if (!LogMap.has(code)) {
    console.warn('未定义的 yuyanMonitor code');
    return;
  }
  yuyanMonitor?.log({
    code: code, // 系统自动生成，请勿修改
    msg: LogMap.get(code), // 上报信息，推荐传入
    // 自定义字段
    ...customDatas,
  });
};

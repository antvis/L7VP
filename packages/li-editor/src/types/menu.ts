// 解析侧边导航栏菜单项
export type NavMenuItem = {
  /** 名称 */
  name: string;
  /** key */
  key: string;
  /** 图标 */
  icon: React.ReactNode;
  /** 组件 */
  component: React.FC<any>;
};

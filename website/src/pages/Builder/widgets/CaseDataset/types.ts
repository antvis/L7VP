/** demo 数据类型 */
export type DemoDataSource = {
  id: string;
  name: string;
  url: string;
  type: 'json' | 'geojson' | 'csv';
};

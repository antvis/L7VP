const CacheNameMap = new Map<string, number>();

/**
 * 生成唯一名称
 * 第二个名称加后缀从 2 开始
 */
export const uniqueName = (name: string) => {
  if (CacheNameMap.has(name)) {
    const index = CacheNameMap.get(name)! + 1;
    CacheNameMap.set(name, index);
    return `${name}${index}`;
  }

  CacheNameMap.set(name, 1);

  return name;
};

/**
 * 生成唯一 ID
 */
export const getUniqueId = (prefix?: string) => {
  const unique = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return prefix ? `${prefix}_${unique}` : unique;
};

/**
 * lodash mergeWith 自定义方法
 */
export const mergeWithCustomizer = (objValue: any, srcValue: any) => {
  if (Array.isArray(srcValue)) {
    return srcValue;
  }
};

/**
 * 判断是否是 URL
 */
export const isValidUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))|' + // validate OR ip (v4) address
      'localhost' + // OR localhost
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

/**
 * 推断不是 null or undefined
 */
export const notNullorUndefined = <T extends NonNullable<any>>(d: T | null | undefined): d is T => {
  return d !== undefined && d !== null;
};

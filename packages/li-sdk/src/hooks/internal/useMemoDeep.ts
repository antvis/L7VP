import { isEqual as _isEqual } from 'lodash-es';
import { useRef } from 'react';

// 深比较的 Memo ，当工厂函数的返回值在 isEqual 下不等时，才更新引用
export const useMemoDeep = <T>(factory: () => T, isEqual: (value: any, other: any) => boolean = _isEqual): T => {
  const ref = useRef<T>();
  const value = factory();
  if (!ref.current || !isEqual(ref.current, value)) {
    ref.current = value;
  }

  return ref.current;
};

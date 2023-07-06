import { isEqual, uniqueId } from 'lodash-es';
import { useRef } from 'react';

/**
 * 获取最新 Key
 * 当 state 发生变更时，返回最新的唯一 Key
 */
export const useLatestKey = <T>(state: T) => {
  const keyRef = useRef(uniqueId('unique-key'));
  const prevRef = useRef<T>();
  const curRef = useRef<T>();

  prevRef.current = curRef.current;
  curRef.current = state;

  if (isEqual(prevRef.current, curRef.current)) {
    return keyRef.current;
  }

  keyRef.current = uniqueId('changed-key');

  return keyRef.current;
};

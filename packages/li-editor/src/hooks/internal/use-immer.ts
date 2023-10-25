import type { Draft } from 'immer';
import produce, { freeze } from 'immer';
import { useCallback, useState } from 'react';

export type DraftFunction<S> = (draft: Draft<S>) => void;
export type Updater<S> = (arg: S | DraftFunction<S>) => void;
export type ImmerHook<S> = [S, Updater<S>];
export function useImmer<S = any>(initialValue: S | (() => S), freezeDeep?: boolean): ImmerHook<S>;

export function useImmer(initialValue: any, freezeDeep: boolean = true) {
  const [val, updateValue] = useState(() =>
    freeze(typeof initialValue === 'function' ? initialValue() : initialValue, freezeDeep),
  );
  return [
    val,
    useCallback((updater: any) => {
      if (typeof updater === 'function') updateValue(produce(updater));
      else updateValue(freeze(updater, freezeDeep));
    }, []),
  ];
}
